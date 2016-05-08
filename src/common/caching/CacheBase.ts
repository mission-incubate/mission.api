export interface ICaching {
    AddItem<TValue>(key: string, value: TValue, policyKey?: string, regionName?: string): Promise<boolean>;
    GetItem<TValue>(key: string): Promise<TValue>;
    GetItem<TValue>(key: string, policyKey: string): Promise<TValue>;
    RemoveItem(key: string, regionName?: string): Promise<boolean>;
    RemoveRegion(regionName: string): Promise<boolean>;
    GetAllKeys(regionName?: string): Promise<Array<string>>;
}
