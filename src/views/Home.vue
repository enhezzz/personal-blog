<template>
  <div class="home">
    <div class="container main">
      <div class="row">
        <div class="news col-9">
          <router-link class="card" v-for="post in posts" :key="post._id" :to="`/blog/${encodeURIComponent(post.tags[0])}/${post._id}`">
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
        <div class="intro col-3">
           <div class="card">
            <!-- <div class="card-header">
              Me
            </div> -->
            <div class="card-body">
              <h5 class="card-title">Me</h5>
              <div class="card-text">
                <div class="avatar rounded-circle">
                  <img src="https://avatars1.githubusercontent.com/u/29703980?s=460&v=4" alt="hgs">
                </div>
                <div class="simple-intro">
                  <small>船到桥头自然直</small>
                  <div class="media">
                    <div>
                      <a class="fa fa-github" href="https://github.com/enhezzz"></a>
                    </div>
                    <div>
                      <a class="fa fa-weibo"></a>
                    </div>
                    <div>
                      <a class="fa fa-wechat"></a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-12 footer" ref="footer"></div>
      </div>
      
    </div>
  </div>
</template>

<script>
import NProgress from 'nprogress'

export default {
  name: 'home',
  mounted: function(){
    const intersectionObserver = new IntersectionObserver((entries) => {
      if (entries[0].intersectionRatio <= 0) return;
      this.pageIndex++;
      this.getPost().then(posts=>{
            this.posts.push(...posts);
        })
      console.log(entries[0].intersectionRatio)
    });
    // start observing
    intersectionObserver.observe(this.$refs.footer);
    console.log(this.$refs.footer)
  },
  created: function(){
      NProgress.start();
      this.getPost().then(posts=>{
          this.posts.push(...posts);
          NProgress.done()
      })

  },
    data(){
      return {
          posts: [],
          pageIndex: 0
      }
    },
    methods: {
       getPost(){
          let request = new Request(`/homePost?index=${this.pageIndex}`);
          let formData = new FormData();
          formData.append('index',this.pageIndex);
          return fetch(request).then(response=>{
              return response.json()
          })
      }
    }
}
</script>
<style lang="scss">
  $card-margin: 10px 0;
  $card-body-color: #7f7f7f;
 .main .card{
    margin: $card-margin
  }
  .card-body{
    color: #7f7f7f;
  }
  @keyframes pulse {
  0% {
    -webkit-transform: scale3d(1, 1, 1);
    -ms-transform: scale3d(1, 1, 1);
    transform: scale3d(1, 1, 1)
  }
  50% {
    -webkit-transform: scale3d(1.05, 1.05, 1.05);
    -ms-transform: scale3d(1.05, 1.05, 1.05);
    transform: scale3d(1.05, 1.05, 1.05)
  }
  100% {
    -webkit-transform: scale3d(1, 1, 1);
    -ms-transform: scale3d(1, 1, 1);
    transform: scale3d(1, 1, 1)
  }
}
</style>
<style scoped>
.main .news>.card:hover{
    animation: pulse 1s both;
  }
.main .intro{
  position: relative;
}
.main .intro>.card{
  position: fixed;
  top: 48px;
  right: 10px;
  width: 26%
}
.main .intro .card-text>.avatar{
  width: 71px;
  height: 71px;
  margin: 0 auto 10px;
  overflow: hidden;
}
.main .intro .card-text>.avatar>img{
  width: 100%;
  height: 100%;
} 
.main .intro .card-text>.simple-intro>.media{
  display: flex;
  justify-content: center;
} 
.main .intro .card-text>.simple-intro>.media>div{
  margin: 0 10px
} 
.main .intro .card-text>.simple-intro>.media>div>a{
  font-size: 29px
}
.news>a{
  text-decoration: none;
}
.news .card-header{
  text-align: left;
}
.news .card-header>span{
  display: inline-block;
  margin-right: 10px;
}
.news .card-header>span.fa-eye{
  float: right;
  color: rgb(198,198,198);
}
/*.news .card-body{*/
  /*color: #7f7f7f;*/
/*}*/
.news .card-body>.card-text{
  text-align: left;
  text-indent: 49px;
}
.fa-github{
  color: #000;
  text-decoration: none;
}
.footer{
  height: 3px;
}
</style>
