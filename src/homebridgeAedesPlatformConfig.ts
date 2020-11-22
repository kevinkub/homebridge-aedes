import { PlatformConfig } from 'homebridge';

/**
 * Custom platform config for Aedes.
 */
export interface HomebridgeAedesPlatformConfig extends PlatformConfig {
    persistence?: boolean;
    port?: string;
    host?: string;
    auth?: HomebridgeAedesPlatformConfigAuth;
    tls?: HomebridgeAedesPlatformConfigTls;
}

interface HomebridgeAedesPlatformConfigAuth {
    isEnabled?: boolean;
    username?: string;
    password?: string;
}

interface HomebridgeAedesPlatformConfigTls {
    isEnabled?: boolean;
    pubKey?: string;
    privKey?: string;
}