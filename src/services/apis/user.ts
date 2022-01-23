import request from '@/services/http-interceptors'
import { ObjTy } from '@/types/common'

// 登录
export function _login(data: ObjTy) {
  return request({
    url: '/api/user/login',
    data,
    method: 'post',
    isAlertErrorMsg: false
  })
}

// 获取用户信息
export function _getUserInfo() {
  return request({
    url: '/api/user/info',
    method: 'get'
  })
}

// 登出
export function _logout() {
  return request({
    url: '/api/user/logout',
    method: 'get'
  })
}
