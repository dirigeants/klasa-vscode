import { Event, EventStore, KlasaClient } from 'klasa';

export default class extends Event {

  constructor(client: KlasaClient, store: EventStore, file: string[], directory: string) {
    /**
     * Any default options can be omitted completely.
     * if all options are default, you can omit the constructor completely
     */
    super(client, store, file, directory, {
      enabled: $1,
      once: $2
    });
  }

  async run(...params: any) {
    // This is where you place the code you want to run for your event
    $0
  }

  async init() {
    /*
     * You can optionally define this method which will be run when the bot starts
     * (after login, so discord data is available via this.client)
     */
  }

};
