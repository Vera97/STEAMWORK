<template>
  <component v-bind:is="currentTabComponent" class="component" id="id"></component>
</template>

<script>
    //import utils from '../../utils'
    //import {api, fakeData} from '../../api'
    import store from '../../store'

    import teacherList from "../../components/admin/teacher-list";
    import tagList from "../../components/admin/tag-list";
    import resourceList from '../admin/resource-list'
    import pptList from '../admin/ppt-list'
    import editCourse from '../admin/edit-course'
    import resourceManage from '../admin/resource-manage'


    export default {
        name: "admin-comp",
        components: {teacherList,tagList,resourceList,pptList,editCourse,resourceManage},
        computed:{
            currentTabComponent(){
                return store.state.admin.index||'teacher-list';
            }
        },
        data(){
            return{
                name: "admin-comp",
            }
        },
    }
</script>

<style scoped>
  .component{
    margin-top:2%;
    min-height:550px;
  }
</style>