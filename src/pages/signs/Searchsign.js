import React from 'react';
import { Table, Button } from 'antd';
import router from 'umi/router';
import { connect } from 'dva';

import './signs.css';

class Widget extends React.Component {
  
  constructor (props) {
    super(props);
    this.state = {
      sign_data:[]
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
        width: '12%'
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

   render(){
     //console.log(this.props.signItem)
     this.state.sign_data.push(this.props.signItem)
     return (
       <div>
         <Table  dataSource={this.state.sign_data}  columns={this.columns} bordered={true} rowKey={record=>record.id}/>
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
  		signItem: state.currentUser.signItem,
  	}
  }

  export default connect(mapStateToProps)(Widget)
