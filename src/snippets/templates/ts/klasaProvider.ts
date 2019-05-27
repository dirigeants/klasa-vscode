import { Provider, ProviderStore, KlasaClient, SettingsUpdateResultEntry } from 'klasa';

export default class extends Provider {

  constructor(client: KlasaClient, store: ProviderStore, file: string[], directory: string) {
    /**
     * Any default options can be omitted completely.
     * if all options are default, you can omit the constructor completely
     */
    super(client, store, file, directory, { enabled: $1 });
  }

  async init() {
    /*
     * You can optionally define this method which will be run when the bot starts
     * (after login, so discord data is available via this.client)
     */
  }

  async shutdown() {
    /*
     * You can optionally define this method which will be run when the provider is
     * removed from the ProviderStore.
     */
  }

  async hasTable(table: string): Promise<boolean> {
    // Checks if a table exists.
  }

  async createTable(table: string, rows?: any[]): Promise<any> {
    // Create a new table.
  }

  async deleteTable(table: string): Promise<any> {
    // Delete a table.
  }

  async getAll(table: string): Promise<any[]> {
    // Get all records from a table.
  }

  async get(table: string, entry: string): Promise<any> {
    // Get a record from a table.
  }

  async has(table: string, entry: string): Promise<boolean> {
    // Check if the record exists.
  }

  async getRandom(table) {
    // Get a random record from a table.
  }

  async create(table: string, entry: string, data: any): Promise<any> {
    // Insert a new record.
  }

  async set(table: string, entry: string, data: any): Promise<any> {
    return this.create(table, entry, data);
  }

  async insert(table: string, entry: string, data: any): Promise<any> {
    return this.create(table, entry, data);
  }

  async update(table: string, entry: string, data: SettingsUpdateResultEntry[] | [string, any][] | Record<string, any>): Promise<any> {
    // Update a record.
  }

  async replace(table: string, entry: string, data: SettingsUpdateResultEntry[] | [string, any][] | Record<string, any>): Promise<any> {
    // Replace all the data from a record
  }

  async delete(table: string, entry: string): Promise<any> {
    // Delete a record from the database
  }

};
