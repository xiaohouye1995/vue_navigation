import request from '@/utils/axiosReq'
import { ObjTy } from '~/common'

export function getCategoryListAll(params: ObjTy) {
  return request({
    url: '/api/v1/getCategoryListAll',
    method: 'get',
    data: params
  })
}

export function getCategoryList(params: ObjTy) {
  return request({
    url: '/api/v1/getCategoryList',
    method: 'get',
    data: params
  })
}

export function getNameList(params: ObjTy) {
  return request({
    url: '/api/v1/getNameList',
    method: 'get',
    data: params,
    isParams: true
  })
}

export function categoryAdd(data: ObjTy) {
  return request({
    url: '/api/v1/categoryAdd',
    data,
    method: 'post',
    bfLoading: false,
    isAlertErrorMsg: false
  })
}

export function categoryEdit(data: ObjTy) {
  return request({
    url: '/api/v1/categoryEdit',
    data,
    method: 'post',
    bfLoading: false,
    isAlertErrorMsg: false
  })
}

export function categoryDel(data: ObjTy) {
  return request({
    url: '/api/v1/categoryDel',
    data,
    method: 'post',
    bfLoading: false,
    isAlertErrorMsg: false
  })
}
