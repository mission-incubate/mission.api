import * as redis from 'redis';
import {RedisClient} from 'redis';
import {ICaching} from './CacheBase';

export class RedisCache implements ICaching {
    private client: RedisClient = redis.createClient();

    public async AddItem<TValue>(key: string, value: TValue, policyKey?: string, regionName?: string): Promise<boolean> {
        let fKey = regionName ? regionName + ':' + key : key;
        return new Promise<boolean>((resolver, reject) => {
            return this.client.set(fKey, value, (err: any, res: boolean) => {
                if (err) {
                    reject(false);
                }
                resolver(res);
            });
        });

    }
    public async GetItem<TValue>(key: string, policyKey?: string): Promise<TValue> {
        return new Promise<TValue>((resolver, reject) => {
            this.client.get(key, (err: any, res: TValue) => {
                if (err) {
                    reject(err);
                }
                return resolver(res);
            });
        });
    }
    public async RemoveItem(key: string, regionName?: string): Promise<boolean> {
        return null;
    }
    public async RemoveRegion(regionName: string): Promise<boolean> {
        return null;
    }
    public async GetAllKeys(regionName?: string): Promise<Array<string>> {
        return null;
    }
}

