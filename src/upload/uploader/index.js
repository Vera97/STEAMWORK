import Uploader from './components/uploader.vue'
import UploaderBtn from './components/btn.vue'
import UploaderDrop from './components/drop.vue'
import UploaderUnsupport from './components/unsupport.vue'
import UploaderList from './components/list.vue'
import UploaderFiles from './components/files.vue'
import UploaderFile from './components/file.vue'

const __VERSION__ = '0.1.0';

const uploader = {
    version: /* eslint-disable no-undef */ __VERSION__,
    install,
    Uploader,
    UploaderBtn,
    UploaderDrop,
    UploaderUnsupport,
    UploaderList,
    UploaderFiles,
    UploaderFile
};

export default uploader

function install(Vue) {
    if (install.installed) {
        return
    }
    Vue.component(Uploader.name, Uploader);
    Vue.component(UploaderBtn.name, UploaderBtn);
    Vue.component(UploaderDrop.name, UploaderDrop);
    Vue.component(UploaderUnsupport.name, UploaderUnsupport);
    Vue.component(UploaderList.name, UploaderList);
    Vue.component(UploaderFiles.name, UploaderFiles);
    Vue.component(UploaderFile.name, UploaderFile)
}
