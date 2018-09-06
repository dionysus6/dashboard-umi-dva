import React from 'react';
import { Table, Button } from 'antd';
import router from 'umi/router';
import { connect } from 'dva';


class Widget extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data:[]
    }
    this.columns = [

      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        width: '10%'
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

   render(){
     // console.log(this.props.groupItem)
     this.state.data.push(this.props.groupItem)
     return (
       <div>
         <Table  dataSource={this.state.data}  columns={this.columns} bordered={true} rowKey={record=>record.id} />
         <Button  type="primary" style={{ marginLeft: 8 }} onClick={()=>router.push('./ShowSigns')}>
           Show All Signs
         </Button>
         <Button  type="primary" style={{ marginLeft: 8 }} onClick={()=>router.push('./')}>
           Back
         </Button>
       </div>

     )
   }
  }
  function mapStateToProps(state) {
  	return {
  		groupItem: state.currentUser.groupItem,
  	}
  }

  export default connect(mapStateToProps)(Widget)
