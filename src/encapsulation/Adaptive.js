// 处理加载组件宽度的
export function Adaptive(data) {
  return data.value.offsetWidth
}

// 存定时器
let temp = 0

// 存定时用到的距离
let t = 0

// 青春版轮播图
export async function Carousel(data,num) {
  
  // 清除定时器
  clearInterval(temp)

  // 创建定时器
  temp = await setInterval(()=>{
    t = (num - data.children[0].offsetLeft)/10
    t = t>0?Math.ceil(t):Math.floor(t)
    if(data.children[0].offsetLeft === num) {
      clearInterval(temp)
    }
    data.children[0].style.left = data.children[0].offsetLeft + t + 'px'
  },15)
}

// 清除样式
export function Clear_the_style(data) {
  // 转换为数组
  const temp = data.className.split(',')
  // 要删除的下标
  const subscript = temp.indexOf('Na-click')
  if(subscript !== -1) {
    temp.splice(subscript,1,'')
    data.className = temp.join(' ')
  }
}