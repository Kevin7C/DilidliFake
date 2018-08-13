export const Response_OK=0;

export const options = {
  param: 'jsonpCallback',
  prefix: 'jp'
}


export const initData=[
  {name:"首页",value:"/home"},
  {
    name:"动画",value:"/animation",
    list:[
      {name:"推荐",id:1,day:7},
      {name:"MAD·AMV",id:24,day:3},
      {name:"MMD·3D",id:25,day:3},
      {name:"短片·手书·配音",id:47,day:3},
      {name:"综合",id:27,day:3}
    ]
  },
  {
    name:"番剧",value:"/drama",
    list:[
      {name:"推荐",id:13,day:7},
      {name:"连载动画",id:33,day:7},
      {name:"完结动画",id:32,day:7},
      {name:"资讯",id:51,day:7},
      {name:"官方延伸",id:152,day:7}
    ]
  },
  {"name":"国创",value:"/home"},
  {"name":"音乐",value:"/home"},
  {"name":"舞蹈",value:"/home"},
  {"name":"科技",value:"/home"},
  {"name":"游戏",value:"/home"},
  {"name":"娱乐",value:"/home"},
  {"name":"鬼畜",value:"/home"},
  {"name":"电影",value:"/home"},
  {"name":"电视剧",value:"/home"},
  {"name":"纪录片",value:"/home"},
  {"name":"影视",value:"/home"},
  {"name":"时尚",value:"/home"},
  {"name":"生活",value:"/home"},
  {"name":"广告",value:"/home"},
  {"name":"直播",value:"/home"},
  {"name":"相簿",value:"/home"}
]

export const animationRid={
  recommend:"1", //推荐
  mad:'24', //MAD
  mmd:'25', //MMD
  short:'47', //短片
  complex:'27' //综合
}

export const animationDay={
  recommend:"7", //推荐
  mad:'3', //
  mmd:'3',
  short:'3',
  complex:'3'
};

export const drama={
  recommend:13, //推荐
  serial:33,  //连载动画
  end:32,  //完结动画
  advisory:51,  //咨询
  extension:152  //官方延伸
}
export const country={

};

export const music={

}


