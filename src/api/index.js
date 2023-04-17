// import request from '@/utils/11.js';
import HttpRequest from '@/utils/axios';
const { VITE_API_URL } =
import.meta.env

const axios = new HttpRequest({
    baseURL: VITE_API_URL
}).instance;


export const getSDK = (params) => axios.get('/api/wechat/config', { params });
export const getNumber = (params) => axios.get('/xcx/luckyDraw/getNo', { params });
export const getDraw = (params) => axios.get('/xcx/luckyDraw/draw', { params });
// export const submitVote = (data) =>                axios.post('/api/cdzx/vote',data);
// export const getShare = (data) =>                axios.post('/api/cdzx/share',data);
// export const getTest = () => axios.get('/api/aupu/index');