import React, {Component, PropTypes} from 'react';
import {Form, FormGroup, Button, Modal, Col} from 'react-bootstrap';
import ReactCrop from 'react-image-crop';
import ReactCropSASS from 'react-image-crop/lib/ReactCrop.scss';

function downScaleCanvas(cv, scale) {
    if (!(scale < 1) || !(scale > 0)) throw ('scale must be a positive number <1 ');
    let sqScale = scale * scale; // square scale = area of source pixel within target
    let sw = cv.width; // source image width
    let sh = cv.height; // source image height
    let tw = Math.floor(sw * scale); // target image width
    let th = Math.floor(sh * scale); // target image height
    let sx = 0, sy = 0, sIndex = 0; // source x,y, index within source array
    let tx = 0, ty = 0, yIndex = 0, tIndex = 0; // target x,y, x,y index within target array
    let tX = 0, tY = 0; // rounded tx, ty
    let w = 0, nw = 0, wx = 0, nwx = 0, wy = 0, nwy = 0; // weight / next weight x / y
    // weight is weight of current source point within target.
    // next weight is weight of current source point within next target's point.
    let crossX = false; // does scaled px cross its current px right border ?
    let crossY = false; // does scaled px cross its current px bottom border ?
    let sBuffer = cv.getContext('2d').
    getImageData(0, 0, sw, sh).data; // source buffer 8 bit rgba
    let tBuffer = new Float32Array(3 * tw * th); // target buffer Float32 rgb
    let sR = 0, sG = 0,  sB = 0; // source's current point r,g,b
    /* untested !
    let sA = 0;  //source alpha  */

    for (sy = 0; sy < sh; sy++) {
        ty = sy * scale; // y src position within target
        tY = 0 | ty;     // rounded : target pixel's y
        yIndex = 3 * tY * tw;  // line index within target array
        crossY = (tY != (0 | ty + scale));
        if (crossY) { // if pixel is crossing botton target pixel
            wy = (tY + 1 - ty); // weight of point within target pixel
            nwy = (ty + scale - tY - 1); // ... within y+1 target pixel
        }
        for (sx = 0; sx < sw; sx++, sIndex += 4) {
            tx = sx * scale; // x src position within target
            tX = 0 |  tx;    // rounded : target pixel's x
            tIndex = yIndex + tX * 3; // target pixel index within target array
            crossX = (tX != (0 | tx + scale));
            if (crossX) { // if pixel is crossing target pixel's right
                wx = (tX + 1 - tx); // weight of point within target pixel
                nwx = (tx + scale - tX - 1); // ... within x+1 target pixel
            }
            sR = sBuffer[sIndex    ];   // retrieving r,g,b for curr src px.
            sG = sBuffer[sIndex + 1];
            sB = sBuffer[sIndex + 2];

            /* !! untested : handling alpha !!
               sA = sBuffer[sIndex + 3];
               if (!sA) continue;
               if (sA != 0xFF) {
                   sR = (sR * sA) >> 8;  // or use /256 instead ??
                   sG = (sG * sA) >> 8;
                   sB = (sB * sA) >> 8;
               }
            */
            if (!crossX && !crossY) { // pixel does not cross
                // just add components weighted by squared scale.
                tBuffer[tIndex    ] += sR * sqScale;
                tBuffer[tIndex + 1] += sG * sqScale;
                tBuffer[tIndex + 2] += sB * sqScale;
            } else if (crossX && !crossY) { // cross on X only
                w = wx * scale;
                // add weighted component for current px
                tBuffer[tIndex    ] += sR * w;
                tBuffer[tIndex + 1] += sG * w;
                tBuffer[tIndex + 2] += sB * w;
                // add weighted component for next (tX+1) px
                nw = nwx * scale
                tBuffer[tIndex + 3] += sR * nw;
                tBuffer[tIndex + 4] += sG * nw;
                tBuffer[tIndex + 5] += sB * nw;
            } else if (crossY && !crossX) { // cross on Y only
                w = wy * scale;
                // add weighted component for current px
                tBuffer[tIndex    ] += sR * w;
                tBuffer[tIndex + 1] += sG * w;
                tBuffer[tIndex + 2] += sB * w;
                // add weighted component for next (tY+1) px
                nw = nwy * scale
                tBuffer[tIndex + 3 * tw    ] += sR * nw;
                tBuffer[tIndex + 3 * tw + 1] += sG * nw;
                tBuffer[tIndex + 3 * tw + 2] += sB * nw;
            } else { // crosses both x and y : four target points involved
                // add weighted component for current px
                w = wx * wy;
                tBuffer[tIndex    ] += sR * w;
                tBuffer[tIndex + 1] += sG * w;
                tBuffer[tIndex + 2] += sB * w;
                // for tX + 1; tY px
                nw = nwx * wy;
                tBuffer[tIndex + 3] += sR * nw;
                tBuffer[tIndex + 4] += sG * nw;
                tBuffer[tIndex + 5] += sB * nw;
                // for tX ; tY + 1 px
                nw = wx * nwy;
                tBuffer[tIndex + 3 * tw    ] += sR * nw;
                tBuffer[tIndex + 3 * tw + 1] += sG * nw;
                tBuffer[tIndex + 3 * tw + 2] += sB * nw;
                // for tX + 1 ; tY +1 px
                nw = nwx * nwy;
                tBuffer[tIndex + 3 * tw + 3] += sR * nw;
                tBuffer[tIndex + 3 * tw + 4] += sG * nw;
                tBuffer[tIndex + 3 * tw + 5] += sB * nw;
            }
        } // end for sx
    } // end for sy

    // create result canvas
    let resCV = document.createElement('canvas');
    resCV.width = tw;
    resCV.height = th;
    let resCtx = resCV.getContext('2d');
    let imgRes = resCtx.getImageData(0, 0, tw, th);
    let tByteBuffer = imgRes.data;
    // convert float32 array into a UInt8Clamped Array
    let pxIndex = 0; //
    for (sIndex = 0, tIndex = 0; pxIndex < tw * th; sIndex += 3, tIndex += 4, pxIndex++) {
        tByteBuffer[tIndex] = Math.ceil(tBuffer[sIndex]);
        tByteBuffer[tIndex + 1] = Math.ceil(tBuffer[sIndex + 1]);
        tByteBuffer[tIndex + 2] = Math.ceil(tBuffer[sIndex + 2]);
        tByteBuffer[tIndex + 3] = 255;
    }
    // writing result to canvas.
    resCtx.putImageData(imgRes, 0, 0);
    return resCV;
}

