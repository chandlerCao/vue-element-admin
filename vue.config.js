const { serverName, serverUrl } = require('./src/ajax/request.config')
module.exports = {
    outputDir: 'blog-admin',
    devServer: {
        proxy: {
            [serverName]: {
                target: serverUrl
            }
        }
    }
}