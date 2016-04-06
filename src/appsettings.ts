class AppSettings {
    HTTPS_ENABLED = false;
    PORT = this.HTTPS_ENABLED ? 443 : 80;
    HTTPS_SERVER_KEY_PATH = '';
    HTTPS_SERVER_CERT = '';
    APP_BASE = '/';
    DOCS = '/docs';
    WWW = '/www';
}

const Settings: AppSettings = new AppSettings();
export = Settings;
