import React, { Component } from 'react';
import {Context} from "../../context";
import { BrowserRouter as Router, Route, Link, Redirect, NavLink  } from "react-router-dom";
import './BlogList.css'
import BlogDetail from './BlogDetail'
import BlogTheme from './BlogTheme'
class BlogList extends Component {
    constructor(props){
        super(props)
        this.state = {
            list: []
        }
    }

    componentDidMount(){
        let request = new Request('/blogList');
        fetch(request).then(response=> response.json())
            .then(list=>{
                this.setState({list})
            })
    }

    render(){
        return (
            <div className="main row">
                <aside className="col-2">
                    <div className="blog-theme">
                        <label htmlFor="learning">
                            <span className="theme">学习</span>
                        </label>
                        <input type="checkbox" className="nodisplay" id="learning" />
                            <div className="items">
                                {
                                    this.state.list.map(function(tag){
                                        return (
                                            <div className="item"  key={tag._id}>
                                                <NavLink activeClassName="router-link-active" to={`/blog/${encodeURIComponent(tag.name)}`}>
                                                    {tag.name}
                                                 </NavLink>
                                            </div>
                                        )
                                    })
                                }

            </div>
    </div>
    </aside>
        <div className="col-9 offset-md-2">
            <Route exact path="/blog/:theme?" component={(props)=>{
                return props.match.params.theme==undefined?<Redirect to="/blog/Web%20Development"/>:
                    <BlogTheme match={props.match}/>
            }}></Route>
            <Route path="/blog/:theme/:id" component={BlogDetail}></Route>
        </div>

    </div>
        )
    }
}

export default BlogList