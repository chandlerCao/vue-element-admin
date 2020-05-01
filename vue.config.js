const { serverName, serverUrl } = require('./request.config')
module.exports = {
    devServer: {
        proxy: {
            [serverName]: {
                target: serverUrl
            }
        }
    }
}