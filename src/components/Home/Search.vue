<template>
  <div class="container-fluid">
    <div class="container-fluid search-box-wrapper">
      <ol class="breadcrumb pull-right">
        <li><input type="text" class="form-control" placeholder="搜索"></li>
        <li class="active " @click="popup" data-toggle="modal" data-target="#myModal">筛选<i class="fa fa-empire"></i></li>
      </ol>
    </div>
    <!-- 筛选模态框 -->
    <div :class="show" class="modal" id="myModal">
      <div class="modal-dialog">
        <div class="modal-content">
          <!-- 模态框主体 -->
          <div class="modal-body">
            <div class="product-list-main">
              <ul class="product-list-wrap" id="ul_select">
                <li class="select-result">
                  <dl id="dl_result" class="clearfix">
                    <dd class="select-no"></dd>
                    <dt v-on:click="clear"><span id="clearAll">清空筛选</span></dt>
                    <dd v-for="item in selected" class="selected" v-on:click="del($event, Object.keys(item)[0])" v-bind:key="Object.keys(item)[0]"><span>{{ m[Object.keys(item)[0]] }}: {{ Object.values(item)[0] }}</span></dd>
                  </dl>
                </li>
                <li v-if="kindsOn" class="select-list">
                  <dl id="select1" class="dl clearfix">
                    <dt>类别:</dt>
                    <div class="fl">
                      <dd v-for="item in kinds" v-on:click="kindsClick($event, item.name)" v-bind:key="item.name"><span>{{ item.name }}</span></dd>
                    </div>
                  </dl>
                </li>
                <li v-if="classesOn" class="select-list">
                  <dl id="select2" class="dl clearfix">
                    <dt>课程:</dt>
                    <div class="fl">
                      <dd v-for="item in classes" v-on:click="classesClick($event, item.name)" v-bind:key="item.name"><span>{{ item.name }}</span></dd>
                    </div>
                    <div class="product-list-more"><i>更多</i><img src="images/more.png" alt=""></div>
                  </dl>
                </li>
                <li v-if="teachersOn" class="select-list">
                  <dl id="select3" class="dl clearfix">
                    <dt>教师:</dt>
                    <div class="fl">
                      <dd v-for="item in teachers" v-on:click="teachersClick($event, item.name)" v-bind:key="item.name"><span>{{ item.name }}</span></dd>
                    </div>
                    <div class="product-list-more"><i>更多</i><img src="images/more.png" alt=""></div>
                  </dl>
                </li>
                <li v-if="timesOn" class="select-list">
                  <dl id="select4" class="dl clearfix">
                    <dt>时间:</dt>
                    <div class="fl">
                      <dd v-for="item in times" v-on:click="timesClick($event, item.length)" v-bind:key="item.length"><span>{{ item.length }}</span></dd>
                    </div>
                    <div class="product-list-more"><i>更多</i><img src="images/more.png" alt=""></div>
                  </dl>
                </li>
                <li v-if="othersOn" class="select-list">
                  <dl id="select5" class="dl clearfix">
                    <dt>其他:</dt>
                    <div class="fl">
                      <dd v-for="item in others" v-on:click="othersClick($event, item.content)" v-bind:key="item.content"><span>{{ item.content }}</span></dd>
                    </div>
                    <div class="product-list-more"><i>更多</i><img src="images/more.png" alt=""></div>
                  </dl>
                </li>
              </ul>
            </div>
          </div>
          <!-- 模态框底部 -->
          <div class="modal-footer">
            <button v-on:click="submit" type="button" class="btn btn-secondary" data-dismiss="modal">确认</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    import store from '@/views/Home/store'

    export default {
        name: "Search",
        computed: {
            selected: function () {
                return store.state.select
            }
        },
        data () {
            return {
                m: {
                    kind: '类别',
                    class: '课程',
                    teacher: '老师',
                    time: '时间',
                    other: '其它'
                },
                show: "on-hidden",
                kindsOn: true,
                kinds: [
                    {name: '类别1'},
                    {name: '22'},
                    {name: '33'}
                ],
                classesOn: true,
                classes: [
                    {name: '课程1'},
                    {name: '22'},
                    {name: '33'},
                    {name: '44'},
                    {name: '55'}
                ],
                teachersOn: true,
                teachers: [
                    {name: '何老师'},
                    {name: '张老师'},
                    {name: '敏院长'}
                ],
                timesOn: true,
                times: [
                    {length: '1'},
                    {length: '2'},
                    {length: '3'},
                    {length: '4'}
                ],
                othersOn: true,
                others: [
                    {content: 'one'},
                    {content: 'two'},
                    {content: 'three'}
                ]
            }
        },
        methods: {
            popup: function () {
                this.show = "on-show"
            },
            kindsClick: function ($event, name) {
                this.kindsOn = false;
                store.commit('select', {kind: name})
            },
            classesClick: function ($event, name) {
                this.classesOn = false;
                store.commit('select', {class: name})
            },
            teachersClick: function ($event, name) {
                this.teachersOn = false;
                store.commit('select', {teacher: name})
            },
            timesClick: function ($event, length) {
                this.timesOn = false;
                store.commit('select', {time: length})
            },
            othersClick: function ($event, content) {
                this.othersOn = false;
                store.commit('select', {other: content})
            },
            del: function ($event, key) {
                switch (key) {
                    case 'kind':
                        this.kindsOn = true;
                        break;
                    case 'class':
                        this.classesOn = true;
                        break;
                    case 'teacher':
                        this.teachersOn = true;
                        break;
                    case 'time':
                        this.timesOn = true;
                        break;
                    case 'other':
                        this.othersOn = true;
                        break;
                }
                store.commit('delete', key);
            },
            clear: function () {
                this.kindsOn = this.classesOn = this.teachersOn = this.timesOn = this.othersOn = true;
                store.commit('clear');
            },
            submit: function () {
                store.commit('filter');
                store.commit('clear');
            }
        }
    }
</script>

<style scoped>
  @import "../../assets/plugin/font-awesome/css/font-awesome.css";
  @import '../../assets/css/iconfont.css';

  .search-box-wrapper {
    overflow: hidden;
  }

  .on-show {
    display: block;
  }

  .on-hidden {
    display: none;
  }
</style>
