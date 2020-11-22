import { AedesOptions } from 'aedes';

/**
 * Extends default Aedes options by custom properties.
 */
export interface HomebridgeAedesOptions extends AedesOptions {
    host?: string;
    port?: number;
}