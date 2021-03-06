
let elementStyle=document.createElement('div').style;
let vendor=(()=>{
  const transforNames={
    webkit:'webkitTransform',
    Moz:'MozTransform',
    O:'OTransform',
    ms:'msTransform',
    standard:'transform'
  };
  for(let key in transforNames){
    if(elementStyle[transforNames[key]]!==undefined){
      return key;
    }
  }
  return false
})()

export function perfixStyle(style) {
  if(vendor===false){
    return false;
  }
  if(vendor==='standard'){
    return style;
  }
  return vendor+style.charAt(0).toUpperCase()+style.substr(1);
}
