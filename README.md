编写了一个集合了字体，声音，图片的web预加载。适合在移动端使用。<br>
### demo中的load根据需求自己更改<br>
```javascript
load({
    data:loadarry,
    conduct:function(i){
    	loadMove(i);
    },
    success:function(){
      All.innerHTML='全部加载完成';
      Music.play();
    }
})
```
### load提供了三个选项
* data 要加载的内容
* conduct 单个文件加载完成的回调函数
* success 全部加载完成的回调函数
### data内容格式示范<br>
```javascript
var loadarry=[
	{
		name:'图片',
		type:'img',
		src:'http://www.bz55.com/uploads/allimg/140928/1-14092Q21316.jpg'
	},{
		name:'造字工房悦黑细体',
		type:'font',
		src:'造字工房悦黑细体'
	},{
		name:'亡灵序曲',
		type:'audio',
		src:'http://www.internetke.com/jsEffects/2014101006/mp3/The Dawn.mp3'
	}
]
```
### 特别注意<br>
加载font的时候，css但中必须要使用 @font-face 调用字体。 如下
```css
@font-face{font-family:'造字工房悦黑细体';src:url('font/造字工房悦黑细体.otf') format('truetype');}
```
