import React from 'react';
import { Table, Button, Form, Input, Icon, notification } from 'antd';
import router from 'umi/router';
import { connect } from 'dva';

import {fetchShowSign} from '../../utils/fetchFunction';
import  {api_host}  from '../../utils/request'



const FormItem = Form.Item;
const _ = require('lodash');

class Widget extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data:[],
      sign_data:[],
      alertVisible:false,

    }
    this.columns = [

      {
        title: 'Mac',
        dataIndex: 'mac',
        key: 'mac',
        width: '10%',
      },{
        title: 'Label',
        dataIndex: 'label',
        key: 'label',
        width: '12%',
        //    editable: true,
      },{
        title: 'Message',
        dataIndex: 'message',
        //  editable: true,
        key: 'message'
      },{
        title: 'Request Interval',
        dataIndex: 'requestInterval',
        key: 'requestInterval',
        //  editable: true,
      },{
        title: 'TimeSync Interval',
        dataIndex: 'timeSyncInterval',
        //  editable: true,
        key: 'timeSyncInterval'
      },

    ];
  }
  componentDidMount(){
    const URL = api_host(`groups/${this.props.groupItem.name}/signs`);
    this.fetchShowSign = fetchShowSign.bind(this);
    this.fetchShowSign(URL,'groupSigns');
  }
  deleteSignFetch(mac){
    const DURL = api_host(`groups/${this.props.groupItem.name}/signs/${mac}`);
    // console.log(DURL)
    fetch(DURL,{method:"DELETE"}).then((res)=>{
      //console.log(res)
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
        message: `请求错误: ${DURL}`,
        description: error.message,
      });
    }
    return error;
  })
  }
  addSignFetch(mac){

    // console.log(mac)
    // console.log(this.props.groupItem.name)
    const NURL = api_host(`groups/${this.props.groupItem.name}/signs/${mac}`);
    // console.log(NURL)
    fetch(NURL, {
      method: "POST",
      body: '',
      headers: {
        "Content-Type": "application/json"
      },
    }).then(function(response) {
      // console.log(response.text())
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
        message: `请求错误: ${NURL}`,
        description: error.message,
      });
    }
    return error;
  });
  }
  handleDelete = (e) =>{
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      // console.log(values.Name)
      const SignItemIndex =  _.findIndex(this.state.sign_data,{mac:values.Name})
      if (!err) {
        if (SignItemIndex<0) {
          alert("Not Found!")

        } else {
          this.deleteSignFetch(values.Name);
          this.state.sign_data.splice(SignItemIndex,1)

        }
      }
    })
  }
  handleAdd = (e)=>{
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      // console.log(values.Name)
      // console.log(this.props.allSigns)
      const SignItemIndex =  _.findIndex(this.state.sign_data,{mac:values.Name})
      if (!err) {
        if (SignItemIndex<0) {
          const SignItemIndexInAll = _.findIndex(this.props.allSigns,{mac:values.Name});
          if(SignItemIndexInAll<0){
            alert("Not Found Match MacId Sign")
          }else{
            this.addSignFetch(values.Name)
            this.state.sign_data.push(this.props.allSigns[SignItemIndexInAll])
          }
        } else {
          alert("Alreay Exsit!")
        }
      }
    })
    this.props.form.resetFields();
  }
  render(){
     // console.log(this.props.allSigns)
     const { getFieldDecorator } = this.props.form;
     return (
       <div>
         <Table  dataSource={this.state.sign_data}  columns={this.columns} bordered={true} rowKey={record=>record.id}/>
         <br/>
         <Form onSubmit={this.handleAdd}>
           <FormItem>
             {getFieldDecorator('Name', {
               rules: [{ required: true, message: 'Please input sign MacId!' }],
             }
             )(
               <span>
                 <Input style={{ width: 300 }} prefix={<Icon type="idcard" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Enter Sign MacId" size="large"/>

                 <Button style={{marginLeft: 10}} type="primary" htmlType="submit" >
                   Add
                 </Button>
               </span>
             )}
           </FormItem>
         </Form>
         <Form onSubmit={this.handleDelete}>
           <FormItem>
             {getFieldDecorator('Name', {
               rules: [{ required: true, message: 'Please input sign MacId!' }],
             }
             )(
               <span>
                 <Input style={{ width: 300 }} prefix={<Icon type="idcard" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Enter Sign MacId" size="large"/>

                 <Button style={{marginLeft: 10}} type="danger" htmlType="submit" >
                   Delete
                 </Button>
               </span>
             )}
           </FormItem>
         </Form>
         <Button  type="primary" style={{ marginLeft: 8 }} onClick={()=>router.push('./')}>
           Back
         </Button>
       </div>

     )
   }
  }
  function mapStateToProps(state) {
  	//console.log(state)
  	return {
  		groupItem: state.currentUser.groupItem,
      allSigns: state.currentUser.allSigns,
  	}
  }
  const WrappedWidget = Form.create()(Widget)
  export default connect(mapStateToProps)(WrappedWidget)
