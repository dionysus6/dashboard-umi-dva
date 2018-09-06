import React from 'react'
import { Input, Button, Form, Icon,} from 'antd';
import router from 'umi/router';
import { connect } from 'dva';


const FormItem = Form.Item;
const _ = require('lodash');

class SearchForm extends React.Component {
  constructor(props) {
    super(props);
    this.state ={
      // searchOption: ""||"group",
      items:[],
      //placeholder:"group",
      alertVisible:false,
      //optionValue: "group",
    }
    //console.log(this.state.searchOption)
  }
  handleSubmit = (e) =>{
    //console.log(this.props.data)
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      // console.log(values.Name)
      const GroupItemIndex =  _.findIndex(this.props.data,{name:values.Name})
      if (!err) {
        if (GroupItemIndex<0) {
          alert("Not Found!")

        } else {
          // console.log('Received values of form: ', values);
          //if(this.state.optionValue==="group"){
          // console.log(this)
          this.props.dispatch({
            type:'currentUser/edit',
            payload:this.props.data[GroupItemIndex],
          });
          router.push('/groups/SearchGroupItem');

        }


      }
    });

  }

  render(){
    const { getFieldDecorator } = this.props.form;

    return (<div>

      <Form onSubmit={this.handleSubmit} >
        <FormItem >
          {getFieldDecorator('Name', {
            rules: [{ required: true, message: 'Please input group name!' }],
          }
          )(
            <span>
              <Input style={{ width: 300 }} prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Group" size="large"/>
              {/* <Select style={{ width: 90 }} size="large" onChange={this.handleChange} defaultValue="group">
                <Option  value="group">Group</Option>
                <Option  value="sign">Sign</Option>
              </Select> */}
              <Button style={{marginLeft: 10}} type="primary" htmlType="submit" >
                Search
              </Button>
            </span>
          )}
        </FormItem>
      </Form>

    </div>)
  }
}
const WrapSearchForm = Form.create()(SearchForm);
export default connect()(WrapSearchForm);
