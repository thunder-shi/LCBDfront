import listAPI from '@/api/list'

// 仅保留通用查询入口：直接透传到列表服务
export function getSomeRecords(payload) {
  return listAPI.getSomeRecords(payload)
}
