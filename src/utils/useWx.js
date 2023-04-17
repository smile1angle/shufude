import { isNull } from '@/utils/ischeck.js';
import qs from 'qs';
import { watch } from 'vue';
import { useRoute } from 'vue-router';
export const useWXAuth = () => {
    const { VITE_API_URL } =
    import.meta.env;
    console.log(VITE_API_URL);
    // const VITE_API_URL = 'http://local.softide.com';
    const route = useRoute();
    watch(() => route.path, () => {
        console.log(location.pathname);

        const token = localStorage.getItem('b_token');
        const REDIRECT_URI = `${location.origin}${location.pathname}`;
        const search = location.search;
        const query = qs.parse(search, { ignoreQueryPrefix: true });
        // const authUrl = `${VITE_API_URL}/wechat/oauth?state=${REDIRECT_URI}`;
        const authUrl = `${VITE_API_URL}/xcx/luckyDraw/getAuthorizeUrl?state=${REDIRECT_URI}`;
        if (isNull(token)) {
            console.log(0);
            if (query.auth_openid) {
                localStorage.setItem('b_token', query.auth_openid);
            } else {
                window.location.replace(authUrl)
            }
        }

    })
}