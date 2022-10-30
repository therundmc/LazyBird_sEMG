let filter = {
  filters: [
      //{ services: ["heart_rate"] },
      { services: [0x1815] },
      //{ services: ["c48e6067-5295-48d3-8d5c-0395f61792b1"] },
      { name: "ANR Corp M40" },
      //{ namePrefix: "Prefix" },
  ],
  optionalServices: [0x2A58],
  };
const customService = 0x1815;
const customChara = 0x2A58;

  class Ble {
    constructor() {
      this.device = null;
      this.server = null;
      this._characteristics = new Map();
    }
    connect() {
      return navigator.bluetooth.requestDevice(filter)
      .then(device => {
        this.device = device;
        return device.gatt.connect();
      })
      .then(server => {
        this.server = server;
        return server.getPrimaryService(customService);
      })
      .then(service => {
        return this._cacheCharacteristic(service, customChara);
      })
    }


    startNotifications() {
        return this._startNotifications(customChara);
      }

    parseValue(value) {
      // In Chrome 50+, a DataView is returned instead of an ArrayBuffer.
      value = value.buffer ? value : new DataView(value);
      let flags = value.getUint8(0);
      let result = {};
      result.value = value.getUint16(0, true);
      return result;
    }

    // Utils
    _cacheCharacteristic(service, characteristicUuid) {
      return service.getCharacteristic(characteristicUuid)
      .then(characteristic => {
        this._characteristics.set(characteristicUuid, characteristic);
      });
    }
    _readCharacteristicValue(characteristicUuid) {
      let characteristic = this._characteristics.get(characteristicUuid);
      return characteristic.readValue()
      .then(value => {
        // In Chrome 50+, a DataView is returned instead of an ArrayBuffer.
        value = value.buffer ? value : new DataView(value);
        return value;
      });
    }
    _writeCharacteristicValue(characteristicUuid, value) {
      let characteristic = this._characteristics.get(characteristicUuid);
      return characteristic.writeValue(value);
    }
    _startNotifications(characteristicUuid) {
      let characteristic = this._characteristics.get(characteristicUuid);
      // Returns characteristic to set up characteristicvaluechanged event
      // handlers in the resolved promise.
      return characteristic.startNotifications()
      .then(() => characteristic);
    }
    _stopNotifications(characteristicUuid) {
      let characteristic = this._characteristics.get(characteristicUuid);
      // Returns characteristic to remove characteristicvaluechanged event
      // handlers in the resolved promise.
      return characteristic.stopNotifications()
      .then(() => characteristic);
    }
}