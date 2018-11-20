import React, { Component } from 'react';
import {Context} from "../../context";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './BlogTheme.css'
class BlogTheme extends Component {
    constructor(props){
        super(props)
        this.state = {
            posts: [],
            currentPage: 1,
            // pageIndex: [1],
            // theme: '',
        }
        this.previous = this.previous.bind(this);
        this.next = this.next.bind(this);
        this.toPage = this.toPage.bind(this);
        let pageNum = ()=>{
            let n = this.state.posts.length;
            return n/10>1?Math.ceil(n/10):1;
        }
        let theme = ()=>{
            return encodeURIComponent(this.props.match.params.theme);
        }
        // let pageIndex = ()=>{
        //     if(this.computed.pageNum<=10 || this.currentPage<=10){
        //         let arr = new Array(this.computed.pageNum).fill(undefined);
        //         return arr.map((ele,index)=>{
        //             return index+1;
        //         })
        //     }else{
        //         let arr = new Array(10).fill(undefined);
        //         return arr.map((ele,index)=>{
        //             return index+2+this.computed.pageNum-this.currentPage;
        //         });
        //     }
        // }
        this.computed = {}
        this.computed.pageNum = pageNum();
        this.computed.theme = theme();
        // this.computed = {
        //     pageNum: pageNum(),
        //     theme: theme(),
        //     pageIndex: pageIndex()
        // };

    }

    toPage(e){
        let pageIndex = e.target.parentNode.dataset['index'];
        if(pageIndex == this.currentPage) return;
        else{
            this.request(this.$route,pageIndex)
        }
    }
    request(route,index){
        let theme = route.params.theme;
        let url = index?`/blog/${theme}?index=${index}`:`/blog/${theme}`
        let request = new Request(url);
        return fetch(request).then(response=>{
            return response.json()
        }).then(posts=>{
            this.setState({posts})
        })
    }
    previous(){
        if(this.state.currentPage!=1) this.setState((preState)=>{
            return {currentPage: preState.currentPage-1}
        });
    }
    next(){
        if(this.state.currentPage!=this.pageNum) this.setState((preState)=>{
            return {currentPage: preState.currentPage+1}
        });
    }

    componentDidMount(){
        this.request(this.props.match).then(res=>{

        });
    }

    render(){
        return (
            <div className="content">
                {
                    this.state.posts.map((post)=>{
                        return (
                            <Link className="card" to={`/blog/${this.computed.theme}/${post._id}`} key={post._id}>
                                <div className="card-header">
                                <span className="fa fa-tags">:
                                    {
                                        post.tags.map(function(tag,index){
                                            return (
                                                <Link to={`/blog/${encodeURIComponent(tag)}`} className="badge badge-primary" key={index}>{tag}</Link>
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



        <nav aria-label="Page navigation example">
            <ul className="pagination justify-content-center">
                <li className="page-item" className="{disabled: currentPage == 1,notallow: currentPage == 1}" onClick={this.previous}>
                <a className="page-link" href="#" aria-label="Previous">
                    <span aria-hidden="true">&laquo;</span>
                    <span className="sr-only">Previous</span>
                </a>
            </li>
                {
                    (()=>{
                        if(this.computed.pageNum<=10 || this.currentPage<=10){
                            let arr = new Array(this.computed.pageNum).fill(undefined);
                            return arr.map((ele,index)=>{
                                return index+1;
                            })
                        }else{
                            let arr = new Array(10).fill(undefined);
                            return arr.map((ele,index)=>{
                                return index+2+this.computed.pageNum-this.currentPage;
                            });
                        }
                    })().map((index,i)=>{
                        return (
                            <li className="page-item" className="{active: index == currentPage}" data-index={index} key={i} onClick={this.toPage}>
                                <a className="page-link" href="javascript:;">{index}</a>
                            </li>
                        )
                    })
                }

        <li className="page-item" className="{disabled: currentPage == pageNum,notallow: currentPage == pageNum}" onClick={this.next}>
        <a className="page-link" href="#" aria-label="Next">
            <span aria-hidden="true">&raquo;</span>
            <span className="sr-only">Next</span>
        </a>
    </li>
        <ul className="pagination-input">
            <input type="text"/>
                <button className="btn btn-primary">go</button>
                <small>一共{this.computed.pageNum}页</small>
        </ul>
    </ul>
    </nav>
    </div>
        )
    }
}

export default BlogTheme