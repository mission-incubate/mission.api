import {ICachingProvider} from './CacheBase';
import {Redis} from '../wrapper';
import {CacheConfig, CachingPolicy} from '../../config';

export class RedisCacheProvider implements ICachingProvider {
    private Redis: Redis;
    constructor() {
        this.Redis = new Redis(CacheConfig);
    }
    public async AddItem<TValue>(key: string, value: TValue, regionName?: string, cachePolicy?: CachingPolicy): Promise<boolean> {
        let ckey = this.getCacheKey(key, regionName);
        let val = await this.Redis.Set(ckey, value);
        return val > 0;
    }

    public async GetItem<TValue>(key: string, regionName?: string, cachePolicy?: CachingPolicy): Promise<TValue> {
        let ckey = this.getCacheKey(key, regionName);
        let val = await this.Redis.Get<TValue>(ckey);
        return val;
    }

    public async GetAllKeys(regionName?: string): Promise<Array<string>> {
        let val = await this.Redis.Keys(regionName);
        return val;
    }

    public async RemoveItem(key: string, regionName?: string): Promise<boolean> {
        throw 'Not implementd';
    }
    public async RemoveRegion(regionName: string): Promise<boolean> {
        throw 'Not implementd';
    }

    private getCacheKey(key: string, regionName?: string): string {
        regionName = regionName ? regionName : 'default';
        let fkey = regionName + CacheConfig.namespace_separator + key;
        return fkey;
    }
    // public async AddItem<TValue>(key: string, value: TValue, policyKey?: string, regionName?: string | Array<string>): Promise<boolean> {
    //     return new Promise<boolean>((resolver, reject) => {
    //         return client.hset(this.getRegion(regionName), key, value, (err: any, res: boolean) => {
    //             if (err) {
    //                 reject(err);
    //             }
    //             resolver(res);
    //         });
    //     });
    // }
    // public async GetItem<TValue>(key: string, policyKey?: string, regionName?: string | Array<string>): Promise<TValue> {
    //     return new Promise<TValue>((resolver, reject) => {
    //         client.hget(this.getRegion(regionName), key, (err: Error, res: TValue) => {
    //             if (err) {
    //                 reject(err);
    //             }
    //             return resolver(res);
    //         });
    //     });
    // }
    // public async RemoveItem(key: string, regionName?: string): Promise<boolean> {
    //     return new Promise<boolean>((resolver, reject) => {
    //         return false;
    //     });
    // }
    // public async RemoveRegion(regionName: string): Promise<boolean> {
    //     return null;
    // }
    // public async GetAllKeys(regionName?: string): Promise<Array<string>> {
    //     return new Promise<Array<string>>((resolver, reject) => {
    //         let callback: ResCallbackT<Array<string>> = (err: Error, res: Array<string>) => {
    //             if (err) { reject(err); }
    //             return resolver(res);
    //         };
    //         regionName ? client.hkeys(regionName, callback) : client.keys(callback);
    //     });
    // }

    // private getRegion(regionName: string | Array<string>): string {
    //     if (!regionName) {
    //         const region: string = 'default';
    //         return region;
    //     }
    //     let rKey = typeof regionName === 'string' ? regionName : regionName.join(CacheConfig.namespace_separator);
    //     return rKey;
    // }
}
