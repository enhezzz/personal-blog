import axios from 'axios'
export default {
    namespaced: true,
    state(){
        return {
            list: [],
            posts: [],
            currentPage: 1,
            post: {}
        }
    },
    actions: {
        getBlogList({commit, state}){
            return axios.get('/blogList').then(response=> {
                commit('updateBlogList',response.data)
            })
        },
        getPosts({commit, state}, route) {
            let theme = route.params.theme;
            // console.log(theme)
            theme = encodeURIComponent(theme)
            let url = `/b/${theme}`;
            return axios.get(url).then(response=> {
                commit('updatePosts',response.data)
            })
        },
        getPost({commit, state}, route) {
            let postId = route.params.id;
            let url = `/post?id=${postId}`;
            return axios.get(url).then(response=> {
                commit('updatePost',response.data)
            })
        }
    },
    mutations: {
        updateBlogList(state,list) {
            state.list = list;
        },
        updatePosts(state, posts) {
            state.posts = posts;
        },
        updatePost(state, post) {
            console.log(post)
            state.post = post;
        }
    }
}