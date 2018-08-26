const Mock=require('mockjs');
const Random=Mock.Random;

const testData=function () {

  let data=[];
  for(let i=0;i<100;i++){
    let obj={
      'pic':Random.dataImage('300x250', 'mock的图片'),
      'duration|1-10.2':2,
      'play|1000-20000':10000,
      'video_review|1000-20000':10000,
      'title':Random.cname(),
    };
    data.push(obj);
  }

  return {
    code:0,
    data:{
      list:data
    }
  };
}

Mock.mock('/api/home',testData());
