import {ApplicationConfig} from './BaseConfig';

export const AppConfig: ApplicationConfig = {
    DefaultPageSize: 50,
    WebStaticFile: {
        dotfiles: 'ignore',
        etag: false,
        extensions: ['htm', 'html'],
        index: false,
        maxAge: '1d',
        redirect: false,
        setHeaders: function (res: any, path: string, stat: string) {
            res.set('x-timestamp', Date.now().toString());
        }
    }
};
