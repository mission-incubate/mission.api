import {RedisConfig} from './BaseConfig';

export const CacheConfig: RedisConfig = {
    auth: '',
    host: 'localhost',
    keys_pattern: '*',
    name: 'Cache',
    namespace_separator: ':',
    port: 6379,
    ssh_port: 22,
    timeout_connect: 60000,
    timeout_execute: 60000
};
