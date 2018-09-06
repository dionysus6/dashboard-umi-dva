import React from 'react';
import { Form, Input, Button } from 'antd';
import router from 'umi/router';

import {fetchAdd} from '../../utils/fetchFunction';
import  {api_host}  from '../../utils/request'

const { TextArea } = Input;

class Widget extends React.Component {

  newGroupFetch(data){
    data.requestInterval=Number(data.requestInterval);
    data.timeSyncInterval=Number(data.timeSyncInterval);
    const NURL = api_host("groups");
    fetchAdd(NURL,data);
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.newGroupFetch(values);
      }
    });
  }
  handleReset = () => {
    this.props.form.resetFields();
  }
  render(){
    const FormItem = Form.Item;
    const { getFieldDecorator } = this.props.form;
    return(
      <div>
        <Form
          className="ant-advanced-search-form"
          onSubmit={this.handleSubmit}
        >
          <FormItem label="Name">
            {getFieldDecorator("name", {
              rules: [{
                  required: true,
                  message: 'Required!',
              }],
            })(
              <Input placeholder="Group Name" />
            )}
          </FormItem>
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

          <Button type="primary" htmlType="submit" >
            Create
          </Button>

          <Button style={{ marginLeft: 8 }} onClick={this.handleReset}>
            Clear
          </Button>
          <Button type="primary" style={{ marginLeft: 8, float: "right" }} onClick={()=>router.push('./')}>
            Back
          </Button>
        </Form>
      </div>
    )
  }
}
const WrappedWidget = Form.create()(Widget);
export default WrappedWidget;
