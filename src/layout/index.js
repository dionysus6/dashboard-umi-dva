import withRouter from 'umi/withRouter'
import PropTypes from 'prop-types'
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import { connect } from 'dva'
import './layout.css'
import router from 'umi/router';
import React from 'react';





const { Header, Content, Footer, Sider } = Layout;


// const SimpleLayout=({children})=>(
//
// 	<div className="pl-layout-container">
// 		<Header className="header">
// 			<div className="logo" />
// 		</Header>
// 		<Content style={{ padding: '10px', textAlign: 'center' }}>
// 			{ children }
// 		</Content>
// 		<Footer style={{ textAlign: 'center' }}>
// 			Ant Design ©2018 Created by Ant UED
// 		</Footer>
// 	</div>
// )

class Widget extends React.Component {
	// if (props.location.pathname === '/users/sign-in') {
	// 	return (<SimpleLayout style={{ height: '100%' }}>{ props.children }</SimpleLayout>)
	// }
	handleClick(e) {
		//console.log(e);
		//e.preventDefault();
		//router.push(key);
		//console.log('The link was clicked.');
		router.push(e.key);
	}
	render(){
		return (
			<Layout >
				<Header className="header">
					<div className="logo" />
					<Menu
						theme="dark"
						onClick={this.handleClick}
						mode="horizontal"
						defaultSelectedKeys={['2']}
						style={{ lineHeight: '64px' }}
					>
						<Menu.Item key="#">Pro-Lite</Menu.Item>
					</Menu>
				</Header>
				<Content style={{ padding: '0 50px' }} >
					<Breadcrumb style={{ margin: '16px 0' }} separator="">
						<Breadcrumb.Item ><a href="">Home</a></Breadcrumb.Item>
					</Breadcrumb>
					<Layout style={{ padding: '24px 0', background: '#fff' }}>
						<Sider width={200} style={{ background: '#fff' }}>
							<Menu
								onClick={this.handleClick}
								mode="inline"
								defaultSelectedKeys={['1']}
								defaultOpenKeys={['sub1']}
								style={{ height: '100%' }}
							>
								<Menu.Item key="/groups"><Icon type="laptop" />Groups</Menu.Item>
								<Menu.Item key="/signs" ><Icon type="notification" />Signs</Menu.Item>

							</Menu>
						</Sider>
						<Content style={{ padding: '0 24px', minHeight: 280 }}>
							{ this.props.children }
						</Content>
					</Layout>
				</Content>

				<Footer style={{ textAlign: 'center' }}>
					Ant Design ©2018 Created by Ant UED
				</Footer>
			</Layout>)

				}




			}


			Widget.propTypes = {
				children: PropTypes.node.isRequired,
			}

			export default withRouter(connect()(Widget))
