/**
 *  本js用于oauth认证
 *  @author 张富利
 *
 * */

import API from '../../pages/API'
import UUIDV4 from 'uuid/v4'
import CryptoJS from 'crypto-js'
import Axios from 'axios'
import Qs from 'qs'


/**
 *  获取加密后的签名
 *  @param clientSecret 服务器端颁发
 *  @param URI 请求路径
 *  @param method 请求方法
 *  @param obj 请求参数的object(不含signature)
 *  @return code 加密后的签名
 *
 * */

function signature(clientSecret, URI, method, obj) {
    let newkey = Object.keys(obj).sort();
    let newObj = {};
    for (let i = 0; i < newkey.length; i++)
        newObj[newkey[i]] = obj[newkey[i]];

    let code = URI + method;
    Object.entries(newObj).forEach(([key, value]) => {
        code += `${key}` + "=" + `${value}` + "&"
    });
    code =  code.substring(0, code.length - 1);

    let base64 = CryptoJS.enc.Base64.stringify(CryptoJS.HmacSHA256(
        code,
        clientSecret
    )).toString();
    //与服务端对应base64url
    let base64url = base64.split('+').join('-').split('/').join('_');
    return base64url
}

/**
 *  用于获取服务器端的时间戳，并调用oauth
 *  @param app App作用域
 *
 * */

function getTimeStamp(app) {
    let path = "/v1/time/epoch";
    let pre = new Date().getTime();
    Axios.get(API.gateway + path).then((response) => {
        app.timestamp = response.data;
        oauth(app.timestamp + new Date().getTime() - pre, app);
    }).catch((error) => {
        console.log(error)
    });
}
/**
 *  用于请求服务器获取accesstoken，并保存在App的参数里面
 *  @param timestamp 服务器时间戳
 *  @param app App作用域
 *
 * */

function oauth(timestamp, app) {
    const clientID = "softeng_dop_webAL6-aLDpLKqCdhA";
    const clientSecret = "AKubxFOEGfWV0vig8XbI08-EC3AheDNG6GD_9upruWmrp-Rd6lny9fkHj6GsWhzD2A==";
    let URI = "/v1/oauth/token";
    let data = {
        grant_type: "client_credentials",
        client_id: clientID,
        timestamp: timestamp,
        nouce: UUIDV4()
    };

    data = {...data, signature: signature(clientSecret, URI, "POST", data)};

    Axios.post(API.gateway + URI, Qs.stringify(data)).then((response)=>{
        app.access_token = response.data.access_token;
        console.log(response.data.access_token);
        Axios.defaults.headers.common['Authorization'] = "Bearer " + response.data.access_token;
    }).catch((error)=>{
        console.log(error)
    })
}

/**
 *  本函数用于测试携带access_token访问服务
 *  @param access_token
 *
 * */
function actuator(access_token) {
    let path = "/user-server/actuator/health";

    Axios.get(API.gateway + path).then((response)=>{
        console.log(response)
    }).catch((error)=>{
        console.log(error)
    })
}

export {getTimeStamp}

