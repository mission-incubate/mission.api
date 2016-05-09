import {RedisWrapper} from './RedisWrapper';

describe('Redis Client', () => {
    describe('All', () => {
        let list: Array<number>;
        beforeEach(() => {
            list = [1, 2, 3, 4, 5];
        });
        it('All value should be less than 6', () => {
            RedisWrapper.HSet('true', 'Success', 'Success').then((val) => {
                console.log(val);
            });
            return true;
        });
        it('All value should not be greater than 5', () => {
            return false;
        });
    });
});
