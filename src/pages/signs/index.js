import React from 'react'
import { Table, Button, Input, Alert, Popover, Icon } from 'antd'
import router from 'umi/router'
import { connect } from 'dva'

import './signs.css'
import { api_host } from '../../utils/request'
import { fetchShowSign } from '../../utils/fetchFunction'


const _ = require('lodash');
const Search = Input.Search;

class Widget extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      sign_data: [],
      alertVisible: false,
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
      },{
        title: 'Message',
        dataIndex: 'message',
        width: '30%',
        key: 'message'
      },{
        title: 'Request Interval',
        dataIndex: 'requestInterval',
        key: 'requestInterval'
      },{
        title: 'TimeSync Interval',
        dataIndex: 'timeSyncInterval',
        key: 'timeSyncInterval'
      },

      {
        title: 'Operation',
        dataIndex: 'operation',
        width: '12%',
        render: (text, record) => (<Button onClick={() => {
          this.props.dispatch({
            type: 'currentUser/edit',
            payload: record
          })
          router.push(`/signs/${record.mac}/edit`)
        }}>Edit</Button>)

      }
    ]
  }

  componentDidMount(){
    const URL = api_host("signs");
    this.fetchShowSign = fetchShowSign.bind(this);
    this.fetchShowSign(URL);
  }


  render(){
    return (
      <div>
        <Popover
          content={
            <div onClick={()=>{this.setState({alertVisible:false})}}>
              <Icon type="close" style={{float:"right"}} />
              <br/>
              <Alert
                message="Warning"
                description="Not Found!"
                type="warning"
              showIcon/>
              <br/>
            </div>

          }
          placement="rightBottom"
          trigger="click"
          visible={this.state.alertVisible}
          //onVisibleChange={this.handleVisibleChange}
        >
          <Search
            placeholder="Search Sign by MacId"
            onSearch={
              (value,event) => {
                const SignItemIndex =  _.findIndex(this.state.sign_data,{mac:value})
                if (SignItemIndex<0) {
                  this.setState({
                    alertVisible: true,
                  });
                }else {

                  this.props.dispatch({
                    type:'currentUser/edit',
                    payload:this.state.sign_data[SignItemIndex],
                  });

                  router.push('/signs/SearchSign');
                }

              }
            }
            enterButton
          />
        </Popover>
        <br/>
        <br/>
        <Button ghost type="primary" onClick={()=>router.push('/signs/New')}>Create New</Button>
        <br/>
        <br/>
        <Table  dataSource={this.state.sign_data}  columns={this.columns} bordered={true} rowKey={record=>record.id}/>
      </div>

        )
      }
    }


    export default connect()(Widget)
