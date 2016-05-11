import {RedisConfig, CachingPolicyDict, CachingPolicy} from './BaseConfig';

export const CacheConfig: RedisConfig = {
    auth: '',
    host: 'localhost',
    keys_pattern: '*',
    name: 'Cache',
    namespace_separator: ':',
    port: 6379,
    ssh_port: 22,
    timeout_connect: 60000,
    timeout_execute: 60000,
    db: 1
};

export const CachePolicy: CachingPolicyDict = {
    Default: <CachingPolicy>{
        Expire: 0
    },
    ShortTime: {
        Expire: 60
    },
    Average: {
        Expire: 60 * 60
    },
    LongTime: {
        Expire: 60 * 60 * 24
    }
};
