import {CachingPolicy} from '../../config';

export interface ICachingProvider {
    AddItem<TValue>(key: string, value: TValue, regionName?: string, cachePolicy?: CachingPolicy): Promise<boolean>;
    GetItem<TValue>(key: string, regionName?: string, cachePolicy?: CachingPolicy): Promise<TValue>;
    RemoveItem(key: string, regionName?: string): Promise<boolean>;
    RemoveRegion(regionName: string): Promise<boolean>;
    GetAllKeys(regionName?: string): Promise<Array<string>>;
}

export enum CacheRegion {
    CRDefault = 0,
    Session = 1,
}

export enum BulkCacheRegion {
    BCRDefault = 0,
}


