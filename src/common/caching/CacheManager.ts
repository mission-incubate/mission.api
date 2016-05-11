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
        return await this.db.RemoveItem(key, regionName);
    }

    public async RemoveRegion(regionName: string): Promise<boolean> {
        let keys = await this.GetAllKeys(regionName);
        let promise: Array<Promise<boolean>> = new Array<Promise<boolean>>();
        keys.forEach((x) => {
            promise.push(this.RemoveItem(x, regionName));
        });
        let result = await Promise.all(promise);
        return result.length === result.filter(x => x).length;
    }

    public async GetAllKeys(regionName?: string): Promise<Array<string>> {
        return await this.db.GetAllKeys(regionName);
    }

    public async RetriveData<T>(func: Function, ckey: string, ...args: any[]): Promise<T> {
        let val: T = await this.GetItem<T>(ckey);
        if (!val) {
            val = await func.apply(this, args); // `this` is misbehavioring
            if (val) {
                await this.AddItem(ckey, val);
            }
        }
        return val;
    }
}

