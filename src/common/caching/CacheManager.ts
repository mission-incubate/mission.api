import {ICaching} from './CacheBase';

export class CacheManager {
    private db: ICaching;
    constructor(cache: ICaching) {
        this.db = cache;
    }
}
