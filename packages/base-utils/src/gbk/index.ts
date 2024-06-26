import gbkUS from "./data/gbk_code_arr.json"

const gbk_us = gbkUS as number[];
const arr_index = 0x8140;
export function decode (arr:number[]) {
  var str = "";
  for (var n = 0, max = arr.length; n < max; n++) {
    var code = arr[n] & 0xff;
    if (code > 0x80 && n + 1 < max) {
      var code1 = arr[n + 1] & 0xff;
      if(code1 >= 0x40){
        code = gbk_us[(code << 8 | code1) - arr_index]
        n++;
      }
    }
    str += String.fromCharCode(code);
  }
  return str;
}
export function encode(str:string) {
  str += '';
  var gbk:number[] = [];
  var wh = '?'.charCodeAt(0); //gbk中没有的字符的替换符
  for (var i = 0; i < str.length; i++) {
    var charcode = str.charCodeAt(i);
    if (charcode < 0x80) gbk.push(charcode)
    else {
      var gcode = gbk_us.indexOf(charcode);
      if (~gcode) {
        gcode += arr_index;
        gbk.push(0xFF & (gcode >> 8), 0xFF & gcode);
      } else {
        gbk.push(wh);
      }
    }
  }
  return gbk;
}