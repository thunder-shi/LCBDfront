<template>
  <div class="search-page">
    <header class="search-header">
      <h1>Multi-dimensional Search System</h1>
      <p>Explore & Refine Your Breathomics Query</p>
    </header>

    <div class="search-body">
      <el-card class="filters" shadow="hover">
        <div class="section-title">Filter Parameters</div>
        <el-form :model="filters" label-position="top" class="filters-form">
            <div class="form-group">
              <div class="group-title">基本信息</div>
              <el-row :gutter="12">
                <el-col :xs="24" :sm="12">
                  <el-form-item label="性别">
                    <el-select v-model="filters.gender" placeholder="选择" clearable>
                      <el-option v-for="opt in options.gender" :key="opt.value" :label="opt.label" :value="opt.value" />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12">
                  <el-form-item label="年龄范围">
                    <el-slider v-model="filters.ageRange" :min="0" :max="100" range :step="1" />
                  </el-form-item>
                </el-col>
              </el-row>
            </div>

          <div class="form-group">
              <div class="group-title">TNM 分期</div>
            <el-row :gutter="12">
              <el-col :xs="24" :sm="12">
                  <el-form-item label="T">
                    <el-select v-model="filters.t" placeholder="选择" clearable>
                      <el-option v-for="opt in options.tnmValues" :key="opt" :label="opt" :value="opt" />
                    </el-select>
                  </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="12">
                  <el-form-item label="N">
                    <el-select v-model="filters.n" placeholder="选择" clearable>
                      <el-option v-for="opt in options.tnmValues" :key="opt" :label="opt" :value="opt" />
                    </el-select>
                  </el-form-item>
              </el-col>
              </el-row>
              <el-row :gutter="12" style="margin-top:8px;">
                <el-col :xs="24" :sm="12">
                  <el-form-item label="M">
                    <el-select v-model="filters.m" placeholder="选择" clearable>
                      <el-option v-for="opt in options.tnmValues" :key="opt" :label="opt" :value="opt" />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12">
                  <el-form-item label="分期">
                    <el-select v-model="filters.stage" placeholder="选择" clearable>
                      <el-option v-for="opt in options.tnmStages" :key="opt" :label="opt" :value="opt" />
                    </el-select>
                  </el-form-item>
                </el-col>
            </el-row>
          </div>

          <div class="form-group">
              <div class="group-title">病理类型与基因</div>
            <el-row :gutter="12">
              <el-col :xs="24" :sm="12">
                  <el-form-item label="病理类型">
                    <el-select v-model="filters.pathology" placeholder="选择" filterable clearable>
                      <el-option v-for="opt in options.pathologies" :key="opt" :label="opt" :value="opt" />
                    </el-select>
                  </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="12">
                  <el-form-item label="基因突变类型">
                    <el-select v-model="filters.geneType" placeholder="选择" filterable clearable>
                      <el-option v-for="opt in options.genes" :key="opt" :label="opt" :value="opt" />
                    </el-select>
                  </el-form-item>
              </el-col>
            </el-row>
          </div>

          <div class="form-group">
              <div class="group-title">治疗方式</div>
              <el-checkbox-group v-model="filters.treatments">
                <el-checkbox v-for="opt in options.treatments" :key="opt.value" :label="opt.value">{{ opt.label }}</el-checkbox>
              </el-checkbox-group>
          </div>

          <div class="form-group">
              <div class="group-title">疗效 (RECIST)</div>
            <el-checkbox-group v-model="filters.recist">
              <el-checkbox v-for="opt in options.recist" :key="opt" :label="opt">{{ opt }}</el-checkbox>
            </el-checkbox-group>
          </div>

          <div class="apply">
            <el-button type="primary" @click="applyFilters">Apply Filters</el-button>
          </div>
        </el-form>
      </el-card>

      <el-card class="results" shadow="hover">
        <div class="section-title" ref="resultsTop">Search Results & Visualization</div>
        <div class="results-top" ref="resultsHeader">
          <h3>Total Samples Found: {{ filtered.length }}</h3>
        </div>
        <div class="results-inner" ref="resultsBody">
        <el-table :data="tableData" border stripe :height="tableHeight" @selection-change="onSelectionChange" v-loading="loading">
          <el-table-column type="selection" width="48" fixed="left" />
            <el-table-column prop="patientNo" label="患者编号" width="140" fixed="left" />
          <el-table-column prop="exhaleNo" label="呼气编号" width="120" />
          <el-table-column prop="name" label="姓名" width="140" />
          <el-table-column label="性别" width="100">
            <template slot-scope="{ row }">{{ renderGender(row.gender) }}</template>
          </el-table-column>
          <el-table-column prop="age" label="年龄" width="100" />
          <el-table-column prop="pathology" label="病理类型" width="140" />
          <el-table-column prop="stage" label="分期" width="100" />
          <el-table-column prop="gene" label="基因" width="120" />
          <el-table-column prop="t" label="T" width="80" />
          <el-table-column prop="n" label="N" width="80" />
          <el-table-column prop="m" label="M" width="80" />
          <el-table-column prop="efficacy" label="疗效" width="120" />
          <el-table-column prop="singleChemo" label="化疗(单)" width="120">
            <template slot-scope="{ row }">{{ toBool(row.singleChemo) ? '是' : '否' }}</template>
          </el-table-column>
          <el-table-column prop="immunoChemo" label="化疗联合免疫" width="140">
            <template slot-scope="{ row }">{{ toBool(row.immunoChemo) ? '是' : '否' }}</template>
          </el-table-column>
          <el-table-column prop="targetedTherapy" label="靶向治疗" width="120">
            <template slot-scope="{ row }">{{ toBool(row.targetedTherapy) ? '是' : '否' }}</template>
          </el-table-column>
          <el-table-column prop="adjuvantChemo" label="术后辅助化疗" width="140">
            <template slot-scope="{ row }">{{ toBool(row.adjuvantChemo) ? '是' : '否' }}</template>
          </el-table-column>
          <el-table-column prop="emphysema" label="肺气肿" width="120">
            <template slot-scope="{ row }">{{ toBool(row.emphysema) ? '是' : '否' }}</template>
          </el-table-column>
          <el-table-column prop="ild" label="间质性肺病" width="140">
            <template slot-scope="{ row }">{{ toBool(row.ild) ? '是' : '否' }}</template>
          </el-table-column>
          <el-table-column prop="pneumonia" label="肺炎" width="120">
            <template slot-scope="{ row }">{{ toBool(row.pneumonia) ? '是' : '否' }}</template>
          </el-table-column>
          <el-table-column prop="smokingHistory" label="吸烟史(年)" width="140" />
          <el-table-column prop="smokingCessation" label="戒烟(年)" width="140" />
          <el-table-column prop="fileName" label="文件名" width="160" />
        </el-table>
        <div class="results-actions" ref="resultsActions">
          <el-button type="primary" @click="exportSelected">Export Selected to MetaboAnalyst</el-button>
        </div>
        <el-pagination
          class="results-pagination"
          background
          layout="prev, pager, next, jumper, sizes, total"
          :current-page="page.pageNum"
          :page-size="page.pageSize"
          :page-sizes="[10,30,50]"
          :total="filtered.length"
          @current-change="onPageChange"
          @size-change="onPageSizeChange"
          ref="resultsPagination"
        />
        </div>
      </el-card>
    </div>
  </div>
 </template>

