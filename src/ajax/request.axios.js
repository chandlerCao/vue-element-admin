import axios from 'axios'

const { serverName } = require('./request.config')

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

import { Notification } from 'element-ui';
// 响应拦截器
axios.interceptors.response.use(({ data }) => {
    if (data.c === 0) {
        if (data.m) Notification({
            title: '成功',
            message: data.m,
            type: 'success'
        })
        return data.d
    }
    else {
        Notification.error({
            title: '错误',
            message: data.m
        })
        return Promise.reject(data.m)
    }
}, error => {
    Notification.error({
        title: '错误',
        message: error
    })
    return Promise.reject(error)
})

export default async (requestObj, args) => {
    if (requestObj.method === 'get')
        args = { params: { ...args } }
    return await axios[requestObj.method](requestObj.url, args)
}