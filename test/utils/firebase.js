export default class Firebase {
  constructor(initialState = {}) {
    this.data = initialState;
    this.ref = this.ref.bind(this);
  }

  database() {
    return {
      ref: this.ref
    }
  }

  _firebaseOn(path) {
    return (event, callback) => {
      let snapshot = null;
      switch(event) {
        case 'child_added':
          snapshot = this._firebaseSnapshotValue(path)();
          if (snapshot) {
            Object.keys(snapshot).map((item) => {
              return {
                val: () => item
              }
            }).forEach(callback);
          }
          else {
            callback({
              val: () => null
            });
          }
          break;
        default:
          snapshot = {
            val: this._firebaseSnapshotValue(path)
          };
          callback(snapshot);
          break;
      }
    }
  }

  _firebaseSnapshotValue(path) {
  	return () => {
      let value = null;
      let i = 0;

      while(path.indexOf('/', i) !== -1) {
        let slashIndex = path.indexOf('/', i);
        if(value) {
          let newValue = null;
          if (value) {
            newValue = value[path.substr(i, slashIndex - i)];
          }
          if (newValue) {
            value = Object.assign({}, {}, newValue);
          }
          else {
            value = null;
          }
        }
        else {
          let newValue = null;
          if (this.data) {
            newValue = this.data[path.substr(0, slashIndex)];
          }
          if (newValue) {
            value = Object.assign({}, {}, newValue);
          }
          else {
            value = null;
          }
        }
        i = slashIndex + 1;
      }

      if(value && (path.substr(i) !== '')) {
        let newValue = value[path.substr(i)];
        if (newValue) {
          value = Object.assign({}, {}, newValue);
        }
        else {
          value = null;
        }
      }

      return value;
    }
  }

  ref(path) {
    return {
    	child: (childPath) => {
      	return {
        	on: this._firebaseOn(path + '/' + childPath)
        }
      },
      on: this._firebaseOn(path)
    }
  }
}