<script>
import listAPI from '@/api/list'

export default {
  name: 'SearchPage',
  data() {
    return {
      filters: {
        gender: null,
        pathology: null,
        stage: null,
        t: null,
        n: null,
        m: null,
        geneType: null,
        treatments: [],
        ageRange: [20, 80],
        recist: []
      },
      options: {
        gender: [
          { label: '男', value: 1 },
          { label: '女', value: 2 }
        ],
        tnmValues: [0, 1, 2, 3, 4],
        tnmStages: ['I', 'II', 'III', 'IV'],
        pathologies: ['肺鳞癌', '肺腺癌', '小细胞肺癌', '其他'],
        genes: ['EGFR', 'ALK', 'KRAS', 'MET', 'RET', 'HER2', 'ROS1', '无突变'],
        treatments: [
          { label: '化疗', value: 'singleChemo' },
          { label: '化疗联合免疫', value: 'immunoChemo' },
          { label: '靶向治疗', value: 'targetedTherapy' },
          { label: '术后辅助化疗', value: 'adjuvantChemo' },
          { label: 'NA', value: 'na' }
        ],
        recist: ['CR', 'PR', 'SD', 'PD', 'NA' ]
      },
      selectedRows: [],
      tableHeight: 720,
      loading: false,
      serverList: null,
      serverAll: null,
      page: { pageNum: 1, pageSize: 30, total: 0 },
      dataset: [
      ]
    }
  },
  computed: {
    filtered() {
      const source = Array.isArray(this.serverAll) ? this.serverAll : this.dataset
      return source.filter(row => {
        const byGender = this.filters.gender ? (this.toIntGender(row.gender) === this.filters.gender) : true
        const byType = this.filters.pathology ? this.matchPathology(this.filters.pathology, row.pathology) : true
        const byStage = this.filters.stage ? row.stage === this.filters.stage : true
        const byMutation = this.filters.geneType ? this.matchGene(this.filters.geneType, row.gene) : true
        let byTreatments = true
        const selectedTreats = this.filters.treatments || []
        if (selectedTreats.length) {
          if (selectedTreats.includes('na')) {
            const keys = ['singleChemo', 'immunoChemo', 'targetedTherapy', 'adjuvantChemo']
            byTreatments = keys.every(k => !this.toBool(row[k]))
          } else {
            byTreatments = selectedTreats.every(key => this.toBool(row[key]))
          }
        }
        const byAge = row.age >= this.filters.ageRange[0] && row.age <= this.filters.ageRange[1]
        const byRecist = this.matchRecist(this.filters.recist, row.efficacy)
        return byGender && byType && byStage && byMutation && byTreatments && byAge && byRecist
      })
    },
    tableData() {
      // 前端分页：对 filtered 结果进行切片
      const start = (this.page.pageNum - 1) * this.page.pageSize
      const end = start + this.page.pageSize
      return this.filtered.slice(start, end)
    }
  },
  methods: {
    matchPathology(filterVal, rowVal) {
      if (!filterVal) return true
      const fv = String(filterVal).trim()
      const rv = rowVal == null ? '' : String(rowVal).trim()
      const aliasMap = {
        '肺鳞癌': ['鳞癌', '肺鳞癌'],
        '肺腺癌': ['腺癌', '肺腺癌'],
        '小细胞肺癌': ['小细胞', '小细胞癌', '小细胞肺癌']
      }
      if (fv === '其他') {
        const excludes = ([]).concat(...Object.values(aliasMap))
        return !excludes.includes(rv)
      }
      const aliases = aliasMap[fv] || [fv]
      return aliases.includes(rv)
    },
    matchRecist(filterList, rowVal) {
      if (!filterList || !filterList.length) return true
      const v = rowVal == null ? '' : String(rowVal).trim().toUpperCase()
      return filterList.some(f => {
        const t = String(f).trim().toUpperCase()
        if (t === 'NA') {
          // NA 仅代表数值 0
          return rowVal === 0 || String(rowVal).trim() === '0'
        }
        return v.startsWith(t)
      })
    },
    matchGene(filterVal, rowVal) {
      if (!filterVal) return true
      // 无突变严格匹配为数值 0 或字符串 '0'
      if (filterVal === '无突变') {
        return rowVal === 0 || String(rowVal).trim() === '0'
      }
      const f = String(filterVal).trim().toUpperCase()
      const r = rowVal == null ? '' : String(rowVal).trim().toUpperCase()
      // 仅按整字段前缀匹配（开头匹配即可）
      return r.startsWith(f)
    },
    toBool(val) {
      if (typeof val === 'boolean') return val
      if (typeof val === 'number') return val !== 0
      if (typeof val === 'string') {
        const s = val.trim().toLowerCase()
        return ['1', 'true', 'yes', 'y', 't', '是'].includes(s)
      }
      return !!val
    },
    toIntGender(val) {
      if (typeof val === 'number') return val
      if (typeof val === 'string') {
        const s = val.trim()
        if (s === '1' || s === '男' || s.toLowerCase() === 'male' || s === 'M') return 1
        if (s === '2' || s === '女' || s.toLowerCase() === 'female' || s === 'F') return 2
        const n = Number(s)
        return isNaN(n) ? null : n
      }
      return null
    },
    renderGender(val) {
      const g = this.toIntGender(val)
      if (g === 1) return '男'
      if (g === 2) return '女'
      return (val === undefined || val === null || val === '') ? '-' : String(val)
    },
    updateTableHeight() {
      const vh = window.innerHeight || document.documentElement.clientHeight || 800
      // 通过测量结果区域可用空间，精确计算表格高度，减少底部空白
      this.$nextTick(() => {
        const body = this.$refs.resultsBody
        if (!body) {
          // 回退策略
          const fallback = Math.max(500, vh - 220)
          this.tableHeight = fallback
          return
        }
        const top = body.getBoundingClientRect().top || 180
        const actionsH = (this.$refs.resultsActions && this.$refs.resultsActions.offsetHeight) ? this.$refs.resultsActions.offsetHeight : 0
        const paginationH = (this.$refs.resultsPagination && this.$refs.resultsPagination.$el && this.$refs.resultsPagination.$el.offsetHeight) ? this.$refs.resultsPagination.$el.offsetHeight : 0
        const parent = body.parentElement
        const pb = parent ? parseFloat((window.getComputedStyle(parent).paddingBottom || '0').replace('px','')) : 0
        const extra = 12
        const h = Math.max(420, vh - top - actionsH - paginationH - pb - extra)
        this.tableHeight = h
      })
    },
    async applyFilters() {
      this.page.pageNum = 1
      this.$message.success('Filters applied')
    },
    async loadData() {
      this.loading = true
      try {
        const size = 200
        const first = await listAPI.getSomeRecords({
          keyWords: 'PatientRecord',
          searchKey: {},
          pageInfo: { page: 1, size },
        })
        const firstList = first?.data?.content || []
        const total = (first?.data?.totalElements !== undefined) ? first.data.totalElements : firstList.length
        const totalPages = Math.max(1, Math.ceil(total / size))
        let all = firstList
        for (let p = 2; p <= totalPages; p++) {
          const res = await listAPI.getSomeRecords({
            keyWords: 'PatientRecord',
            pageInfo: { page: p, size },
            searchKey: {},
          })
          const pageList = res?.data?.content || []
          all = all.concat(pageList)
        }
        // 直接保留后端字段，便于表格直接展示
        this.serverAll = all
        this.page.total = this.filtered.length
      } catch (e) {
        // 后端未就绪或接口不匹配，回退到本地示例数据
        this.serverAll = null
      } finally {
        this.loading = false
      }
    },
    onSelectionChange(rows) {
      this.selectedRows = rows
    },
    exportSelected() {
      if (!this.selectedRows.length) {
        this.$message.warning('Please select at least one sample')
        return
      }
      // TODO: 对接导出逻辑，此处先打印
      console.log('Exporting rows:', this.selectedRows)
      this.$message.success(`Exported ${this.selectedRows.length} samples`)
    },
    async onPageChange(p) {
      this.page.pageNum = p
    },
    async onPageSizeChange(size) {
      this.page.pageSize = size
      this.page.pageNum = 1
    }
  },
  mounted() {
    this.updateTableHeight()
    this.loadData()
    window.addEventListener('resize', this.updateTableHeight)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.updateTableHeight)
  }
}
</script>

