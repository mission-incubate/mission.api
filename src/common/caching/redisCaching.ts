import * as redis from 'redis';
import {RedisClient} from 'redis';
import {ICaching} from './';

export class RedisCache implements ICaching {
    private client: RedisClient = redis.createClient();

    public Set(key: string, value: any): boolean {
        return this.client.set(key, value);
    }
    public async Get(key: string): Promise<any> {
        return new Promise<any>((resolver, reject) => {
            this.client.get(key, (err, res) => {
                if (err) {
                    reject(err);
                }
                return resolver(res);
            });
        });
    }
}

