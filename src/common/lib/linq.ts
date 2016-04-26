export {};

declare global {
    interface Array<T> {
        Add(item: T): Array<T>;
        Where(Func: (x: T) => boolean): Array<T>;
        Select<TResult>(Func: (x: T) => TResult): Array<TResult>;
        Skip(count: number): Array<T>;
        SkipWhile(Func: (x: T) => boolean): Array<T>;
        Take(count: number): Array<T>;
        TakeWhile(Func: (x: T) => boolean): Array<T>;
    }
}

Array.prototype.Add = function (item: any): Array<any> {
    this.push(item);
    return this;
};

Array.prototype.Where = function (func: (x: any) => boolean): Array<any> {
    let result: Array<any> = [];
    let a: Array<any> = this;
    for (var i of a) {
        if (func(i)) {
            result.push(i);
        }
    }
    return result;
};

Array.prototype.Select = function (func: (x: any) => any): Array<any> {
    let a: Array<any> = this;
    var result: Array<any> = [];
    for (var i = 0, n = a.length; i < n; ++i) {
        result.push(func(a[i]));
    }
    return result;
};

Array.prototype.Skip = function (count: number) {
    return this.slice(count);
};

Array.prototype.SkipWhile = function (func: (x: any) => boolean): Array<any> {
    let a: Array<any> = this, i: number = 0;
    for (var n = a.length; i < n; ++i) {
        if (!func(a[i]))
            break;
    }
    return a.slice(i);
};

Array.prototype.Take = function (count: number) {
    let a: Array<any> = this;
    let result: Array<any> = [];
    var len: number = count > (len = a.length) ? len : count;
    for (var i = 0; i < len; ++i) {
        result.push(a[i]);
    }
    return result;
};

Array.prototype.TakeWhile = function (func: (x: any) => boolean): Array<any> {
    let a: Array<any> = this;
    let result: Array<any> = [];
    for (let i = 0, n = a.length, e: any; i < n; ++i) {
        e = a[i];
        if (func(e)) {
            result.push(e);
        } else {
            break;
        }
    }
    return result;
};
