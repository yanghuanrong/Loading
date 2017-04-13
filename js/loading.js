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
! function(w, d) {
	function Z(opt) {
		this.init(opt.data, opt.conduct, opt.success)
	}
	Z.prototype.init = function(loadAll, conduct, success) {
		var iCount = loadAll.length,
			iLoaded = 0,
			num = 0;
		for(var i = 0; i < iCount; i++) {
			(function(i) {
				switch(loadAll[i].type) {
					case 'img':
						var oImg = new Image();
						oImg.onload = function() {
							loadfun(i);
							this.onload = null;
						}
						oImg.src = loadAll[i].src;
						break;
					case 'font':
						document.fonts.load('1em ' + loadAll[i].src).then(function() {
							loadfun(i);
						}, function() {
							console.log(loadAll[i].src + 'font timeout');
						});
						break;
					case 'audio':
						var oAudio = new Audio();
						oAudio.onloadedmetadata = function() {
							loadfun(i);
							this.onload = null;
						}
						oAudio.src = loadAll[i].src
						break;

					default:
						console.log('Load timeout');
						return false;
						break;
				}
			})(i);
		}

		function loadfun(i) {
			num = Math.ceil(++iLoaded / iCount * 100);
			if(typeof(conduct) == 'function') {
				conduct({
					name: loadAll[i].name,
					type: loadAll[i].type,
					num: num,
					src: loadAll[i].src
				});
			}
			if(num == '100') {
				if(typeof(success) == 'function') {
					success(num);
				}
			}
		}
	}

	function z(opt) {
		return new Z(opt);
	}
	window.load = z;
}(window, document);