export default class extends Component {
  constructor() {
    super(...arguments);

    this.state = {
      originalImageObjectUrl: null,
      croppedImageCanvas: null
    }
  }

  handleChange(event) {
    let fileSize = Math.floor(event.target.files[0].size / (1024 * 1024));
    if (fileSize < 2) {
      this.setState({
        originalImageObjectUrl: URL.createObjectURL(event.target.files[0])
      });
    }
    else {
      event.target.value = null;
    }
  }

  handleComplete(crop, pixelCrop) {
    let canvas = document.createElement('canvas');
    canvas.width = pixelCrop.width;
    canvas.height = pixelCrop.height;
    let context = canvas.getContext('2d');
    let imageObj = new Image();
    imageObj.src = this.state.originalImageObjectUrl;

    context.drawImage(imageObj, pixelCrop.x, pixelCrop.y, pixelCrop.width,
      pixelCrop.height, 0, 0, pixelCrop.width, pixelCrop.height);

    this.setState({
      croppedImageCanvas: canvas
    });
  }

  handleClick(event) {
    event.preventDefault();

    if (this.state.croppedImageCanvas) {
      let {croppedImageCanvas} = this.state;

      let wallAvatarScale = Math.sqrt(201 * 222) /
        Math.sqrt(croppedImageCanvas.height * croppedImageCanvas.width);
      let smallAvatarScale = Math.sqrt(25 * 27) /
        Math.sqrt(croppedImageCanvas.height * croppedImageCanvas.width);

      downScaleCanvas(croppedImageCanvas, wallAvatarScale).toBlob(blob => {
        this.props.uploadAvatar(this.props.userId, blob, 'wall');
      }, 'image/jpeg', 0.9);
      downScaleCanvas(croppedImageCanvas, smallAvatarScale).toBlob(blob => {
        this.props.uploadAvatar(this.props.userId, blob, 'small');
      }, 'image/jpeg', 0.9);

      this.setState({
        originalImageObjectUrl: null,
        croppedImageCanvas: null
      });

      this.props.toggleModal();
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if ((this.state.originalImageObjectUrl === nextState.originalImageObjectUrl)
      && (this.state.croppedImageCanvas !== nextState.croppedImageCanvas)) {
      return false;
    }
    return true;
  }

  render() {
    return (
      <Modal show={this.props.showModal} onHide={() => {
        this.setState({
          originalImageObjectUrl: null,
          croppedImageCanvas: null
        });
        this.props.toggleModal();}}>
      <Modal.Header>
        Загрузите аватар. Максимальный размер - 2мб
      </Modal.Header>
      <Modal.Body>
        <Form horizontal>
          <FormGroup>
            <Col md={12}>
              <input type='file' onChange={(event) => {this.handleChange(event)}}/>
            </Col>
          </FormGroup>
        </Form>
        {this.state.originalImageObjectUrl ?
          <ReactCrop src={this.state.originalImageObjectUrl} crop={{
            width: 80,
            aspect: 9/10,
            keepSelection: true
          }}
          onComplete={(crop, pixelCrop) => {this.handleComplete(crop, pixelCrop)}}/>
          : null}
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={event => {this.handleClick(event)}}>Сохранить</Button>
      </Modal.Footer>
      </Modal>
    );
  }
}
