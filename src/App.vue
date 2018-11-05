<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div> -->
     <nav class="navbar navbar-light animated bounceInLeft fixed-top">
      <div class="row nav-row">
        <div class="col-md-2">
          <router-link to="/">首页</router-link>
        </div>
        <div class="col-md-2">
          <router-link to="/blog">学习/生活</router-link>
        </div>
        <div class="col-md-2">
          <router-link to="">心情留言板</router-link>
        </div>
        <div class="col-md-2">
          <router-link to="">关于</router-link>
        </div>
        <div class="col-md-3">
          <input class="form-control form-control-sm search-bar" type="text" placeholder="搜索..." @keyup.enter="search">
        </div>
        <div class="col-md-1 setting">
          <label class="btn btn-default btn-sm" for="setting">
            <i class="fa fa-cog"></i>
            <span class="visible-lg-inline nodisplay">Settings</span>
          </label>
          <input type="text" id="setting">
          <div class="setting-items">
            <div class="setting-item" v-if="!isLogin">
              <router-link to="/register">注册</router-link>
            </div>
            <div class="setting-item" v-if="!isLogin">
              <router-link to="/login">登陆</router-link>
            </div>
            <div class="setting-item" v-if="isLogin">
              <router-link to="/login">{{username}}</router-link>
            </div>
            <div class="setting-item" v-if="isLogin">
              <a href="javascript:;" @click="logout">注销</a>
            </div>
            <div class="setting-item">
              <router-link to="/admin" v-if="isAdmin">admin</router-link>
            </div>
            <!-- <div class="setting-item" v-if="isAdmin">manage</div> -->
          </div>
        </div>
      </div>
    </nav>
    <div class="main-content">
      <router-view/>
    </div>
    <div class="mask" v-if="loading">
        <div class="loader-wrap">
            <div class="item-group">
                <div class="item"></div>
                <div class="item"></div>
                <div class="item"></div>
                <div class="item"></div>
            </div> 
            <span class="title">loading...</span>
        </div>
    </div>
  </div>
