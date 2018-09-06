import React from 'react'
import { Form, Input, Button } from 'antd'
import router from 'umi/router'

import  {api_host}  from '../../utils/request'
import {fetchAdd} from '../../utils/fetchFunction'

const { TextArea } = Input;

class Widget extends React.Component {

  newSignFetch(data){
    data.requestInterval=Number(data.requestInterval);
    data.timeSyncInterval=Number(data.timeSyncInterval);
    console.log(data)
    const url = api_host("signs");
    fetchAdd(url, data);
  }
  handleSubmit = (e) =>{
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.newSignFetch(values);
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
          <FormItem label="mac">
            {getFieldDecorator("mac", {
              rules: [{
                required: true,
                message: 'Required!',
              }],
            })(
              <Input placeholder="Mac ID" />
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
          <Button type="primary" style={{ marginLeft: 8, float:"right" }} onClick={()=>router.push('./')}>
            Back
          </Button>
        </Form>
      </div>
    )
  }
}
const WrappedWidget = Form.create()(Widget);
export default WrappedWidget;
