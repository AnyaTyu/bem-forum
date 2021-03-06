const env = process.env;
const config = {
    staticFolder: 'static',
    defaultPort: 3000,
    cacheTTL: 30000,
    pathPrefix: env.BEM_FORUM_PATH_PREFIX || '',

    sessionSecret: 'REPLACE_ME_WITH_RANDOM_STRING',
    langs: env.BEM_FORUM_LANGS ? env.BEM_FORUM_LANGS.split(',') : ['ru', 'en'],
    defaultLang: env.BEM_FORUM_DEFAULT_LANG || 'ru',

    ghAPI: 'https://api.github.com',
    org: env.BEM_FORUM_ORG || 'bem-site',
    repo: env.BEM_FORUM_CONTENT_PATH || 'bem-forum-content-en'
};

let secretConfig;

try {
    secretConfig = require('./secret-config');
} catch (err) {
    console.error('No "secret-config.js" file found...');
}

const resultConfig = Object.assign({}, secretConfig, config);

resultConfig.github || (resultConfig.github = {});

env.BEM_FORUM_TOKENS && (resultConfig.github.tokens = env.BEM_FORUM_TOKENS.split(','));
env.BEM_FORUM_CLIENT_ID && (resultConfig.github.clientID = env.BEM_FORUM_CLIENT_ID);
env.BEM_FORUM_CLIENT_SECRET && (resultConfig.github.clientSecret = env.BEM_FORUM_CLIENT_SECRET);
resultConfig.github.authCallbackSite = env.BEM_FORUM_AUTH_CALLBACK_SITE || '';

module.exports = resultConfig;
