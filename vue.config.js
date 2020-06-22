const { serverName, serverUrl } = require('./src/ajax/request.config')
module.exports = {
    devServer: {
        proxy: {
            [serverName]: {
                target: serverUrl
            }
        }
    }
}