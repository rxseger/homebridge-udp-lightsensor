'use strict';

const dgram = require('dgram');

let Service, Characteristic;

module.exports = (homebridge) => {
  Service = homebridge.hap.Service;
  Characteristic = homebridge.hap.Characteristic;

  homebridge.registerAccessory('homebridge-lightsensor', 'UdpContactSensor', UdpContactSensorPlugin);
};

class UdpContactSensorPlugin
{
  constructor(log, config) {
    this.log = log;
    this.name = config.name;
    this.listen_port = config.listen_port || 8266;
    this.data = config.data || {
      "Switch #2": { on: "02ff", off: "0200" },
      "Switch #3": { on: "03ff", off: "0300" },
      "Switch #4": { on: "04ff", off: "0400" },
    };
    this.ondata2light = {};
    this.offdata2light = {};
  

    this.lights = [];

    for (let name of Object.keys(this.data)) {
      const subtype = name; 
      const light = new Service.ContactSensor(name, subtype);
      light
        .getCharacteristic(Characteristic.ContactSensorState)
        .setValue(false);

      this.ondata2light[this.data[name].on] = contact;
      this.offdata2light[this.data[name].off] = contact;

      this.lights.push(contact);
    }

    this.server = dgram.createSocket('udp4');
    
    this.server.on('error', (err) => {
      console.log(`udp server error:\n${err.stack}`);
      server.close();
    });

    this.server.on('message', (msg, rinfo) => {
      console.log(`server received udp: ${msg} from ${rinfo.address}`);

      const msg_hex = msg.toString('hex'); // for convenience in configuration files
    
      let light, state;
      if (this.ondata2light[msg_hex]) {
        light = this.ondata2contact[msg_hex];
        state = true;
      } else if (this.offdata2light[msg_hex]) {
        light = this.offdata2contact[msg_hex];
        state = false;
      }

      if (!light) {
        console.log(`unknown udp payload: ${msg_hex} not matching any light sensor`);
        return;
      }

      // Notify of state change
      light
        .getCharacteristic(Characteristic.ContactSensorState)
        .setValue(state);
      console.log(`udp notified ${light} -> ${state} from ${msg_hex} via ${rinfo.address}`);
    });

    this.server.bind(this.listen_port);
  }

  getServices() {
    return this.lights;
  }
}

