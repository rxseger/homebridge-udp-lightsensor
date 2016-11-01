# homebridge-udp-lightsensor

UDP server light sensor input plugin for [Homebridge](https://github.com/nfarina/homebridge)

## Installation
1.	Install Homebridge using `npm install -g homebridge`
2.	Install this plugin `npm install -g homebridge-udp-lightsensor`
3.	Update your configuration file - see below for an example

## Configuration
* `accessory`: "UdpLightSensor"
* `name`: descriptive name
* `listen_port`: UDP port to listen on for incoming messages

Example configuration:

```json
    "accessories": [
        {
            "accessory": "UdpLightSensor",
            "name": "Lighting",
            "listen_port": 8267
        }
    ]
```

Creates a LightSensor service named Lighting.

Listens for UDP datagrams on port 8267, and reports the light level as the
payload interpreted as an ASCII string representing the light level in lux.

## See also

* [homebridge-analog-lightsensor](https://github.com/rxseger/homebridge-analog-lightsensor)
* [homebridge-udp-contactsensor](https://github.com/rxseger/homebridge-udp-contactsensor)
* [homebridge-gpio-cmd](https://github.com/rxseger/homebridge-gpio-cmd) etc. for GPIO outputs
* [homebridge-pwm-fan](https://github.com/rxseger/homebridge-pwm-fan)

## License

MIT

