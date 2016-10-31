# homebridge-udp-contactsensor

UDP server contact sensor input plugin for [Homebridge](https://github.com/nfarina/homebridge)

## Installation
1.	Install Homebridge using `npm install -g homebridge`
2.	Install this plugin `npm install -g homebridge-udp-contactsensor`
3.	Update your configuration file - see below for an example

## Configuration
* `accessory`: "UdpContactSensor"
* `name`: descriptive name
* `pins`: object of names to GPIO physical pins TODO

Example configuration:

```json
    "accessories": [
        {
            "accessory": "ContactSensor",
            "name": "Contact Sensors",
            "pins": {
                "Switch A": 24,
                "Switch B": 26,
                "Switch C": 22
            }
        }
    ]
```

Creates a ContactSensor service for each pin.

What use are contact sensors? You can control other devices when they are opened or closed.
For example, you could automatically turn on a light when you open your door.

## See also

* [homebridge-contactsensor](https://github.com/rxseger/homebridge-contactsensor)
* [homebridge-gpio-cmd](https://github.com/rxseger/homebridge-gpio-cmd) etc. for GPIO outputs
* [homebridge-pwm-fan](https://github.com/rxseger/homebridge-pwm-fan)

## License

MIT

