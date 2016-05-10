import {ICachingProvider} from './CacheBase';
import {CachingPolicy} from '../../config';

export class CacheManager {
    private db: ICachingProvider;
    public constructor(cache: ICachingProvider) {
        this.db = cache;
    }

    public async AddItem<TValue>(key: string, value: TValue, regionName?: string, cachePolicy?: CachingPolicy): Promise<boolean> {
        return await this.db.AddItem(key, value, regionName);
    }

    public async GetItem<TValue>(key: string, regionName?: string, policyKey?: CachingPolicy): Promise<TValue> {
        return await this.db.GetItem<TValue>(key, regionName);
    }

    public async RemoveItem(key: string, regionName?: string): Promise<boolean> {
        throw 'Not Implemented';
    }
    public async RemoveRegion(regionName: string): Promise<boolean> {
        throw 'Not Implemented';
    }
    public async GetAllKeys(regionName?: string): Promise<Array<string>> {
        throw 'Not Implemented';
    }
}
