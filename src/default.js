// JavaScript Document

///////////////
function hexToHsl(hex) {
    // Convert hex to RGB first
    let r = 0, g = 0, b = 0;
    if (hex.length == 4) {
      r = "0x" + hex[1] + hex[1];
      g = "0x" + hex[2] + hex[2];
      b = "0x" + hex[3] + hex[3];
    } else if (hex.length == 7) {
      r = "0x" + hex[1] + hex[2];
      g = "0x" + hex[3] + hex[4];
      b = "0x" + hex[5] + hex[6];
    }
    // Then to HSL
    r /= 255;
    g /= 255;
    b /= 255;
    let cmin = Math.min(r,g,b),
        cmax = Math.max(r,g,b),
        delta = cmax - cmin,
        h = 0,
        s = 0,
        l = 0;
  
    if (delta == 0)
      h = 0;
    else if (cmax == r)
      h = ((g - b) / delta) % 6;
    else if (cmax == g)
      h = (b - r) / delta + 2;
    else
      h = (r - g) / delta + 4;
  
    h = Math.round(h * 60);
      
    if (h < 0)
        h += 360;
  
    l = (cmax + cmin) / 2;
    s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
      
    s = +(s * 100).toFixed(1);
    l = +(l * 100).toFixed(1);
  
    return [h, s, l];
}
///////////////
function hexToHsv(hex) {
  // Convert hex to RGB first
  let r = 0, g = 0, b = 0;
  if (hex.length == 4) {
    r = "0x" + hex[1] + hex[1];
    g = "0x" + hex[2] + hex[2];
    b = "0x" + hex[3] + hex[3];
  } else if (hex.length == 7) {
    r = "0x" + hex[1] + hex[2];
    g = "0x" + hex[3] + hex[4];
    b = "0x" + hex[5] + hex[6];
  }
  // Then to HSV
  r /= 255;
  g /= 255;
  b /= 255;
  var h,s,v;
  var min=Math.min(r,g,b);
  var max=v=Math.max(r,g,b);
  var difference = max - min;

  if (max == min)
    h = 0;
  else{
    switch(max) {
      case r: h=(g-b)/difference+(g < v ? 6 : 0);break;
      case g: h=2.0+(b-r)/difference;break;
      case b: h=4.0+(r-g)/difference;break;
    }
    h = Math.round(h * 60);
  }
  if(max==0){
		s=0;
  }else{
		s=1-min/max;
	}
  s=Math.round(s*100);
	v=Math.round(v*100);
	return [h,s,v];
}
//////////////////////////

///////////////////////////
function hslToHex(h, s, l) {
    h /= 360;
    s /= 100;
    l /= 100;
    let r, g, b;
    if (s === 0) {
      r = g = b = l; // achromatic
    } else {
      const hue2rgb = (p, q, t) => {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1 / 6) return p + (q - p) * 6 * t;
        if (t < 1 / 2) return q;
        if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
        return p;
      };
      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;
      r = hue2rgb(p, q, h + 1 / 3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1 / 3);
    }
    const toHex = x => {
      const hex = Math.round(x * 255).toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    };
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  }
/////////////////////////////////////////////
function hsvToHex(h, s, v) {
    h /= 360;
    s /= 100;
    v /= 100;
    let r, g, b;
    if (s === 0) {
      r = g = b = v; // achromatic
    } else {
      v = v/2;
      const hue2rgb = (p, q, t) => {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1 / 6) return p + (q - p) * 6 * t;
        if (t < 1 / 2) return q;
        if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
        return p;
      };
      const q = v < 0.5 ? v * (1 + s) : v + s - v * s;
      const p = 2 * v - q;
      r = hue2rgb(p, q, h + 1 / 3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1 / 3);
    }
    const toHex = x => {
      const hex = Math.round(x * 255).toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    };
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}
////////////////////////////////////////////////----------------------------------------------------------------------

 

var numberSlider = document.getElementsByClassName('numberSlider');
var numberSliderInput = document.getElementsByClassName('numberSliderInput');
var colorSlider = document.getElementsByClassName('colorSlider');

for(var i = 0; i< numberSlider.length; i++){
  numberSlider[i].addEventListener('input', function(e) {
    e.target.previousElementSibling.value = e.target.value;
    // console.log(e.target.value);
  });
}

for(var i = 0; i < numberSliderInput.length; i++){
  numberSliderInput[i].addEventListener('change', function(e) {
    // e.target.nextSibling.value = e.target.value;
    e.target.nextElementSibling.setSelectionRange = e.target.value;
    console.log(e.target.nextElementSibling.value);
  })
}

for(var i = 0;i< colorSlider.length;i++){
  colorSlider[i].addEventListener('input', function(e) {
  var color = e.target.previousElementSibling.value;
  e.target.previousElementSibling.value = hsvToHex(hexToHsv(color)[0],hexToHsv(color)[1],e.target.value*100);
  });
}


