// Your JavaScript code goes here
//元素准备
const simpleData = [
    { name:'blue', image:''},
    { name:'pink', image: ''},
    { name:'yellow', image :''}
];
const colorContainer = document.getElementById('color-container');

simpleData.forEach(color => {
    const colorDiv = document.createElement('div');
    colorDiv.textContent = color.name;

    // 创建image元素
    const img = document.createElement('img');
    img.src = color.image;
    // alternative text 图片未加载出时添加描述
    img.alt = color.name + ' image';

    // 将image元素添加到颜色容器中
    colorDiv.appendChild(img);

    // 将颜色容器添加到页面中
    colorContainer.appendChild(colorDiv);
});

//卡片
const size = 50; // 单元格尺寸
const rows = 3;  // 行数
const columns = 3; // 列数
const groupcount = 3; //三个元素消除
const group = 6; //每个元素六组消除
const layercount = 2; //总层数
const cellhtml = []; //用于储存html数据的空数组
const renderData = Array.from(new Array(groupcount * group)).map(v => {
    return simpleData.map(v => ({ ...v }))
}).flat().sort( v => Math.random()-0.5) //随机渲染准备

//绘制布局
let a = b = c = 0
const Array = []
for(let i = 0; i < 3; i++){
    for(let j = 0;j < 9; j++){
        //打乱
        let x = parseInt(Math.random()* 3)
        switch(x){
            case 0: if(a!==9){array.push(arr[x]);a++;}break;
            case 1: if(b!==9){array.push(arr[x]);b++;}break;
            case 2: if(c!==9){array.push(arr[x]);c++;}break;
        }
    }
}
//对应补满
if(a !== 9){let i = 9 - a; while(i !== 0){array.push(arr[0]);i--}}
if(b !== 9){let i = 9 - b; while(i !== 0){array.push(arr[1]);i--}}
if(c !== 9){let i = 9 - c; while(i !== 0){array.push(arr[2]);i--}}

//container里随机位置
let left = parseInt(Math.random()*x)
let top = parseInt(Math.random()*y)

element.style.cssText = "left:"+`${left}`+"px; top:"+`${top}`+"px;"
document.querySelector('.container').appendChild(element)

//遮挡效果
//检查元素是否可视
const zd = new IntersectionObserver((data)=>{
    if(data[0].isVisible===false){
        element.classList.add('mask')
    }
    else{
        element.classList.remove('mask')
        element.classList.add('visible')
        zd.unobserve(element)
    }
},
{
    threshold: [1,0],
    delay: 500,
    trackVisibility: true,
})
zb.observe(element)
//mask效果设置
const maskElement = document.createElement('div');

maskElement.style.position = 'fixed';
maskElement.style.content = '';
maskElement.style.display = 'block';
maskElement.style.width = '30px';
maskElement.style.height = '30px';
maskElement.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
maskElement.style.borderRadius = '5px';

document.body.appendChild(maskElement);

//点击去除

