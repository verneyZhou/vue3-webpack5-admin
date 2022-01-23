import { createApp } from 'vue'
import SvgIcon from '@/components/svg-icon.g.vue' // svg component

const requireAll = function(requireContext: any) {
    console.log( requireContext.keys());
  return requireContext.keys().map(requireContext)
}
const req = require.context('./svg', false, /\.svg$/)

requireAll(req)
console.log(requireAll(req));

export default function(app: ReturnType<typeof createApp>) {
  app.component('SvgIcon', SvgIcon)
}
