import { Client } from 'klasa';
import { config, token } from './config';

export default class MyKlasaClient extends Client {

    constructor(...args) {
        super(...args);

        // Add any properties to your Klasa Client
    }

    // Add any methods to your Klasa Client

}

new MyKlasaClient(config).login(token);
