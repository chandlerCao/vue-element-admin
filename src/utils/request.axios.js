import axios from 'axios'

const { serverName } = require('../../request.config')

axios.defaults.baseURL = serverName

// 请求拦截器
axios.interceptors.request.use(function (config) {
    const formdata = new FormData()
    for (const key in config.data) {
        formdata.append(key, config.data[key])
    }
    config.data = formdata
    // config.headers.Authorization = window.localStorage.getItem('token') || '';
    return config;
});

// 响应拦截器
axios.interceptors.response.use(({ data }) => {
    if (data.code === '00') return data.data
    return Promise.reject(data.message)
}, error => {
    window.console.log(error)
    return Promise.reject(error)
})

export default async (requestObj, args) => {
    return await axios[requestObj.method](requestObj.url, args)
}