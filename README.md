
<p align="center">

<img src="https://github.com/homebridge/branding/raw/master/logos/homebridge-wordmark-logo-vertical.png" width="150">

</p>


# Homebridge Platform Plugin for Aedes MQTT broker

This plugin for [Homebridge](https://homebridge.io/) allows you to host an embedded MQTT broker (server) within Homebridge. It features authentication with username and password, persistence and tls encryption.

## Installation

Sign in to your Homebridge, got to Plugins and search for "Homebridge Aedes". Follow the instructions to install.

## Configuration

All configuration can be done through the Homebridge UI.

## Tools 

The heavy lifting of this plugin is done by [Aedes](https://github.com/moscajs/aedes), which is a complete implementation of an MQTT broker in Node.js. Data can be persisted to disk using [aedes-persistence-nedb](https://github.com/ovhemert/aedes-persistence-nedb) to make it possible to restart Homebridge or the device it is running on without information loss.
