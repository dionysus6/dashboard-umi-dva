import { connect } from 'dva';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import React from 'react';



const FormItem = Form.Item;
class App extends React.Component{
	handleSubmit = (e) => {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			if (!err) {
				console.log('Received values of form: ', values);
			}
		});
	}
	render(){
		const {getFieldDecorator} = this.props.form;
		return (
			<div >
				<h1> Login Page</h1>
				<Form onSubmit={this.handleSubmit} className="login-form">
					<FormItem>
						{getFieldDecorator('userName', {
							rules: [{ required: true, message: 'Please input your username!' }],
						})(
							<Input style={{ width: 300 }} prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" size="large"/>
						)}
					</FormItem>
					<FormItem>
						{getFieldDecorator('password', {
							rules: [{ required: true, message: 'Please input your Password!' }],
						})(
							<Input style={{ width: 300 }} prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" size="large"/>
						)}
					</FormItem>
					<FormItem>
						{getFieldDecorator('remember', {
							valuePropName: 'checked',
							initialValue: true,
						})(
							<Checkbox>Remember me</Checkbox>
						)}
						<a className="login-form-forgot" href="">Forgot password</a>
						<br />
						<Button type="primary" htmlType="submit" className="login-form-button" onClick={()=>{
							this.props.dispatch({
								type:'currentUser/login'
							});}
						}>
							Log in
						</Button>
						<br/>
						Or <a href="">register now!</a>
					</FormItem>
				</Form>

			</div>
			)
	}


}


const WrapLoginForm = Form.create()(App)



export default connect()(WrapLoginForm);