<style lang="scss" scoped>
.search-page {
  /* 医疗数据检索风格：清爽、专业、对比清晰 */
  --bg: #f7f9fc;              /* 页面背景 */
  --surface: #ffffff;         /* 卡片/表面 */
  --border: #e5e7eb;          /* 边框 */
  --text: #1f2937;            /* 正文文本 */
  --muted: #6b7280;           /* 次级文本 */
  --primary: #2b6cb0;         /* 医疗蓝主色 */
  --accent: #2c7a7b;          /* 青色辅助 */

  color: var(--text);
  background: var(--bg);
  min-height: 100vh;
  padding: 24px 32px;
}
.search-header {
  width: 100%;
  margin: 0 0 12px;
}
.search-header h1 { font-size: 24px; margin: 0 0 6px; }
.search-header p { opacity: .85; margin: 0; }

.search-body {
  width: 100%;
  display: grid;
  grid-template-columns: 360px 1fr;
  gap: 20px;
}

.section-title { font-weight: 700; margin-bottom: 8px; color: var(--text); }
.filters { background: var(--surface); border: 1px solid var(--border); }
.results { background: var(--surface); border: 1px solid var(--border); }
.results .el-card__body { display: flex; flex-direction: column; height: 100%; }
.filters-form { margin-top: 8px; }
.form-group { margin-bottom: 12px; }
.group-title { font-weight: 600; margin-bottom: 6px; color: var(--muted); }
.apply { margin-top: 8px; }
.results-top { margin-bottom: 8px; }
.results-actions { margin-top: 10px; text-align: right; }
.results-pagination { margin-top: 10px; }
.heatmap-thumb { height: 44px; border-radius: 6px; background: linear-gradient(90deg, #3b82f6, #14b8a6, #f59e0b, #ef4444); filter: saturate(1.05) contrast(1.05); }

/* 学术风格：提高信息密度与可读性 */
.results ::v-deep .el-table { font-size: 13px; color: var(--text); }
.results ::v-deep .el-table .cell { padding: 0 8px; }
.results ::v-deep .el-table td, .results ::v-deep .el-table th { padding: 6px 8px; }
.results ::v-deep .el-table th { background: #f3f4f6; color: #374151; }
.results ::v-deep .el-table__body tr:hover > td { background: #f9fafb; }
.results ::v-deep .el-table .current-row > td { background: #eef2ff; }

/* 按钮在本页使用医疗蓝主色 */
.search-page ::v-deep .el-button--primary { background-color: var(--primary); border-color: var(--primary); }
.search-page ::v-deep .el-button--primary:focus, 
.search-page ::v-deep .el-button--primary:hover { filter: brightness(1.05); }

/* 左侧过滤面板粘性定位，便于在长列表中保持可见 */
.filters { position: sticky; top: 16px; align-self: start; height: calc(100vh - 16px - 32px); overflow: auto; }

@media (max-width: 960px) {
  .search-body { grid-template-columns: 1fr; }
}
</style>
