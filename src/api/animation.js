import axios from 'axios'
import {animationRid} from "./config";
import {animationDay} from "./config";

export function getAnimation(type) {
  const url='/api/animation';
  const data={
    rid:animationRid[type],
    day:animationDay[type],
    jsonp:'jsonp'
  };
  return axios.get(url,{
    params:data
  }).then((res)=>{
    return Promise.resolve(res.data);
  });
}
