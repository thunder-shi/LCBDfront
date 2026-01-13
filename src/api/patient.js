import listAPI from '@/api/list'
import constant from '@/constant'

// 复用列表查询服务，面向 PatientRecord 表
export async function searchPatients({
  pageNum = 1,
  pageSize = 20,
  pathology,
  stage,
  t,
  n,
  m,
  gender,
  geneLike,
  ageMin,
  ageMax,
  efficacyList
} = {}) {
  const searchKey = {}
  const reg = {}

  if (pathology) searchKey.pathology = pathology
  if (stage) searchKey.stage = stage
  if (typeof t === 'number') { searchKey.t = t; reg.t = constant.SEARCH_OPERATOR.EQ }
  if (typeof n === 'number') { searchKey.n = n; reg.n = constant.SEARCH_OPERATOR.EQ }
  if (typeof m === 'number') { searchKey.m = m; reg.m = constant.SEARCH_OPERATOR.EQ }
  if (typeof gender === 'number') { searchKey.gender = gender; reg.gender = constant.SEARCH_OPERATOR.EQ }
  if (geneLike) { searchKey.gene = geneLike; reg.gene = constant.SEARCH_OPERATOR.LIKE }

  // 年龄范围：优先使用 RANGE，其次用 GE/LE
  const hasMin = typeof ageMin === 'number'
  const hasMax = typeof ageMax === 'number'
  if (hasMin && hasMax) {
    searchKey.age = `${ageMin},${ageMax}`
    reg.age = constant.SEARCH_OPERATOR.RANGE
  } else if (hasMin) {
    searchKey.age = ageMin
    reg.age = constant.SEARCH_OPERATOR.GE
  } else if (hasMax) {
    searchKey.age = ageMax
    reg.age = constant.SEARCH_OPERATOR.LE
  }

  // 疗效 IN 查询
  if (Array.isArray(efficacyList) && efficacyList.length) {
    searchKey.efficacy = efficacyList.join(constant.SPLIT_OPERATOR.COMMA)
    reg.efficacy = constant.SEARCH_OPERATOR.IN
  }

  // 治疗方式布尔字段：选中则要求为 true
  ;['singleChemo', 'immunoChemo', 'targetedTherapy', 'adjuvantChemo'].forEach(k => {
    if (arguments[0] && arguments[0][k] === true) {
      searchKey[k] = true
      reg[k] = constant.SEARCH_OPERATOR.EQ
    }
  })

  return listAPI.getSomeRecords({
    keyWords: 'PatientRecord',
    pageInfo: { page: pageNum, size: pageSize },
    searchKey,
    reg,
    andor: constant.SEARCH_OPERATOR.AND
  })
}
