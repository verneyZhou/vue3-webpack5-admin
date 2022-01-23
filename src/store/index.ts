import { createStore } from 'vuex'
import getters from './getters'
import { ObjTy } from '@/types/common'


// 引入子模块
const moduleCtx = require.context('./modules', true, /\.(js|ts)$/);
const moduleCfg: ObjTy = moduleCtx.keys().reduce((cur: ObjTy, file) => {
    const cfg = moduleCtx(file).default;
    const moduleName = file.replace(/(.*\/)*([^.]+).*/gi, '$2')
    cur[moduleName] = cfg;
    return cur;
}, {});
/////


console.log('modules', moduleCfg);
export default createStore({
  modules: {...moduleCfg},
  getters
})
