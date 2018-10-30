<template>
    <div class="content">
            <router-link class="card" :to="`/blog/${theme}/${post._id}`" v-for="post in posts" :key="post._id">
                <div class="card-header">
                    <span class="fa fa-tags">:
                        <router-link :to="`/blog/${encodeURIComponent(tag)}`" class="badge badge-primary" v-for="(tag,index) in post.tags" :key="index">{{tag}}</router-link>
                    </span>
                    <span class="fa fa-user">:{{post.author}}</span>
                    <span class="fa fa-calendar">:{{post.updateDate}}</span>
                    <span class="fa fa-eye">:{{post.views}}</span>
                </div>
                <div class="card-body">
                    <h5 class="card-title">{{post.title}}</h5>
                    <p class="card-text" v-html="post.content"></p>
                </div>
            </router-link>
            <nav aria-label="Page navigation example">
                <ul class="pagination justify-content-center">
                    <li class="page-item" :class="{disabled: currentPage == 1,notallow: currentPage == 1}" @click="previous">
                        <a class="page-link" href="#" aria-label="Previous">
                            <span aria-hidden="true">&laquo;</span>
                            <span class="sr-only">Previous</span>
                        </a>
                    </li>
                    <li class="page-item" :class="{active: index == currentPage}" :data-index="index" v-for="(index,i) in pageIndex" :key="i" @click="toPage">
                        <a class="page-link" href="javascript:;">{{index}}</a>
                    </li>
                    <li class="page-item" :class="{disabled: currentPage == pageNum,notallow: currentPage == pageNum}" @click="next">
                        <a class="page-link" href="#" aria-label="Next">
                            <span aria-hidden="true">&raquo;</span>
                            <span class="sr-only">Next</span>
                        </a>
                    </li>
                    <ul class="pagination-input">
                        <input type="text">
                        <button class="btn btn-primary">go</button>
                        <small>一共{{pageNum}}页</small>
                    </ul>
                </ul>
            </nav>
        </div>
</template>
<script>
export default {
    created: function(){
        this.request(this.$route);
    },
    data: function(){
        return {
            posts: [],
            currentPage: 1
        }
    },
    async beforeRouteUpdate (to,from,next){
        await this.request(to);
        next();
    },
    computed: {
        theme(){
            return encodeURIComponent(this.$route.params.theme);
        },
        pageNum(){
            let n = this.posts.length;
            return n/10>1?Math.ceil(n/10):1;
        },
        pageIndex(){
            if(this.pageNum<=10 || this.currentPage<=10){
                let arr = new Array(this.pageNum).fill(undefined);
                return arr.map((ele,index)=>{
                    return index+1;
                })
            }else{
                let arr = new Array(10).fill(undefined);
                return arr.map((ele,index)=>{
                    return index+2+this.pageNum-this.currentPage;
                });
            }
        }
    },
    methods: {
        toPage(e){
            let pageIndex = e.target.parentNode.dataset['index'];
            if(pageIndex == this.currentPage) return;
            else{
                this.request(this.$route,pageIndex)
            }
        },
        request(route,index){
            let theme = route.params.theme;
            let url = index?`/blog/${theme}?index=${index}`:`/blog/${theme}`
            let request = new Request(url);
            return fetch(request).then(response=>{
                return response.json()
            }).then(posts=>{
                this.posts = posts;
            })
        },
        previous(){
            if(this.currentPage!=1) this.currentPage--;
        },
        next(){
            if(this.currentPage!=this.pageNum) this.currentPage++;
        }
    }
}
</script>
<style scoped>
.content>.card:hover{
    animation: pulse 1s both;
    text-decoration: none;
}
.content .card-header{
    text-align: left;
}
.content .card-header>span{
    display: inline-block;
    margin-right: 10px;
}
.content .card-header>span.fa-eye{
    float: right;
    color: rgb(198,198,198);
}
.content .card-body{
    color: #7f7f7f;
}
.content .card-body>.card-text{
    text-align: left;
    text-indent: 49px;
}
.notallow{
    cursor: not-allowed !important;
}
.pagination-input{
    display: flex;
    align-items: center;
}
.pagination-input>input[type='text']{
    text-align: center;
    width: 34px;
}
</style>
