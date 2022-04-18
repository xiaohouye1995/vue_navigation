import request from '@/utils/axiosReq'
import { ObjTy } from '~/common'

export function getCategoryListAll(params: ObjTy) {
  return request({
    url: '/api/menus/getMenus',
    method: 'get',
    data: params
  })
}

export function getCategoryList(params: ObjTy) {
  return request({
    url: '/api/menus/getMenusCategory',
    method: 'get',
    data: params
  })
}

export function getNameList(params: ObjTy) {
  return request({
    url: '/api/menus/getMenusColumn',
    method: 'get',
    data: params,
    isParams: true
  })
}

export function categoryAdd(data: ObjTy) {
  return request({
    url: '/api/menus/addMenusCategory',
    data,
    method: 'post',
    bfLoading: false,
    isAlertErrorMsg: true
  })
}

export function categoryEdit(data: ObjTy) {
  return request({
    url: '/api/menus/editMenusCategory',
    data,
    method: 'post',
    bfLoading: false,
    isAlertErrorMsg: true
  })
}

export function categoryDel(data: ObjTy) {
  return request({
    url: '/api/menus/delMenusCategory',
    data,
    method: 'post',
    bfLoading: false,
    isAlertErrorMsg: true
  })
}
