<template>
    <div class="register row animated zoomInDown">
        <div class="col-5">
            <div class="register-header">
                <h3 class="animated tada infinited">register...</h3>
            </div>
            <div class="register-body">
                <div class="form-group">
                    <label for="username">Username:</label>
                    <input type="text" v-model.trim="username" class="form-control" placeholder="用户名" id="username" name="username">
                    <div class="invalid-feedback" v-if="!this.valid[0]">
                        用户名不能为空
                    </div>
                </div>
                <div class="form-group">
                    <label for="email">Email:</label>
                    <input type="email" v-model.trim="account" class="form-control" placeholder="账号(用做登录号)" id="email" name="email">
                    <div class="invalid-feedback" v-if="!this.valid[1]">
                        邮箱格式不正确
                    </div>
                </div>
                <div class="form-group">
                    <label for="phone">Phone:</label>
                    <input type="text" v-model.trim="phone" class="form-control" placeholder="手机号" id="phone" name="phone">
                    <div class="invalid-feedback" v-if="!this.valid[2]">
                        输入11位手机号
                    </div>
                </div>
                <div class="form-group">
                    <label for="password">Password:</label>
                    <input type="password" v-model.trim="password" class="form-control" placeholder="密码" id="password" name="password">
                    <div class="invalid-feedback" v-if="!this.valid[3]">
                        密码不能为空
                    </div>
                </div>
                <button type="submit" class="btn btn-primary" @click="register">register</button>
            </div>
        </div>
      
    </div>
</template>
<script>
export default {
    methods: {
        register(e){
            this.valid =  this.validate(this.username,this.account,this.phone,this.password);
            console.log(this.valid)
            if(this.valid.some(valid=> !valid)) return;
            let request = new Request('/register');
            let formData = new FormData();
            formData.append('username',this.username);
            formData.append('account',this.account);
            formData.append('phone',this.phone);
            formData.append('password',this.password);
            fetch(request,{
                method: 'POST',
                body: formData
            }).then(response=>{
                let status = response.status;
                if(status == 200){
                    alert('注册成功');
                    this.$router.push('/login');
                }else if(status == 403){
                    alert('账号已存在')
                }
            })
        },
        validate(...options){
            //options = [username,account,phone,password]

            // let usernameExp = /.+/,
            //     accountExp = /\w+@\w+\.com/,
            //     phoneExp = /\d{11}/,
            //     passwordExp = /.+/;
            let exps = [/.+/,/\w+@\w+\.com/,/\d{11}/,/.+/];
            return options.map((option,index)=>{
                return exps[index].test(option);
            })
        }
    },
    data(){
        return {
            username: '',
            account: '',
            phone: '',
            password: '',
            valid: [true,true,true,true]
        }
    }
}
</script>
<style scoped>
.register{
    margin-top: 138px;
    justify-content: center
}
.register-body{
    text-align: left;
}
.invalid-feedback{
    display: block;
}
</style>
