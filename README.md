# homebridge-udp-contactsensor

UDP server contact sensor input plugin for [Homebridge](https://github.com/nfarina/homebridge)

## Installation
1.	Install Homebridge using `npm install -g homebridge`
2.	Install this plugin `npm install -g homebridge-udp-contactsensor`
3.	Update your configuration file - see below for an example

## Configuration
* `accessory`: "UdpContactSensor"
* `name`: descriptive name
* `listen_port`: UDP port to listen on for incoming messages
* `data`: object of names to matching on/off datagram payloads

Example configuration:

```json
    "accessories": [
        {
            "accessory": "UdpContactSensor",
            "name": "UDP Contact Sensors",
            "listen_port": 8266,
            "data": {
                "Switch #2": { "on": "02ff", "off": "0200" },
                "Switch #3": { "on": "03ff", "off": "0300" },
                "Switch #4": { "on": "04ff", "off": "0400" }
            }
        }
    ]
```

Creates a ContactSensor service for each switch in `data`.

Listens for UDP datagrams on port 8266, turns on Switch #2 upon receiving
the two bytes 02 followed by ff, turns it off when receiving 02 followed by 00,
and so on.

## See also

* [homebridge-contactsensor](https://github.com/rxseger/homebridge-contactsensor)
* [homebridge-gpio-cmd](https://github.com/rxseger/homebridge-gpio-cmd) etc. for GPIO outputs
* [homebridge-pwm-fan](https://github.com/rxseger/homebridge-pwm-fan)

## License

MIT

