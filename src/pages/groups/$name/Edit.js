import React from 'react';
import { Form, Input, Button, Popconfirm } from 'antd';
import router from 'umi/router';
import { connect } from 'dva';

import {fetchDelete, fetchAdd} from '../../../utils/fetchFunction';
import  {api_host}  from '../../../utils/request'

const { TextArea } = Input;

class Widget extends React.Component {

  deleteGroupFetch(name){
    const DURL = api_host(`groups/${name}`);
    console.log(DURL)
    fetchDelete(DURL)
  }
  handleClick = () => {
    this.deleteGroupFetch(this.props.match.params.name);
    setTimeout(function () {
      router.push('./');
    }, 10)
  }
  newGroupFetch(data){
    data.requestInterval=Number(data.requestInterval);
    data.timeSyncInterval=Number(data.timeSyncInterval);
    console.log(data)
    const UURL = api_host(`groups/${this.props.match.params.name}`);
    console.log(UURL)
    fetchAdd(UURL,data);

  }
  handleSubmit = (e) =>{
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.newGroupFetch(values);
      }
    });
  }
  handleReset = () => {

    this.props.form.resetFields();
    //console.log(this)
  }
  render(){
    const FormItem = Form.Item;
    const { getFieldDecorator } = this.props.form;

    //console.log(this.props.groupItem);

    return(
      <div>
        <h2 style={{textAlign:'center'}}>Edit Group {this.props.match.params.name}</h2>
        <Form
          className="ant-advanced-search-form"
          onSubmit={this.handleSubmit}
        >
          <FormItem label="Label">
            {getFieldDecorator("label", {
              rules: [{
                required: true,
                message: 'Required!',
              }],

            })(
              <Input placeholder="Label" />
            )}
          </FormItem>
          <FormItem label="Request Interval">
            {getFieldDecorator("requestInterval", {
              rules: [{
                required: true,
                message: 'Required to Input Number!',
                type: "number",
                transform(value) {
                  return Number(value);
                },
              }],

            })(
              <Input placeholder="Request Interval" />
            )}
          </FormItem>
          <FormItem label="Time Sync Interval">
            {getFieldDecorator("timeSyncInterval", {
              rules: [{
                required: true,
                message: 'Required to Input Number!',
                type: "number",
                transform(value) {
                  return Number(value);
                },
              }],

            })(
              <Input placeholder="Time Sync Interval" />
            )}
          </FormItem>
          <FormItem label="Message">
            {getFieldDecorator("message", {
              rules: [{
                required: true,
                message: 'Required!',
              }],

            })(
              <TextArea placeholder="Message" />
            )}
          </FormItem>

          <Button  type="primary" htmlType="submit" onClick={()=>{setTimeout(function () {
            router.push('../');
          }, 10)}}>
            Save
          </Button>

          <Button style={{ marginLeft: 8 }} onClick={this.handleReset}>
            Clear
          </Button>
          <Button type="primary" style={{ marginLeft: 8 }} onClick={()=>router.push('../')}>
            Back
          </Button>
          <Popconfirm title="Sure to delete?" onConfirm={() => this.handleClick()} >
            <Button type="danger" style={{float:"right"}}>Delete</Button>
          </Popconfirm>
        </Form>

      </div>
    )
  }
}
function mapStateToProps(state) {
	return {
		groupItem: state.currentUser.groupItem,
	}
}
const EditWidget = Form.create()(Widget);
export default connect(mapStateToProps)(EditWidget);
