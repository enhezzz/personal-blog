import React,{Component} from 'react';
import { Link } from "react-router-dom";
import {Context} from "../../context";
import './Home.css'
class Home extends Component{
    constructor(props){
        super(props)
        this.state = {
            posts : [],
            pageIndex : 0
        }
        this.footer = React.createRef();
    }

    getPost(){
        let request = new Request(`/homePost?index=${this.state.pageIndex}`);
        return fetch(request).then(response=>{
            return response.json()
        })
    }

    componentDidMount(){
        this.getPost().then(posts=>{
            this.setState({
                posts
            })
        })

        const intersectionObserver = new IntersectionObserver((entries) => {
            if (entries[0].intersectionRatio <= 0) return;
            this.setState(preState=>{
                return {pageIndex: preState.pageIndex+1}
            })
            this.getPost().then(posts=>{
                this.setState(preState=> {
                    return {posts: [...preState.posts, ...posts]}
                })
            })
            console.log(entries[0].intersectionRatio)
        });
        // start observing
        intersectionObserver.observe(this.footer.current);
    }

    render(){
        return (
            <div className="home">
                <div className="container main">
                    <div className="row">
                        <div className="news col-9">
                            {
                                this.state.posts.map(function(post){
                                    return (
                                        <Link className="card" key={post._id}
                                                     to={`/blog/${encodeURIComponent(post.tags[0])}/${post._id}`}>
                                            <div className="card-header">
                                                <span className="fa fa-tags">:
                                                    {
                                                        post.tags.map(function(tag){
                                                            return (
                                                                <Link to={`/blog/${encodeURIComponent(tag)}`} className="badge badge-primary"
                                                                             key="index">{tag}
                                                                             </Link>
                                                            )
                                                        })
                                                    }

                                                </span>
                                                <span className="fa fa-user">:{post.author}</span>
                                                <span className="fa fa-calendar">:{post.updateDate}</span>
                                                <span className="fa fa-eye">:{post.views}</span>
                                            </div>
                                            <div className="card-body">
                                                <h5 className="card-title">{post.title}</h5>
                                                <p className="card-text" dangerouslySetInnerHTML={{__html: post.content}}></p>
                                            </div>
                                        </Link>
                                    )
                                })
                            }

                </div>
                <div className="intro col-3">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Me</h5>
                            <div className="card-text">
                                <div className="avatar rounded-circle">
                                    <img src="https://avatars1.githubusercontent.com/u/29703980?s=460&v=4" alt="hgs"/>
                                </div>
                                <div className="simple-intro">
                                    <small>车到山前必有路</small>
                                    <div className="media">
                                        <div>
                                            <a className="fa fa-github" href="https://github.com/enhezzz"></a>
                                        </div>
                                        <div>
                                            <a className="fa fa-weibo"></a>
                                        </div>
                                        <div>
                                            <a className="fa fa-wechat"></a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-12 footer" ref={this.footer}></div>
            </div>

    </div>
    </div>
        )
    }
}
export default Home