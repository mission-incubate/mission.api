import {Redis} from './RedisWrapper';
import {CacheConfig} from '../../Config';

describe('Redis Client', () => {
    let redis: Redis = new Redis(CacheConfig);
    describe('All', () => {
        // beforeEach(() => {  });
        it('All value should be less than 6', async (done) => {
            let res = await redis.Set('key', 'value');
            expect(1).toEqual(res);
            done();
        });
        it('All value should not be greater than 5', () => {
            return expect(1).toEqual(0);

        });
    });
});
