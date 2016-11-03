/*
lodaing 插件

new Loading([{
		name:名称,
		type:类型,//mp3,img,font
		src:url
	}],function(elem){单次加载完成,有返回值elem},function(n){全部加载完成,有返回值n})

font类型 css必须配置
@font-face{font-family:'造字工房悦黑细体';src:url('font/造字工房悦黑细体.otf') format('truetype');}
@font-face{font-family:'STXINGKA';src:url('font/STXINGKA.TTF') format('truetype');}
@font-face{font-family:'华康海报体W12';src:url('font/华康海报体W12.TTF') format('truetype');}
@font-face{font-family:'简大黑';src:url('font/简大黑.TTF') format('truetype');}
@font-face{font-family:'造字工房悦黑细体';src:url('font/造字工房悦黑细体.otf') format('truetype');}

 * */
function Loading() {
  this.init.apply(this, arguments)
}
Loading.prototype.init = function(aload, conduct, success) {
  var iCount = aload.length,
    iLoaded = 0,
    num = 0;
  for(var i = 0; i < iCount; i++) {
    (function(i) {
      switch(aload[i].type) {
        case 'img':
          var oImg = new Image();
          oImg.onload = function() {
            loadfun(i);
            this.onload = null;
          }
          oImg.src = aload[i].src;
          break;
        case 'font':
          document.fonts.load('1em ' + aload[i].src).then(function() {
            loadfun(i);
          }, function() {
            console.log(aload[i].src + '字体加载失败');
          });
          break;
        case 'mp3':
          var oAudio = new Audio();
          oAudio.onloadedmetadata = function() {
            loadfun(i);
            this.onload = null;
          }
          oAudio.src = aload[i].src
          break;

        default:
          console.log('load格式错误');
          return false;
          break;
      }
    })(i);
  }

  var loadfun = function(i) {
    num = Math.ceil(++iLoaded / iCount * 100);
    if(typeof(conduct) == 'function') {
      conduct({
        name: aload[i].name,
        type: aload[i].type,
        num: num,
        src: aload[i].src
      });
    }
    if(num == '100') {
      if(typeof(success) == 'function') {
        success(num);
      }
    }
  }
}

function load(opt,arguments) {
  if(arguments!=undefined){
    return new Loading(opt,arguments);
  }else{
    return new Loading(opt.id, opt.fileok, opt.sussess);
  }
}