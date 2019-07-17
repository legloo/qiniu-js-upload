// node
const qiniu = require('qiniu-js')
// es-module
// import * as qiniu from "qiniu-js";


/**
 * 
 * @param file 需要上传的文件
 * @param token 服务端获取的token
 * @param qiniuDomain 域名前缀
 */

export function qiniu_upload(file: File, token: String, qiniuDomain?: String) {
    let key = new Date().getTime().toString() + "." + file.name.split(".")[1];//自定义文件名，上传成功会返回
    let putExtra = {
        fname: file.name, //文件原文件名
        params: {}, //用来放置自定义变量
        mimeType: null //用来限制上传文件类型，为 null 时表示不对文件类型限制；限制类型放到数组里：["image/png", "image/jpeg", "image/gif"]
    };
    let config = {
        useCdnDomain: true, //表示是否使用 cdn 加速域名，为布尔值，true 表示使用，默认为 false。
        region: null //选择上传域名区域；当为 null 或 undefined 时，自动分析上传域名区域
    };
    // let that = this //
    let observer = {
        next(res: any) {
            console.log(res)
        },
        error(err: any) {
            console.log(err)
        },
        complete(res: any) {
            console.log(res);
            // that.obj = res
            // url = qiniuDomain+key //www.test.com/131248917249.png
        }
    };
    let observable = qiniu.upload(file, key, token, putExtra, config);//准备
    let subscription = observable.subscribe(observer);//开始上传
}