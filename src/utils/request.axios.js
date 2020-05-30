import axios from 'axios'

const { serverName } = require('../../request.config')

axios.defaults.baseURL = serverName

// 请求拦截器
// axios.interceptors.request.use(function (config) {
//     const formdata = new FormData()
//     for (const key in config.data) {
//         formdata.append(key, config.data[key])
//     }
//     config.data = formdata
//     // config.headers.Authorization = window.localStorage.getItem('token') || '';
//     return config;
// });

import { Message } from 'element-ui';
// 响应拦截器
axios.interceptors.response.use(({ data }) => {
    if (data.c === 0) {
        if (data.m) Message({
            type: 'success',
            message: data.m
        })
        return data.d
    }
    else Message({
        type: 'error',
        message: data.m
    })
    // return Promise.reject(data.message)
}, error => {
    window.console.log(error)
    return Promise.reject(error)
})

export default async (requestObj, args) => {
    return await axios[requestObj.method](requestObj.url, args)
}