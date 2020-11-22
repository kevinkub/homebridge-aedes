import { AedesHomebridgePlatform } from './platform'; 
import { PLATFORM_NAME } from './settings';
import { API } from 'homebridge';


/**
 * This method registers the platform with Homebridge
 */
export = (api: API) => {
  api.registerPlatform(PLATFORM_NAME, AedesHomebridgePlatform);
};
