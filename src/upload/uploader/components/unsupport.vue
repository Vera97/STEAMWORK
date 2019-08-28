<template>
    <div class="uploader-unsupport" v-show="!support">
        <slot>
            <p>
                很抱歉, 您的web浏览器不支持Uploader.js. Uploader.js需要web浏览器支持<a
                    href="http://www.w3.org/TR/FileAPI/"> HTML5 File API </a> 以及 <a
                    href="http://www.w3.org/TR/FileAPI/#normalization-of-params">文件分割API(（)支持分片上传)</a>.
            </p>
        </slot>
    </div>
</template>

<script>
    import {uploaderMixin, supportMixin} from '../common/mixins'

    const COMPONENT_NAME = 'uploader-unsupport';

    export default {
        name: COMPONENT_NAME,
        mixins: [uploaderMixin, supportMixin]
    }
</script>

<style>
    .uploader-unsupport {
        position: relative;
        z-index: 10;
        overflow: hidden;
    }
</style>
