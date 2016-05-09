import * as redis from 'redis';
import {RedisClient, ResCallbackT} from 'redis';
import {CacheConfig} from '../../Config';
const client: RedisClient = redis.createClient(CacheConfig);

export class RedisOption {

}

export class RedisWrapper {
    public static Auth(password: string): void {
        client.auth();
    }

    public static async HSet<TValue>(key: string, value: TValue, regionName?: string): Promise<number> {
        return new Promise<number>((resolver, reject) => {
            return client.hset(regionName, key, value, (err: Error, res: number) => {
                if (err) {
                    reject(-1);
                }
                resolver(res);
            });
        });
    }
    public async HGet<TValue>(key: string, policyKey?: string): Promise<TValue> {
        return new Promise<TValue>((resolver, reject) => {
            client.get(key, (err: Error, res: TValue) => {
                if (err) {
                    reject(err);
                }
                return resolver(res);
            });
        });
    }
    public async Expire(key: string, expire: number): Promise<number> {
        return new Promise<number>((resolver, reject) => {
            client.expire(key, expire, (err: Error, res: number) => {
                if (err) {
                    reject(err);
                }
                return resolver(res);
            });
        });
    }
    public async HDel(key: string, regionName?: string): Promise<boolean> {
        return new Promise<boolean>((resolver, reject) => {
            client.hdel(regionName, key, (err: Error, res: boolean) => {
                if (err) {
                    reject(err);
                }
                return resolver(res);
            });
        });
    }
    public async HKeys(regionName?: string): Promise<Array<string>> {
        return new Promise<Array<string>>((resolver, reject) => {
            let callback: ResCallbackT<Array<string>> = (err: Error, res: Array<string>) => {
                if (err) { reject(err); }
                return resolver(res);
            };
            regionName ? client.hkeys(regionName, callback) : client.keys(callback);
        });
    }
}
