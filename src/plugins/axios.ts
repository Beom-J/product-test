import axios from 'axios';
import cookie from 'js-cookie';

axios.defaults.baseURL = '/api';

const tokenFromCookie = cookie.get('access_token');
//TODO axios 버전 0.27.2 에서는 Authorization 안먹음!! 알아보기
axios.defaults.headers.Authorization = `Bearer ${tokenFromCookie}`;

export const accessToken = tokenFromCookie;

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function getAccessToken() {
  let token = cookie.get('access_token');
  let tryCnt = 0;

  while (token === undefined) {
    await delay(100);
    token = cookie.get('access_token');
    tryCnt += 1;

    // 2초 이상 획득 실채 시 에러
    if (tryCnt > 20) {
      return undefined;
    }
  }
  // TODO 그냥 axios 랑 react-axios 랑 다른가??
  axios.defaults.headers.Authorization = `Bearer ${token}`;
  return token;
}
