import { HomebridgeAedesPlatformConfig as PlatformConfig } from './homebridgeAedesPlatformConfig';
import { API, IndependentPlatformPlugin, Logging, APIEvent } from 'homebridge';
import { HomebridgeAedesOptions } from './homebridgeAedesOptions';
import { createServer as NetServer, Server } from 'net';
import { Server as AedesServer, Aedes } from 'aedes';
import NedbPersistence from 'aedes-persistence-nedb';
import { createServer as TlsServer } from 'tls';

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
    // Define options for Aedes
    this.options = this.getOptions(config);
    // Register lifecycle events
    this.api.on(APIEvent.DID_FINISH_LAUNCHING, this.startServer.bind(this));
    this.api.on(APIEvent.SHUTDOWN, this.stopServer.bind(this));
  }

  /**
   * Gets the options for Aedes and Net/Tls servers based on configuration
   * @param config PlatformConfiguration to setup options for
   */
  getOptions(config: PlatformConfig): HomebridgeAedesOptions {
    const options: HomebridgeAedesOptions = {};
    // Name
    options.id = config.name;
    // Persistence
    if(config.persistence) {
      const persistence = new NedbPersistence({
        path: this.api.user.persistPath() + '/aedes-mqtt',
      });
      options.persistence = persistence;
    }
    // Port
    options.port = config.port ? parseInt(config.port as string) : 1883;
    // Host
    if(config.host) {
      options.host = config.host as string;
    }
    // Authentication
    if(config.auth?.isEnabled) {
      options.authenticate = (client, username, password, callback) => {
        const authorized = (username === config.auth?.username && password.toString() === config.auth.password);
        callback(null, authorized);
      };
    }
    // Encryption/TLS
    if(config.tls?.isEnabled) {
      options.useTls = true;
      options.cert = config.tls.pubKey;
      options.key = config.tls.privKey;
    }
    return options;
  }

  /**
   * Starts the Aedes server
   */
  startServer() {
    this.log(`Starting Aedes MQTT broker "${ this.options.id }".`);
    this.aedes = AedesServer(this.options);
    if(this.options.useTls) {
      this.server = TlsServer(this.options, this.aedes.handle);
    } else {
      this.server = NetServer(this.aedes.handle);
    }
    this.server.listen(this.options.port, this.options.host);
  }

  /**
   * Stops the Aedes server
   */
  stopServer() {
    this.log(`Stopping Aedes MQTT broker "${ this.options.id }".`);
    this.server?.close();
  }

}
