import axios from 'axios';

import { isNull } from '@/utils/ischeck';
import { closeToast, showDialog, showFailToast, showLoadingToast } from 'vant';

export default class HttpRequest {

    constructor(options) {
        this.options = options;
        const instance = axios.create(this.options);

        this.instance = instance;
        this.queue = {}

        this.interceptors()
    }

    destroy(url) {
        delete this.queue[url];
        if (!Object.keys(this.queue).length) {
            closeToast()
        }
    }
    interceptors() {
        // 请求拦截
        this.instance.interceptors.request.use(config => {
                const token = localStorage.getItem('b_token');
                if (!isNull(token)) {
                    config.headers['openid'] = `${token}`;
                }

                // 添加全局的loading...
                if (!Object.keys(this.queue).length) {
                    showLoadingToast({
                        duration: 1000,
                        forbidClick: true,
                        message: '加载中',
                        className: 'voteSuccess1'
                    });
                }
                this.queue[config.url] = true;

                return config
            }, error => {
                return Promise.reject(error)
            })
            // 响应拦截
        this.instance.interceptors.response.use(({ data, status, config }) => {
            data = data;
            this.destroy(config.url);
            if (data.code == -1) {
                showDialog({
                    title: '温馨提示',
                    message: '请前往授权！',
                    className: 'voteSuccess'
                }).then(() => {
                    const VITE_API_URL = 'http://other.jia360.com';
                    const REDIRECT_URI = `${location.origin}${location.pathname}`;
                    const authUrl = `${VITE_API_URL}/wechat/oauth?state=${REDIRECT_URI}`;
                    window.location.replace(authUrl)
                });
                return Promise.reject();
            } else if (data.code !== 0) {
                showFailToast({
                    message: data.msg || '系统错误',
                    forbidClick: true,
                })
                return Promise.reject(data.msg || '系统错误');
            } else {
                return data;
            }



        }, error => {
            this.destroy(error.url);
            showFailToast('系统错误');
            return Promise.reject(error)
        })
    }
}