import axios from 'axios'
export default {
    namespaced: true,
    state: ()=> ({
        posts: [],
        pageIndex: 0
    }),
    actions: {
        getPost: ({ commit,state }) => {
            const url = `/homePost?index=${state.pageIndex}`;
            return axios.get(url).then(response=> {
                commit('updatePost',response.data)
            })
        }
    },
    mutations: {
        updatePost: (state,posts) => {
            state.posts.push(...posts)
        },
        updatePageIndex(state, pageIndex) {
            state.pageIndex = pageIndex;
        }
    }
}