export function wx_share(data) {
    const { title, desc, imgUrl, link } = data;
    //分享给朋友
    wx.updateAppMessageShareData({
        title: title, // 分享标题
        desc: desc, // 分享描述
        link: link, // 分享链接
        imgUrl: imgUrl, // 分享图标
        type: 'link', // 分享类型,music、video或link，不填默认为link
        success: function() {},
        cancel: function(err) {}
    });
    //分享到朋友圈
    wx.updateTimelineShareData({
        title: title, // 分享标题
        link: link, // 分享链接
        imgUrl: imgUrl, // 分享图标
        success: function() {},
        cancel: function(err) {
            // 用户取消分享后执行的回调函数
        }
    });
}
export const getImageUrl = (name) => {
    return new URL(`../assets/images/${name}`,
        import.meta.url).href;
};
import { getSDK } from "@/api";
export const lookLocation = async() => {
    const { data: sdkDate } = await getSDK({ js_api_list: ['updateAppMessageShareData', 'updateTimelineShareData'].join(','), url: encodeURIComponent(location.href.split('#')[0]) });
    wx.config({
        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: sdkDate.appId, // 必填，公众号的唯一标识
        timestamp: sdkDate.timestamp, // 必填，生成签名的时间戳
        nonceStr: sdkDate.nonceStr, // 必填，生成签名的随机串
        signature: sdkDate.signature, //必填，签名，见附录1
        jsApiList: sdkDate.jsApiList
    });
    wx.ready(function() {
        var localData = {
            latitude: 39.990161, // 纬度，浮点数，范围为90 ~ -90
            longitude: 116.43678, // 经度，浮点数，范围为180 ~ -180。
            name: '舒福德智能床(北四环居然店)', // 位置名
            address: '北京市朝阳区北四环东路65号居然之家家之尊馆6层', // 地址详情说明
            scale: 18, // 地图缩放级别,整型值,范围从1~28。默认为最大
            infoUrl: '' // 在查看位置界面底部显示的超链接,可点击跳转
        };

        wx.openLocation(localData);
    });
}