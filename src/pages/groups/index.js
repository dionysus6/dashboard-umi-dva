import React from 'react'
import { Table, Button } from 'antd';
import router from 'umi/router';
import { connect } from 'dva';

import  WrapSearchForm  from './WrapSearchForm'
import {fetchShowGroup, fetchShowSign} from '../../utils/fetchFunction';
import  {api_host}  from '../../utils/request'

class Widget extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data: []
    }

  }

  componentDidMount(){
    const URL = api_host("groups");
    //console.log(URL)
    this.fetchShowGroup = fetchShowGroup.bind(this);
    this.fetchShowGroup(URL);

    const SURL = api_host("signs");
    this.fetchShowSign = fetchShowSign.bind(this);
    this.fetchShowSign(SURL);

  }
  SearchGroupFetch(name){
    const NURL = api_host(`groups/${name}`);
    this.fetchShowGroup(NURL);
  }
  render(){


    const columns = [
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        width: '10%'
      },{
        title: 'Label',
        dataIndex: 'label',
        key: 'label',
        width: '8%'
      },{
        title: 'Message',
        dataIndex: 'message',
        key: 'message',
        width: '30%'
      },{
        title: 'Request Interval',
        dataIndex: 'requestInterval',
        key: 'requestInterval',
      },{
        title: 'Time Sync Interval',
        dataIndex: 'timeSyncInterval',
        key: 'timeSyncInterval'
      },{
        title: 'Operation',
        dataIndex: 'operation',
        key: 'Operation',
        width: '12%',
        render: (text,record)=>(<Button onClick={()=>{
          this.props.dispatch({
            type:`currentUser/edit`,
            payload:record,
          });
          router.push(`/groups/${record.name}/edit`);
        }}>Edit</Button>)

      },

    ];
    return (
      <div>
        <WrapSearchForm data={this.state.data}/>
        <Button ghost type="primary" onClick={()=>router.push('/groups/New')}>Create New</Button>
        <br />
        <br />
        <Table dataSource={this.state.data} columns={columns} bordered={true} rowKey={record=>record.id}/>
      </div>
    )
  }
}


export default connect()(Widget)