</template>
<script>
// import fetchMock from 'fetch-mock';
// fetchMock.get('/blog/java',{
//     posts: [
//         {
//             "title": '1',
//             "content": 'content1'
//         },
//         {
//             "title": '2',
//             "content": 'content2'
//         },
//         {
//             "title": '3',
//             "content": 'content3'
//         },
//         {
//             "title": '4',
//             "content": 'content4'
//         }
//     ]
// })
// fetchMock.post('/login',{
//   authorizedCode: 1
// })
export default {
  computed: {
    isAdmin(){
      return this.$store.state.code == 1;
    },
    loading(){
      return this.$store.state.loading;
    },
    isLogin(){
      return this.$store.state.isLogin  
    },
    username(){
        return this.$store.state.username
    }
  },
    methods: {
      search(e){
          let keyword = e.target.value.trim();
          this.$router.push({path: '/search',query: {keyword}});
      },
      async logout(){
          let request = new Request('/logout');
          await fetch(request).then(response=> true);
          this.$store.commit('toggleLoginState',false);
          this.$router.push('/login');
          if(this.$store.state.code == 1)
              this.$store.commit('updateAuthorizedCode',0)
      }
    }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
html,body{
  min-height: 100%
}
body{
  background-image: linear-gradient(135deg, #FFD26F 0%, #3677FF 100%);
  background-repeat: no-repeat
}
.row{
  margin: 0
}
.infinited{
    animation-iteration-count: infinite
}
.nodisplay{
    display: none;
}
@media screen and (min-width: 920px){
    .visible-lg-inline{
        display: inline !important;
    }
}

</style>
<style scoped>
.nav-row{
    width: 100%;
    align-items: center
}
.navbar .search-bar{
  float: right;
  transition: all 1s ease;
  width: 150px
}
.navbar .search-bar:focus{
  width: 100%
}
.main-content{
  margin-top: 48px
}
.nav-row>.setting{
  position: relative;
}
.nav-row>.setting label{
  margin-bottom: 0
}
.nav-row>.setting input[type='text']{
  position: absolute;
  width: 0;
  height: 0;
  border: none
}
.nav-row>.setting input[type='text']:focus+.setting-items{
  height: 160px;
    padding-top: 10px;
}
.nav-row>.setting>.setting-items{
  position: absolute;
  right: 0;
  top: 28px;
  min-width: 205px;
  height: 0;
  transition: height .4s ease-out,padding .2s .3s ease-out;
  overflow: hidden;
    background: rgba(199,199,199,.7);
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    border-radius: 5px;
    background-clip: content-box;
    padding-top: 0px;
}
.nav-row>.setting>.setting-items::before{
  position: absolute;
  content: '';  
  border: 10px solid #aaa;
  border-color: transparent transparent rgba(199,199,199,.7) transparent;
    right: 0;
    top: -10px;

}
.nav-row>.setting>.setting-items>.setting-item{
  line-height: 40px;
}
.nav-row>.setting>.setting-items>.setting-item>a{
    display: block;
}
.mask{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(233, 233, 233, .4);
    z-index: 999;
}
.mask>.loader-wrap{
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate3d(-50%,-50%,0);
    width: 80%;
    height: 80%;
}
  .mask>.loader-wrap>.title{
      /* display: block; */
      /* margin-top: 10px; */
      text-align: center;
      position: absolute;
      top: 60%;
      left: 6px;
      /* transform: translate3d(0,100%,0); */
      width: 100px;
      width: 100%;
      animation: tada 1s infinite;
      /* color:  */
  }
  .mask>.loader-wrap>.item-group{
      /* display: block; */
      /* margin-top: 10px; */
     width: 3rem;
     height: 3rem;
     margin: 0 auto;
     position: absolute;
     top: 50%;
     left: 50%;
     transform: translate3d(-50%,-50%,0)
  }
  @keyframes tada {
      0% {
          transform: scale3d(1, 1, 1)
      }
      10%,
      20% {
          transform: scale3d(.9, .9, 1) rotate3d(0, 0, 1, -3deg)
      }
      30%,
      50%,
      70%,
      90% {
          transform: rotate3d(0, 0, 1, 3deg)
      }
      40%,
      60%,
      80% {
          transform: rotate3d(0, 0, 1, -3deg)
      }
      100% {
          transform: rotate3d(0, 0, 0, 0deg)
      }
  }
  .mask>.loader-wrap>.item-group>.item{
      width: 33.3%;
      height: 33.3%;
      position: absolute;
  }
  .mask>.loader-wrap>.item-group>.item:nth-child(1){
      background: pink;
      animation: item1 2s ease infinite
  }
  @keyframes item1{
      0%{
          transform: translate3d(0,0,0) rotate3d(0,0,0,-90deg) scale3d(1,1,1);
      }
      25%{
          transform: translate3d(200%,0,0) rotate3d(0,0,1,-90deg) scale3d(.5,.5,1);
          /* animation-timing-function: cubic-bezier(.08,.47,.46,-0.19) */
      }
      50%{
          transform: translate3d(200%,200%,0) rotate3d(0,0,1,-180deg) scale3d(1,1,1);
          /* animation-timing-function: cubic-bezier(.18,.65,.72,.27) */
      }
      75%{
          transform: translate3d(0,200%,0) rotate3d(0,0,1,-270deg) scale3d(.5,.5,1);
          /* animation-timing-function: cubic-bezier(.08,.47,.46,-0.19) */
      }
      100%{
          transform: translate3d(0,0,0) rotate3d(0,0,1,-360deg) scale3d(1,1,1);
          /* animation-timing-function: cubic-bezier(.08,.47,.46,-0.19) */
      }
  }
  .mask>.loader-wrap>.item-group>.item:nth-child(2){
      background: green;
      animation: item2 2s infinite
  }
  @keyframes item2{
      0%{
          transform: translate3d(200%,0,0) rotate3d(0,0,1,-90deg) scale3d(.5,.5,1);
          /* animation-timing-function: cubic-bezier(.08,.47,.46,-0.19) */
      }
      25%{
          transform: translate3d(200%,200%,0) rotate3d(0,0,1,-180deg) scale3d(1,1,1);
          /* animation-timing-function: cubic-bezier(.18,.65,.72,.27) */
      }
      50%{
          transform: translate3d(0,200%,0) rotate3d(0,0,1,-270deg) scale3d(.5,.5,1);
          /* animation-timing-function: cubic-bezier(.08,.47,.46,-0.19) */
      }
      75%{
          transform: translate3d(0,0,0) rotate3d(0,0,1,-360deg) scale3d(1,1,1);
          /* animation-timing-function: cubic-bezier(.08,.47,.46,-0.19) */
      }
      100%{
          transform: translate3d(200%,0,0) rotate3d(0,0,1,-450deg) scale3d(.5,.5,1);
      }
  }
  .mask>.loader-wrap>.item-group>.item:nth-child(3){
      background: yellow;
      animation: item3 2s infinite
  }
  @keyframes item3{
      0%{
          transform: translate3d(200%,200%,0) rotate3d(0,0,1,-180deg) scale3d(1,1,1);
          /* animation-timing-function: cubic-bezier(.18,.65,.72,.27) */
      }
      25%{
          transform: translate3d(0,200%,0) rotate3d(0,0,1,-270deg) scale3d(.5,.5,1);
          /* animation-timing-function: cubic-bezier(.08,.47,.46,-0.19) */
      }
      50%{
          transform: translate3d(0,0,0) rotate3d(0,0,1,-360deg) scale3d(1,1,1);
          /* animation-timing-function: cubic-bezier(.08,.47,.46,-0.19) */
      }
      75%{
          transform: translate3d(200%,0,0) rotate3d(0,0,1,-450deg) scale3d(.5,.5,1);
      }
      100%{
          transform: translate3d(200%,200%,0) rotate3d(0,0,1,-540deg) scale3d(1,1,1);
      }
  }
  .mask>.loader-wrap>.item-group>.item:nth-child(4){
      background: blue;
      animation: item4 2s infinite
  }
  @keyframes item4{
      0%{
          transform: translate3d(0,200%,0) rotate3d(0,0,1,-270deg) scale3d(.5,.5,1);
          /* animation-timing-function: cubic-bezier(.08,.47,.46,-0.19) */
      }
      25%{
          transform: translate3d(0,0,0) rotate3d(0,0,1,-360deg) scale3d(1,1,1);
          /* animation-timing-function: cubic-bezier(.08,.47,.46,-0.19) */
      }
      50%{
          transform: translate3d(200%,0,0) rotate3d(0,0,1,-450deg) scale3d(.5,.5,1);
      }
      75%{
          transform: translate3d(200%,200%,0) rotate3d(0,0,1,-540deg) scale3d(1,1,1);
      }
      100%{
          transform: translate3d(0,200%,0) rotate3d(0,0,1,-630deg) scale3d(.5,.5,1);
      }
  }
</style>

