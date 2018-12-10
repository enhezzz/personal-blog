<template>
    <div class="login row animated zoomInDown">
        <div class="col-5">
            <div class="login-header">
                <h3 class="animated tada infinited">login...</h3>
            </div>
            <div class="login-body">
                <div class="form-group">
                    <label for="account">Account</label>
                    <input type="text" class="form-control" placeholder="账号" id="account" name="account" v-model="account">
                </div>
                <div class="form-group">
                    <label for="password">Password</label>
                    <input type="password" class="form-control" placeholder="密码" id="password" name="password" v-model="password">
                </div>
                <button type="submit" class="btn btn-primary" @click="login">login</button>
            </div>
        </div>
        <div class="alert alert-success" role="alert" :class="{show:toLogin&&isLogin,fadeOutUp:toLogin&&isLogin,animated:toLogin&&isLogin}">
            登陆成功！
        </div>
        <div class="alert alert-danger" role="alert" :class="{show:toLogin&&!isLogin,fadeOutUp:toLogin&&!isLogin,animated:toLogin&&!isLogin}">
            账号或密码错误！
        </div>
    </div>
    
</template>
<script>
import NProgress from 'nprogress'
export default {
    // beforeRouteEnter (to, from, next) {
    //     // if(window)
    //     // NProgress.start()
    //     // next(vm => {
    //     //     if(window)
    //     //     NProgress.done()
    //     // })
    // },
    methods: {
        async login(){
            this.$store.commit('toggleLoading');
            let formData = new FormData();
            formData.append('account',this.account);
            formData.append('password',this.password);
            let res = await fetch('/login',{method: 'POST',body: formData,credentials: 'include'})
            .then(response=> {
                let status = response.status;
                if(status == 501){
                    return new Error('info err')
                }else{
                    return response.json();
                }
                
            });
            console.log(res)
            if(res instanceof Error){
                // alert('账号或密码错误');
                this.$store.commit('toggleLoginState',false);
            }else{
            this.$store.commit('updateAuthorizedCode',res.code);
            this.$store.commit('setUsername',res.username);
            this.$store.commit('setAccount',res.account);
            this.$store.commit('setPhone',res.phone);
            this.$store.commit('toggleLoginState',true);
            this.$router.push('/');
            }
            this.$store.commit('toggleLoading');
            this.toLogin = true;
            setTimeout(()=>{
                this.toLogin = false
            },2000);
        }
    },
    data: function(){
        return {
            account: '',
            password: '',
            toLogin: false
        }
    },
    computed: {
        isLogin(){
            return this.$store.state.isLogin
        }
    }
}
</script>
<style scoped>
.login{
    margin-top: 200px;
    justify-content: center
}
/* .login>.login-header>h3{
    width: 66%;
    margin: 0 auto
} */
.alert-success,.alert-danger{
    position: absolute;
    top: 198px;
    visibility: hidden;
    animation-fill-mode: both;
    animation-duration: 2s;
    animation-timing-function: ease-in
}
.show{
    visibility: visible
}
</style>
