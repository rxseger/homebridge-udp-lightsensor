'use strict';

const dgram = require('dgram');

let Service, Characteristic;

module.exports = (homebridge) => {
  Service = homebridge.hap.Service;
  Characteristic = homebridge.hap.Characteristic;

  homebridge.registerAccessory('homebridge-lightsensor', 'UdpLightSensor', UdpLightSensorPlugin);
};

class UdpLightSensorPlugin
{
  constructor(log, config) {
    this.log = log;
    this.name = config.name;
    this.listen_port = config.listen_port || 8267;

    const subtype = this.name; 
    this.sensor = new Service.LightSensor(this.name, subtype);

    this.server = dgram.createSocket('udp4');
    
    this.server.on('error', (err) => {
      console.log(`udp server error:\n${err.stack}`);
      server.close();
    });

    this.server.on('message', (msg, rinfo) => {
      console.log(`server received udp: ${msg} from ${rinfo.address}`);

      const value = parseInt(msg.toString());
      if (Number.isNaN(value)) {
        console.log(`ignored not a number from ${rinfo.address}: ${msg} ${msg.toString('hex')}`);
        return;
      }

      // Notify of state change
      this.sensor
        .getCharacteristic(Characteristic.CurrentAmbientLightLevel)
        .setValue(value);
      console.log(`udp notified ${this.sensor} -> ${value} from ${rinfo.address}`);
    });

    this.server.bind(this.listen_port);
  }

  getServices() {
    return [this.sensor];
  }
}

