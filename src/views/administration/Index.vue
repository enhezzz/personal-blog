<template>
     <div class="main row">
        <aside class="col-2">
            <ul class="admin-theme list-group">
                <li class="list-group-item active">post</li>
            </ul>
        </aside>
        <div class="col-9"> 
            <router-view></router-view>
        </div>
        
    </div>
</template>
<script>
export default {
    
}
</script>
<style scoped>
.main{
    margin-top: 86px;
}
</style>    
