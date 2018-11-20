import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import {Context} from "./context";
import Home from './components/Home/Home'
import Login from './components/Login/Login'
import Register from './components/Register/Register'
import BlogList from './components/Blog/BlogList'
class App extends Component {
    constructor(props){
        super(props)
        this.updateRole = this.updateRole.bind(this);
        this.toggleLoading = this.toggleLoading.bind(this);
        this.toggleLoginState = this.toggleLoginState.bind(this);
        this.updateUsername = this.updateUsername.bind(this);
        this.updateAccount = this.updateAccount.bind(this);
        this.setPhone = this.setPhone.bind(this);
        this.state = {
            isAdmin: false,
            loading: false,
            isLogin: false,
            username: '',
            account: '',
            phone:'',
            updateRole: this.updateRole,
            toggleLoading: this.toggleLoading,
            toggleLoginState: this.toggleLoginState,
            updateUsername: this.updateUsername,
            updateAccount: this.updateAccount,
            setPhone: this.setPhone
        }

    }
    updateRole(isAdmin){
        this.setState({isAdmin})
    }
    toggleLoading(loading){
        this.setState({loading})
    }
    toggleLoginState(isLogin){
        this.setState({isLogin})
    }
    updateUsername(username){
        this.setState({username})
    }
    updateAccount(account){
        this.setState({account})
    }
    setPhone(phone){
        this.setState({phone})
    }

  render() {
    return (
        <Router>
            <div className="App" id="app">
                <nav className="navbar navbar-light animated bounceInLeft fixed-top">
                    <div className="row nav-row">
                        <div className="col-md-2">
                            <Link to="/">首页</Link>
                        </div>
                        <div className="col-md-2">
                            <Link to="/blog">学习/生活</Link>
                        </div>
                        <div className="col-md-2">
                            <router-link to="">心情留言板</router-link>
                        </div>
                        <div className="col-md-2">
                            <router-link to="">关于</router-link>
                        </div>
                        <div className="col-md-3">
                            <input className="form-control form-control-sm search-bar" type="text" placeholder="搜索..."
                                   keyup="search"/>
                        </div>
                        <div className="col-md-1 setting">
                            <label className="btn btn-default btn-sm" htmlFor="setting">
                                <i className="fa fa-cog"></i>
                                <span className="visible-lg-inline nodisplay">Settings</span>
                            </label>
                            <input type="text" id="setting"/>
                            <div className="setting-items">
                                {
                                    !this.state.isLogin ? (<div className="setting-item">
                                        <Link to="/register">注册</Link>
                                    </div>) : ''
                                }
                                {
                                    !this.state.isLogin ? (
                                        <div className="setting-item">
                                            <Link to="/login">登陆</Link>
                                        </div>
                                    ) : ''
                                }
                                {
                                    this.state.isLogin ? (
                                        <div className="setting-item">
                                            <Link to="/login">{this.state.username}</Link>
                                        </div>
                                    ) : ''
                                }
                                {
                                    this.state.isLogin ? (
                                        <div className="setting-item">
                                            <a href="javascript:;" click="logout">注销</a>
                                        </div>
                                    ) : ''
                                }
                                {
                                    this.state.isAdmin ? (
                                        <div className="setting-item">
                                            <Link to="/admin" v-if="isAdmin">admin</Link>
                                        </div>
                                    ) : ''
                                }
                            </div>
                        </div>
                    </div>
                </nav>
                <div className="main-content">
                    <Context.Provider value={this.state}>
                        <Route exact path="/" component={Home} />
                        <Route exact path="/login" component={Login} />
                        <Route exact path="/register" component={Register} />
                        <Route path="/blog" component={BlogList} />
                    </Context.Provider>

                </div>
            </div>
        </Router>

    )
  }
}

export default App;
