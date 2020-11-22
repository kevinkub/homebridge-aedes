import { AedesOptions } from 'aedes';
import { TlsOptions } from 'tls';

/**
 * Extends default Aedes options by custom properties.
 */
export interface HomebridgeAedesOptions extends AedesOptions, TlsOptions {
    host?: string;
    port?: number;
    useTls?: boolean;
}
