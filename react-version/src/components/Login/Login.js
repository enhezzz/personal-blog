import React, { Component } from 'react';
import {Context} from "../../context";
import './Login.css'
class Login extends Component {
    constructor(props){
        super(props)
        this.state = {
            account: '',
            password: '',
            toLogin: false
        }
        this.account = React.createRef();
        this.password = React.createRef();
    }
    async login(options){
        options.toggleLoading(true)
        let formData = new FormData();
        formData.append('account',this.account.current.value.trim());
        formData.append('password',this.password.current.value.trim());
        let res = await fetch('/login',{method: 'POST',body: formData,credentials: 'include'})
            .then(response=> {
                let status = response.status;
                if(status == 501){
                    return new Error('info err')
                }else{
                    return response.json();
                }

            });

        if(res instanceof Error){
            // alert('账号或密码错误');
            console.error(res)
            options.toggleLoginState(false)
        }else{
            console.log('登陆成功')
            options.updateRole(res.code == 1)
            options.updateUsername(res.username)
            options.updateAccount(res.account);
            options.setPhone(res.phone);
            options.toggleLoginState(true);
            this.props.history.push('/')
        }
        options.toggleLoading(false);
        // this.setState({toLogin: true})
        // setTimeout(()=>{
        //     this.setState({toLogin: false})
        // },2000);
    }
    render(){
        return (
            <div className="login row animated zoomInDown">
                <div className="col-5">
                    <div className="login-header">
                        <h3 className="animated tada infinited">login...</h3>
                    </div>
                    <div className="login-body">
                        <div className="form-group">
                            <label htmlFor="account">Account</label>
                            <input type="text" className="form-control" placeholder="账号" id="account" name="account" ref={this.account}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input type="password" className="form-control" placeholder="密码" id="password" name="password" ref={this.password}/>
                        </div>
                        <Context.Consumer>
                            {
                                (options)=>{
                                    return <button type="submit" className="btn btn-primary"
                                                   onClick={this.login.bind(this,options)}>login</button>
                                }
                            }
                        </Context.Consumer>

                </div>
            </div>
        {/*<div className="alert alert-success" role="alert" className="{show:toLogin&&isLogin,fadeOutUp:toLogin&&isLogin,animated:toLogin&&isLogin}">*/}
    {/*登陆成功！*/}
    {/*</div>*/}
        {/*<div className="alert alert-danger" role="alert" className="{show:toLogin&&!isLogin,fadeOutUp:toLogin&&!isLogin,animated:toLogin&&!isLogin}">*/}
    {/*账号或密码错误！*/}
    {/*</div>*/}
    </div>
        )
    }
}
export default Login