import { connect } from 'dva';
//import Redirect from 'umi/redirect';

//import { Layout, Menu, Breadcrumb, Icon } from 'antd';
//import PropTypes from 'prop-types'
//const { SubMenu } = Menu;
//const { Header, Content, Footer, Sider } = Layout;

// function mapStateToProps(state) {
// 	console.log(state)
// 	return {
// 		isLogin: state.currentUser.isLogin,
// 	}
// }
//const SIGNS = "SIGNS"

const App = () => (
	<div>
		dashboard
	</div>
);

		// <Breadcrumb.Item >
		// // <a href="#" style={{float: 'right'}} onClick={()=>{
		// // 	props.dispatch({
		// // 		type:'currentUser/logout'
		// // 	});
		// // }}
		// // >Logout</a>
	  // </Breadcrumb.Item >



// function dashboard({ isLogin }){
// 	console.log(isLogin);
// 	if(isLogin){
// 		return <App/>
// 	}
// 	else{
// 		return	(<Redirect to="./sign-in" />)
// 	}
// }
//App.propTypes = {
 //    : PropTypes.element.isRequired,
 // }
// App.propTypes = {
//    	children: PropTypes.element.isRequired,
// }

export default connect()(App);
