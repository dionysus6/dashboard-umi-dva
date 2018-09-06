import fetch from 'dva/fetch'
import { notification } from 'antd'
import router from 'umi/router';

import { checkStatus } from './checkStatus'

export const fetchDelete = (url) => {
  fetch(url,{method:"DELETE"}).then(checkStatus).then((res)=>{
    //console.log(res)
  }).catch((error) => {
    // 处理接口返回的数据格式错误的逻辑
    console.log(error.name)
    if (error.code) {
      notification.error({
        message: error.name,
        description: error.message,
      });
    }
    if ('stack' in error && 'message' in error) {
      notification.error({
        message: `请求错误: `,
        description: error.message,
      });
    }
    return error;
  });
}

export const fetchAdd = (url, data)=>{
  //console.log(url)
  fetch(url, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json"
    },
  }).then(checkStatus).then(function(response) {
    console.log(response.text())
    router.push('./')
  }, function(error) {
    console.log(error.message) //=> String
  }).catch((error) => {
    // 处理接口返回的数据格式错误的逻辑
    if (error.code) {
      notification.error({
        message: error.name,
        description: error.message,
      });
    }
    if ('stack' in error && 'message' in error) {
      notification.error({
        message: `请求错误: `,
        description: error.message,
      });
    }
    return error;
  });
}

export const fetchShowGroup = function(url){
  fetch(url).then(checkStatus).then((res) => {
    res.json().then((data) => {this.setState({data:data})})

  }).catch((error) => {
    // 处理接口返回的数据格式错误的逻辑
    if (error.code) {
      notification.error({
        message: error.name,
        description: error.message,
      });
    }
    if ('stack' in error && 'message' in error) {
      notification.error({
        message: `请求错误: `,
        description: error.message,
      });
    }
    return error;
  });

}

export const fetchShowSign = function (url,groupSigns) {
  //console.log(this)
  //console.log(url)
  fetch(url).then(checkStatus).then((res) => {
    res.json().then((data) => {
      this.setState({sign_data:data})
      if(groupSigns==null){
        this.props.dispatch({
          type:'currentUser/allSigns',
          payload:data,
        })
      }
    })

  }).catch((error) => {
    // 处理接口返回的数据格式错误的逻辑
    if (error.code) {
      notification.error({
        duration: 30,
        message: error.name,
        description: error.message,
      });
    }
    if ('stack' in error && 'message' in error) {
      notification.error({
        message: `请求错误: `,
        description: error.message,
      });
    }
    return error;
  });
}
