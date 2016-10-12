var path = require('path');


function resolveApp(relativePath) {
    return path.resolve(relativePath);
}

module.exports = {
    appBuild: resolveApp('build'),
    theme:resolveApp('src/app/theme'),
    appDist: resolveApp('dist'),
    appDev: resolveApp('dev'),
    appHtml: resolveApp('src/index.html'),
    appConfig: resolveApp('src/productionConfig'),
    appFavicon: resolveApp('favicon.ico'),
    appPackageJson: resolveApp('package.json'),
    appSrc: resolveApp('src/app'),
    manifestSrc: resolveApp('manifest'),
    appNodeModules: resolveApp('node_modules')
};
