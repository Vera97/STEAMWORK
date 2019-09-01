<template>
    <uploader :options="options" :file-status-text="statusText" class="uploader-example" ref="uploader"
              @file-complete="fileComplete" @complete="complete">
    </uploader>
</template>

<script>

    import Uploader from "./uploader/components/uploader";
    import axios from "axios";

    export default {
        name: 'media_uploader',
        components: {Uploader},
        props: {
            exerciseId: {
                type: Number,
                default: 1
            }
        },
        data() {
            return {
                options: {
                    testChunks: true,
                    chunkSize: '2048000',
                    target: '/api/files/courses_prepare/file_upload_chunks', //
                    query: this.compleParams,
                    headers: window.headers
                },
                attrs: {
                    accept: 'image/*'
                },
                statusText: {
                    success: '成功了',
                    error: '出错了',
                    uploading: '上传中',
                    paused: '暂停中',
                    waiting: '等待中'
                },
                uploader: null, //上传器对象，在组件加载完毕可访问此对象，做一些如自定义如何暂停和继续，当然并不建议
            }
        },
        methods: {
            compleParams(file, chunk, testmode) {
                //file为当前上传文件对象，chunk为分片，testmode为是否处于测试分片状态
                //这里必须返回一个对象
                return {exerciseId: this.exerciseId}
            },
            complete() {
                window.console.log('complete', arguments);
            },
            fileComplete(root_file) {
                //root_file是上传组件现在的一个跟文件对象，具体字段可log出来看
                window.console.log('file complete', root_file);
                axios.get('/api/files/courses_prepare/file_upload_chunks_merge', {
                    params: {
                        root_file_name: root_file.name,
                        identifier: root_file.uniqueIdentifier
                    }
                }).then(res => {
                    alert(res.data)
                });
            }
        },
        mounted() {
            this.$nextTick(() => {
                //获取uploader实例，以备自定义暂停开始，或者其他方法
                window.uploader = this.$refs.uploader.uploader;
                this.uploader = this.$refs.uploader.uploader;
            })
        }
    }
</script>

<style>
    .uploader-example {
        width: 880px;
        padding: 15px;
        margin: 40px auto 0;
        font-size: 12px;
        box-shadow: 0 0 10px rgba(0, 0, 0, .4);
    }

    .uploader-example .uploader-btn {
        margin-right: 4px;
    }

    .uploader-example .uploader-list {
        max-height: 440px;
        overflow: auto;
        overflow-x: hidden;
    }
</style>
