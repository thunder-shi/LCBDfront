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
        <div class="section-title">Search Results & Visualization</div>
        <div class="results-top">
          <h3>Total Samples Found: {{ Array.isArray(serverList) ? page.total : filtered.length }}</h3>
        </div>
        <el-table :data="tableData" border :height="tableHeight" @selection-change="onSelectionChange" v-loading="loading">
          <el-table-column type="selection" width="48" />
          <el-table-column prop="id" label="Patient ID" width="120" />
          <el-table-column prop="cancerType" label="Cancer Type" width="160" />
          <el-table-column prop="mutation" label="Mutation" width="120" />
          <el-table-column prop="metaboliteA" label="Metabolite A (μg/μl)" width="180" />
          <el-table-column label="Heatmap">
            <template slot-scope="{ row }">
              <div class="heatmap-thumb" :title="row.id"></div>
            </template>
          </el-table-column>
        </el-table>
        <div class="results-actions">
          <el-button type="primary" @click="exportSelected">Export Selected to MetaboAnalyst</el-button>
        </div>
        <el-pagination v-if="Array.isArray(serverList)"
          class="results-pagination"
          background
          layout="prev, pager, next, jumper, sizes, total"
          :current-page="page.pageNum"
          :page-size="page.pageSize"
          :page-sizes="[10,20,50]"
          :total="Array.isArray(serverList) ? page.total : tableData.length"
          @current-change="onPageChange"
          @size-change="onPageSizeChange"
        />
      </el-card>
    </div>
  </div>
 </template>

<script>
import { searchPatients } from '@/api/patient'
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
          { label: '术后辅助化疗', value: 'adjuvantChemo' }
        ],
        recist: ['CR', 'PR', 'SD', 'PD']
      },
      selectedRows: [],
      tableHeight: 520,
      loading: false,
      serverList: null,
      page: { pageNum: 1, pageSize: 20, total: 0 },
      dataset: [
        { id: 'P-001', cancerType: 'Adenocarcinoma', tnmStage: 'II', mutation: 'EGFR', treatmentDays: 120, age: 62, recist: 'PR', metaboliteA: 3.5 },
        { id: 'P-002', cancerType: 'Squamous', tnmStage: 'III', mutation: 'KRAS', treatmentDays: 80, age: 55, recist: 'SD', metaboliteA: 12.5 },
        { id: 'P-003', cancerType: 'NSCLC', tnmStage: 'I', mutation: 'None', treatmentDays: 30, age: 48, recist: 'CR', metaboliteA: 5.6 },
        { id: 'P-004', cancerType: 'SCLC', tnmStage: 'IV', mutation: 'ALK', treatmentDays: 200, age: 67, recist: 'PD', metaboliteA: 15.7 },
        { id: 'P-005', cancerType: 'Adenocarcinoma', tnmStage: 'III', mutation: 'BRAF', treatmentDays: 60, age: 59, recist: 'PR', metaboliteA: 8.2 }
      ]
    }
  },
  computed: {
    filtered() {
      return this.dataset.filter(row => {
        const byType = this.filters.pathology ? row.cancerType === this.filters.pathology : true
        const byStage = this.filters.stage ? row.tnmStage === this.filters.stage : true
        const byMutation = this.filters.geneType ? row.mutation === this.filters.geneType : true
        const byDays = row.treatmentDays >= 0 && row.treatmentDays <= (this.filters.treatmentDays || 400)
        const byAge = row.age >= this.filters.ageRange[0] && row.age <= this.filters.ageRange[1]
        const byRecist = this.filters.recist.length ? this.filters.recist.includes(row.recist) : true
        return byType && byStage && byMutation && byDays && byAge && byRecist
      })
    },
    tableData() {
      // 优先使用后端返回的列表，否则回退到本地过滤
      return Array.isArray(this.serverList) ? this.serverList : this.filtered
    }
  },
  methods: {
    updateTableHeight() {
      const vh = window.innerHeight || document.documentElement.clientHeight || 800
      // 估算顶部标题与外边距高度，确保表格最小高度
      const reserved = 260
      const h = Math.max(380, vh - reserved)
      this.tableHeight = h
    },
    async applyFilters() {
      if (this.$store && this.$store.getters && this.$store.getters.token) {
        await this.loadData()
      }
      this.$message.success('Filters applied')
    },
    async loadData() {
      this.loading = true
      try {
        // 将前端筛选映射为后端入参
        const params = {
          pageNum: this.page.pageNum,
          pageSize: this.page.pageSize,
          pathology: this.filters.pathology || undefined,
          stage: this.filters.stage || undefined,
          t: this.filters.t || undefined,
          n: this.filters.n || undefined,
          m: this.filters.m || undefined,
          gender: this.filters.gender || undefined,
          geneLike: this.filters.geneType && this.filters.geneType !== '无突变' ? this.filters.geneType : (this.filters.geneType === '无突变' ? 'None' : undefined),
          ageMin: this.filters.ageRange[0],
          ageMax: this.filters.ageRange[1],
          efficacyList: this.filters.recist.length ? this.filters.recist : undefined
        }
        // 治疗方式布尔映射
        if (this.filters.treatments && this.filters.treatments.length) {
          this.filters.treatments.forEach(k => { params[k] = true })
        }
        const res = await searchPatients(params)
        const list = res?.data?.content || []
        const total = (res?.data?.totalElements !== undefined) ? res.data.totalElements : list.length
        // 映射为表格所需字段
        this.serverList = list.map(item => ({
          id: item.patientNo || item.exhaleNo || item.id || '-',
          cancerType: item.pathology || '-',
          tnmStage: item.stage || '-',
          mutation: item.gene || '-',
          age: item.age,
          recist: item.efficacy || '-',
          metaboliteA: item.metaboliteA // 若后端无该字段，则为 undefined
        }))
        this.page.total = total
      } catch (e) {
        // 后端未就绪或接口不匹配，回退到本地示例数据
        this.serverList = null
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
      await this.loadData()
    },
    async onPageSizeChange(size) {
      this.page.pageSize = size
      this.page.pageNum = 1
      await this.loadData()
    }
  },
  mounted() {
    this.updateTableHeight()
    // 初次加载仅在已登录时请求后端，避免未登录取 key 报错
    if (this.$store && this.$store.getters && this.$store.getters.token) {
      this.loadData()
    }
    window.addEventListener('resize', this.updateTableHeight)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.updateTableHeight)
  }
}
</script>

<style lang="scss" scoped>
.search-page {
  color: #e6eef6;
  background: #0f172a;
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
  grid-template-columns: 420px 1fr;
  gap: 20px;
}

.section-title { font-weight: 700; margin-bottom: 8px; }
.filters { background: #111827; border: 1px solid rgba(255,255,255,.08); }
.results { background: #111827; border: 1px solid rgba(255,255,255,.08); }
.results .el-card__body { display: flex; flex-direction: column; height: 100%; }
.filters-form { margin-top: 8px; }
.form-group { margin-bottom: 12px; }
.group-title { font-weight: 600; margin-bottom: 6px; opacity: .9; }
.apply { margin-top: 8px; }
.results-top { margin-bottom: 8px; }
.results-actions { margin-top: 10px; text-align: right; }
.results-pagination { margin-top: 10px; }
.heatmap-thumb { height: 44px; border-radius: 6px; background: linear-gradient(90deg, #0ea5e9, #22c55e, #f59e0b, #ef4444); filter: saturate(1.2) contrast(1.1); }

@media (max-width: 960px) {
  .search-body { grid-template-columns: 1fr; }
}
</style>
