import { API, IndependentPlatformPlugin, Logging, APIEvent, PlatformConfig } from 'homebridge';
import { HomebridgeAedesOptions } from './homebridgeAedesOptions';
import { Server as AedesServer, Aedes } from 'aedes';
import { createServer as NetServer, Server } from 'net';

/**
 * Aedes Homebridge Platform
 * Parses configuration and starts Aedes MQTT server.
 */
export class AedesHomebridgePlatform implements IndependentPlatformPlugin {

  private readonly log: Logging;
  private readonly api: API;
  private readonly options: HomebridgeAedesOptions;
  private aedes?: Aedes;
  private server?: Server;

  /**
   * Instantiates a new instance.
   * @param log Logger to be used for logging
   * @param config Plugin configuration
   * @param api API to work on
   */
  constructor(log: Logging, config: PlatformConfig, api: API) {
    this.log = log;
    this.api = api;
    // Define defaults for Aedes
    const defaults: HomebridgeAedesOptions = {
      port: 1883,
    };
    // Merge defaults with overrides
    this.options = Object.assign(defaults, config);
    // Register lifecycle events
    this.api.on(APIEvent.DID_FINISH_LAUNCHING, this.startServer.bind(this));
    this.api.on(APIEvent.SHUTDOWN, this.stopServer.bind(this));
  }

  /**
   * Starts the Aedis server
   */
  startServer() {
    this.log('Starting Aedes MQTT broker.');
    this.aedes = AedesServer(this.options);
    this.server = NetServer(this.aedes.handle);
    this.server.listen(this.options.port, this.options.host);
  }

  /**
   * Stops the Aedis server
   */
  stopServer() {
    this.log('Stopping Aedes MQTT broker.');
    this.server?.close();
  }

}
