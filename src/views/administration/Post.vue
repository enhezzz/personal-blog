<template>
    <div class="editor_wrap">
        <div class="input-group mb-3">
            <div class="input-group-prepend">
                <span class="input-group-text">标题</span>
            </div>
            <input type="text" class="form-control" v-model="title" aria-label="Default" aria-describedby="inputGroup-sizing-default">
        </div>
        <div class="input-group mb-3">
            <div class="input-group-prepend">
                <span class="input-group-text">作者</span>
            </div>
            <input type="text" class="form-control" :value="author" aria-label="Default" aria-describedby="inputGroup-sizing-default" readonly>
        </div>
        <div class="input-group mb-3">
            <div class="input-group-prepend">
                <span class="input-group-text" id="inputGroup-sizing-default">标签</span>
            </div>
            <tags-input element-id="tags" input-class="form-control" v-model="selectedTags" :existing-tags="existingTags" :typeahead="true" placeholder="Add a tag"></tags-input>
        </div>
        <vue-wangeditor id="editor1" :options="options1" v-model="content"></vue-wangeditor>
        <button type="button" class="btn btn-primary btn-lg btn-block" :disabled="content==''" @click="post">Block level button</button>
    </div>
        
    
</template>
<script>

export default {
    data: function(){
        return {
          initContent: '<p>要初始化的内容</p>',
          content: '', // 包含html标签
          text1: '123', // 不含html标签，纯文本
          title: '',
          options1: {
            width: '110%',
            height: '600px',
            uploadImgServer: '/upload'
          },
           existingTags : {
               'Web Development': 'Web Development',
               'PHP': 'PHP',
               'JavaScript': 'JavaScript',
            },
            selectedTags: [
                'Web Development'
            ]
        }
    },
    methods: {
        post(e){
            this.$store.commit('toggleLoading');
            let request = new Request('/post');
            let formData = new FormData();
            formData.append('title',this.title);
            formData.append('author',this.author);
            formData.append('tags',JSON.stringify(this.selectedTags));
            formData.append('content',this.content);
            fetch(request,{
                method: 'POST',
                body: formData
            }).then(response=>{
                if(response.status == 200){
                    alert('发布成功')
                }else {
                    throw new Error('服务器端内部错误！！')
                }
                this.$store.commit('toggleLoading');
            }).catch(err=>{
                console.error(err);
            })
        }
    },
    computed: {
        author(){
            return this.$store.state.username;
        }
    }
}
</script>
<style scoped>

</style>
