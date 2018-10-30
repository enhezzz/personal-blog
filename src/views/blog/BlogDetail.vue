<template>
    <div>
        <div class="blog-header">
            <h4>{{post.title}}</h4>
            <div class="blog-id">
                <span class="item">作者：{{post.author}}</span>
                <span class="item">发表时间：{{post.createDate}}</span>
                <span class="item">更新时间：{{post.updateDate}}</span>
                <span class="item">
                    标签：
                    <router-link :to="`/blog/${encodeURIComponent(tag)}`" class="badge badge-primary" v-for="(tag,index) in post.tags" :key="index">{{tag}}</router-link>
                </span>
                <span class="item fa fa-eye">
                    ：{{post.views}}
                </span>
            </div>
        </div>
         <div class="blog-body" v-html="post.content">
        </div>
        <div class="blog-footer">
            
        </div>
    </div>
</template>
<script>
export default {
    created() {
        let postId = this.$route.params.id;
        let request = new Request(`/post?id=${postId}`);
        fetch(request).then(response => response.json())
            .then(post => {
                this.post = post;
            })
    },
    data(){
        return {
            post: {}
        }
    }
}
</script>
<style scoped>
.blog-header>.blog-id>.item{
    margin: 0 20px
}
.blog-body{
    text-align: left;
    text-indent: 50px;
    margin-top: 15px;
}
</style>
