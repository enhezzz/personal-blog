<template>
    <div class="container main">
        <h4 class="header">搜索结果：</h4>
        <router-link class="card" :to="`/blog/${encodeURIComponent(post.tags[0])}/${post._id}`" v-for="post in posts" :key="post._id">
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
    </div>
</template>
<script>
    export default {
        created(){
            let keyword = this.$route.query.keyword;
            this.request(keyword)
        },
        beforeRouteUpdate (to, from, next) {
            let keyword = to.query.keyword;
            this.request(keyword);
        },
        methods: {
            async request(keyword){
                let request = new Request(`/search?keyword=${keyword}`);
                let posts = await fetch(request).then(response=> response.json());
                this.posts = posts;
            }
        },
        data(){
            return {
                posts : []
            }
        }
    }
</script>
<style scoped>
.container>.header{
    text-align: left;
}
.main>.card:hover{
    animation: pulse 1s both;
    text-decoration: none;
}
.main .card-header{
    text-align: left;
}
.main .card-header>span{
    display: inline-block;
    margin-right: 10px;
}
.main .card-header>span.fa-eye{
    float: right;
    color: rgb(198,198,198);
}
.main .card-body{
    color: #7f7f7f;
}
.main .card-body>.card-text{
    text-align: left;
    text-indent: 49px;
}
</style>