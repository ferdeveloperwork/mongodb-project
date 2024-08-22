import { connectToDataBase } from "@libs/db";

export class BaseService {
    private dbConnectionPromise: Promise<void>;

    constructor() {
        this.dbConnectionPromise = this.init();
    }

    private async init(): Promise<void> {
        await connectToDataBase();
    }

    protected async ensureInitialized(): Promise<void> {
        await this.dbConnectionPromise;
    }
}