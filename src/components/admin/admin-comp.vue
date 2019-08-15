<template>
  <component v-bind:is="currentTabComponent" class="component"></component>
</template>

<script>
    //import utils from '../../utils'
    //import {api, fakeData} from '../../api'
    import store from '../../store'

    import teacherList from "../../components/admin/teacher-list";
    import tagList from "../../components/admin/tag-list";

    export default {
        name: "admin-comp",
        components: {teacherList,tagList},
        computed:{
            currentTabComponent(){
                return store.state.admin.index||'teacher-list';
            }
        },
        data(){
            return{
                name: "admin-comp"
            }
        }
    }
</script>

<style scoped>
  .component{
    margin-top:2%;
  }
</style>