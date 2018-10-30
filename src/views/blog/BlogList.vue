<template>
    <div class="main row">
        <aside class="col-2">
            <div class="blog-theme">
                <label for="learning">
                    <span class="theme">学习</span>
                </label>
                <input type="checkbox" class="nodisplay" id="learning" checked>
                <div class="items" active-class="router-link-active">
                        <div class="item" v-for="tag in list" :key="tag._id">
                            <router-link :to="`/blog/${encodeURIComponent(tag.name)}`">{{tag.name}}</router-link>
                        </div>
                </div>
            </div>
            <!--<div class="blog-theme">-->
                <!--<label for="life">-->
                    <!--<span class="theme">生活</span>-->
                <!--</label>-->
                <!--<input type="checkbox" class="nodisplay" id="life">-->
                <!--<div class="items life">-->
                        <!--<div class="item">生活</div>-->
                <!--</div>-->
            <!--</div>-->
            
        </aside>
        <div class="col-9 offset-md-2">
            <router-view></router-view>
        </div>
        
    </div>
</template>
<script>
export default {
    created(){
        let request = new Request('/blogList');
        fetch(request).then(response=> response.json())
            .then(list=>{
                this.list.push(...list);
            })
    },
    data(){
        return {
            list: []
        }
    }
}
</script>
<style scoped>
.nodisplay{
    display: none
}
.main label{
    display: block;
}
.main label>.theme{
    display: block;
    line-height: 37px;
    padding: 0 0 0 10px;
    cursor: pointer;
}
.main .blog-theme{
    position: relative;
}
.main input[type='checkbox']+.items{
    height: 0;
    overflow: hidden;
    transition: all 0.35s ease;
    background: #eee
}
.main input[type='checkbox']:checked+.items{
    height: 105px;
    padding: 10px 0 10px 10px
}
.main input[type='checkbox']+.items>.item{
    min-height: 35px;
}
.main input[type='checkbox']+.items>.item>a{
    display: block;
    height: 100%;
    /* line-height: 100%; */
}
.main>aside{
    background: rgba(255,255,255,.6);
    border-radius: 14px;
    height: 92vh;
    position: fixed;
}
.router-link-active{
    background: rgba(221,221,221,.7);
}
</style>
<style></style>
