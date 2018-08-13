import jsonp from 'common/js/jsonp'
import axios from 'axios'
import {animationDay, animationRid, options} from "./config";
import {param} from "../common/js/jsonp";

export function getHome() {
  let url='/api/home';
  return axios.get(url,{}).then((res)=>{
    return Promise.resolve(res.data);
  })
}

export function getCommon(rid,day) {
  const url='/api/common';
  const data={
    rid:rid,
    day:day,
    jsonp:'jsonp'
  };
  return axios.get(url,{
    params:data
  })
    // .then((res)=>{
    //   return Promise.resolve(res.data);
    // });
}


export function getRecommend(paramList) {
  return axios.get('/api/recommend',{
    params:paramList
  }).then((res)=>{
    return Promise.resolve(res);
  });

}

export function getOthers(item) {

  return   axios.get('/api/others',{
    params:{
      rid:item.id,
      day:7
    }
  }).then((res)=>{
    return Promise.resolve(res.data);
  });
}

export function getMore(tid,pn) {
  return axios.get('/api/getMore',{
    params:{
      json:'jsonp',
      tid:tid,
      pn:1
    }
  }).then((res)=>{
    return Promise.resolve(res.data);
  })
}
