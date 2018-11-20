import React, { Component } from 'react';
import {Context} from "../../context";
import { BrowserRouter as Router, Route, Link, Redirect, NavLink  } from "react-router-dom";
import './BlogDetail.css'
class BlogDetail extends Component {
    constructor(props){
        super(props)
        this.state = {
            post: null
        }
    }

    componentDidMount(){
        let postId = this.props.match.params.id;
        let request = new Request(`/post?id=${postId}`);
        fetch(request).then(response => response.json())
            .then(post => {
                this.setState({post})
            })
    }

    render(){
        return (
            this.state.post?(
            <div>
                <div className="blog-header">
                    <h4>{this.state.post.title}</h4>
                    <div className="blog-id">
                        <span className="item">作者：{this.state.post.author}</span>
                        <span className="item">发表时间：{this.state.post.createDate}</span>
                        <span className="item">更新时间：{this.state.post.updateDate}</span>
                        <span className="item">
                    标签：
                            {
                                this.state.post.tags.map((tag,index)=>{
                                    return <Link to={`/blog/${encodeURIComponent(tag)}`}
                                                        className="badge badge-primary"
                                                        key={index}>{tag}</Link>
                                })
                            }
                    </span>
                    <span className="item fa fa-eye">
                    ：{this.state.post.views}
                </span>
                </div>
            </div>
        <div className="blog-body" dangerouslySetInnerHTML={{__html: this.state.post.content}}>
        </div>
        <div className="blog-footer">

        </div>
    </div>
        ): '')
    }
}

export default BlogDetail