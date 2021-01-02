import axios from 'axios'
import router from '@/router'

const { serverName } = require('./request.config')

axios.defaults.baseURL = serverName

// 请求拦截器
axios.interceptors.request.use(config => {
    config.headers.token = window.localStorage.getItem('token') || '';
    return config;
});

import { Notification } from 'element-ui';
// 响应拦截器
axios.interceptors.response.use(({ config, data }) => {
    if (data.c === 0) {
        if (data.m) Notification.success({
            title: data.m,
            message: '成功',
        })
        return data.d
    }
    else {
        Notification.error({
            title: data.m,
            message: `"${config.url}"接口调用失败`
        })
        return Promise.reject(data.m)
    }
}, ({ config, response }) => {
    Notification.error({
        title: response.data.m,
        message: `"${config.url}"接口调用失败`
    })
    console.log(router.history.current.fullPath)
    if (response.status === 401 && router.history.current.name !== '登陆') router.push({
        path: '/login',
        query: {
            redirect: router.history.current.fullPath
        }
    })
    return Promise.reject(response.data.m)
})

export default async (requestObj, args) => {
    if (requestObj.method === 'get')
        args = { params: { ...args } }
    return await axios[requestObj.method](requestObj.url, args)
}