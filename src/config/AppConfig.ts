import {IApplicationConfig} from './BaseConfig';

export const AppConfig: IApplicationConfig = {
    AppBase: '/',
    HttpsCertificatepath: '',
    HttpsKeypath: '',
    // IsHttpsEnabled: false,
    DefaultPageSize: 50,
    ApiPort: this.IsHttpsEnabled ? 443 : 3000,
    WebBasePath: '/www',
    DocsBasepath: '/docs',
    WebStaticFile: {
        dotfiles: 'ignore',
        etag: false,
        extensions: ['htm', 'html'],
        index: ['index.html', 'index.htm'],
        maxAge: '1d',
        redirect: false,
        setHeaders: function (res: any, path: string, stat: string) {
            res.set('x-timestamp', Date.now().toString());
        }
    }
};
