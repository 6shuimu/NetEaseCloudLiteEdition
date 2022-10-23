import axios from "axios";

// 根路径
const root = 'http://localhost:3000'

// 错误信息
const mistake = {
  data:{},
  status:700
}

// 推荐歌单 limit是要取出的歌单数量 推荐歌单:/personalized
// 新碟上架 新碟上架:/top/album
// 所有榜单/toplist
// 获取歌单详情/playlist/detail
// 推荐mv /personalized/mv
// 歌手分类列表/artist/list
// 歌单分类 /playlist/catlist
// 全部 mv /mv/all
// 二维码 key 生成接口 /login/qr/key
// 二维码生成接口 /login/qr/create
// 二维码检测扫码状态接口 /login/qr/check
// 发送验证码 /captcha/sent
// 验证验证码 /captcha/verify
export async function General(address,data) {
  return await axios.get(root + address,{params:data})
  .then(res=>res)
  .catch(err=>mistake)
}
