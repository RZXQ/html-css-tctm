var middle = document.getElementById('middle');
var album_maxWidth = 3500;
var album_l = middle.offsetLeft;
middle.timer = setInterval(function() {
  album_l -= 2;
  if (album_l <= -album_maxWidth) {
    album_l = 0;
  }
  middle.style.left = album_l + 'px';
}, 30);

middle.onmouseover = function() {
  clearInterval(middle.timer);
};

middle.onmouseleave = function() {
  middle.timer = setInterval(function() {
    album_l -= 2;
    if (album_l <= -album_maxWidth) {
      album_l = 0;
    }
    middle.style.left = album_l + 'px';
  }, 30);
};

var dotArr = document.getElementsByClassName('dot');
for (var i = 0; i < dotArr.length; i++) {
  dotArr[i].index = i;
  dotArr[i].onclick = function() {
    index = this.index;
    fnTab(index);
    doMove(middle, 'left', 20, -700 * (index));
  };
}

// 封装的方法预留
function fnTab(index) {
  for (var i = 0; i < dotArr.length; i++) {
    dotArr[i].className = 'dot';
  }
  dotArr[index].className = 'dot active';
}

function doMove(obj, attr, times, target, fn) {
  var t = 0;
  var b = css(obj, attr);
  var c = target - b;
  var d = times;
  clearInterval(obj.timer);
  obj.timer = setInterval(function() {
    t++;
    if (t >= d) {
      t = d;
      clearInterval(obj.timer);
      obj.timer = null;
    }
    obj.style[attr] = Tween.Cubic.easeInOut(t, b, c, d) + 'px';
    if (t == d) {
      if (typeof fn === 'function')
        fn();
    }
  }, 20);
}

function css(obj, attr) {
  return parseFloat(obj.currentStyle ? obj.currentStyle[attr] : getComputedStyle(obj)[attr]) || 0;
}
