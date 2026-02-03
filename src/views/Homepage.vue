<template>
  <div class="homepage">
    <header class="nav">
      <div class="nav-inner">
        <div class="brand">
          <div class="logo">LCBD</div>
          <span class="title">Lung Cancer Breathomics Database</span>
        </div>
        <nav class="links">
          <a href="#">Home</a>
          <a href="#">Search Database</a>
          <a href="#">About Us</a>
          <a href="#">API Docs</a>
        </nav>
        <div class="actions">
          <button class="btn btn-accent" @click="navigateToLogin">Login/Register</button>
        </div>
      </div>
    </header>

    <section class="hero" :style="heroStyle">
      <div class="hero-content">
        <h1>UNLOCKING BREATH.<br>REVOLUTIONIZE LUNG CANCER CARE.</h1>
        <div class="hero-actions">
          <button class="btn btn-primary" @click="navigateToSearch">Explore Database</button>
          <button class="btn btn-green">Run AI Diagnostics</button>
        </div>
      </div>
    </section>

    <section class="features">
      <div class="feature">
        <h3>Multi-dimensional Search</h3>
        <p>Explore patient cohorts by clinical, demographics & treatment parameters.</p>
        <div class="feature-thumb feature-thumb-1" />
      </div>
      <div class="feature">
        <h3>AI-powered Insights</h3>
        <p>Predict diagnosis & treatment response with advanced ML models.</p>
        <div class="feature-thumb feature-thumb-2" />
      </div>
      <div class="feature">
        <h3>Integrated Data Analysis</h3>
        <p>Seamless data integration & analysis for deeper biological context.</p>
        <div class="feature-thumb feature-thumb-3" />
      </div>
    </section>

    <section class="data-grid">
      <div class="section-header">
        <h2>Key Data Fields at Glance</h2>
        <div class="header-line"></div>
      </div>
      
      <div class="cards">
        <div class="card" v-for="(item, index) in cardData" :key="index">
          <div class="card-header">
            <h4>{{ item.title }}</h4>
          </div>
          <ul>
            <li v-for="list in item.list" :key="list">{{ list }}</li>
          </ul>
        </div>
      </div>
    </section>

    <section class="cta">
      <h2>Ready for advanced Breathomics Research?</h2>
      <button class="btn btn-primary btn-large">Join LCBD Today!</button>
    </section>

    <footer class="footer">
      <div class="footer-inner">
        <div class="footer-brand">LCBD - Lung Cancer Breathomics Database</div>
        <div class="footer-links">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
          <a href="#">Contact Us</a>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'Homepage',
  data() {
    return {
      cardData: [
        { title: 'Patient Demographics', list: ['Age', 'Gender', 'Smoking Status'] },
        { title: 'Clinical Oncology', list: ['TNM Stage', 'Mutation Status', 'Treatment'] },
        { title: 'Treatment Outcome', list: ['Response (RECIST)', 'Progression-free Survival'] },
        { title: 'Breathomics Data', list: ['GC-MS Header', 'VOC Panel', 'Normalization'] },
        { title: 'Analytical Parameters', list: ['Sample Prep', 'MS Settings'] },
        { title: 'External Links', list: ['Bioportal', 'PubMed'] }
      ]
    }
  },
  computed: {
    heroStyle() {
      try {
        // 确保你的图片路径正确，背景色设为纯白以实现无缝融合
        const img = require('@/assets/img/homepage.png')
        return { 
          backgroundImage: `url(${img})`,
          backgroundColor: '#ffffff'
        }
      } catch (e) {
        return { backgroundColor: '#ffffff' }
      }
    }
  },
  methods: {
    navigateToSearch() { this.$router.push({ name: 'Search' }) },
    navigateToLogin() { this.$router.push({ name: 'Login' }) }
  }
}
</script>

<style lang="scss" scoped>
/* 样式变量定义 */
$content-width: 1320px;
$primary-blue: #3b82f6;
$text-dark: #111827;
$text-gray: #4b5563;
$border-color: #e5e7eb;

.homepage {
  font-family: 'Inter', -apple-system, sans-serif;
  color: $text-dark;
  background: #fcfdfe;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* 导航栏：完美对齐 */
.nav {
  background: #ffffff;
  border-bottom: 1px solid $border-color;
  position: sticky;
  top: 0;
  z-index: 100;
  
  .nav-inner {
    max-width: $content-width;
    margin: 0 auto;
    height: 72px;
    padding: 0 40px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}

.brand {
  display: flex;
  align-items: center;
  gap: 12px;
  .logo {
    background: #22d3ee;
    color: #0b1020;
    font-weight: 800;
    padding: 6px 10px;
    border-radius: 8px;
    font-size: 18px;
  }
  .title {
    font-size: 19px;
    font-weight: 600;
    color: $text-dark;
  }
}

.links a {
  color: $text-gray;
  margin-left: 32px;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s;
  &:hover { color: $primary-blue; }
}

/* Hero 区域：解决背景裁剪与对齐 */
.hero {
  min-height: 520px;
  background-position: center center;
  background-repeat: no-repeat;
  background-size: contain; /* 关键：显示完整图片 */
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 60px 40px;
  border-bottom: 1px solid $border-color;

  .hero-content {
    max-width: 900px;
    h1 {
      font-size: 52px;
      font-weight: 800;
      line-height: 1.15;
      letter-spacing: -0.02em;
      margin-bottom: 32px;
      text-shadow: 0 4px 12px rgba(255,255,255,0.8);
    }
    .hero-actions {
      display: flex;
      gap: 20px;
      justify-content: center;
    }
  }
}

/* 功能区：间距优化 */
.features {
  max-width: $content-width;
  margin: 60px auto;
  padding: 0 40px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 32px;

  .feature {
    background: #ffffff;
    padding: 32px;
    border-radius: 20px;
    border: 1px solid $border-color;
    box-shadow: 0 2px 10px rgba(0,0,0,0.02);
    transition: all 0.3s ease;
    
    &:hover { transform: translateY(-6px); box-shadow: 0 12px 30px rgba(0,0,0,0.06); }
    
    h3 { font-size: 24px; margin-bottom: 12px; font-weight: 700; }
    p { font-size: 16px; color: $text-gray; line-height: 1.6; margin-bottom: 24px; }
    .feature-thumb {
      height: 120px;
      border-radius: 12px;
      &.feature-thumb-1 { background: linear-gradient(135deg, #eff6ff, #dbeafe); }
      &.feature-thumb-2 { background: linear-gradient(135deg, #f0fdf4, #dcfce7); }
      &.feature-thumb-3 { background: linear-gradient(135deg, #fefce8, #fef9c3); }
    }
  }
}

/* 数据网格区：解决“太窄”问题 */
.data-grid {
  max-width: $content-width;
  margin: 80px auto;
  padding: 0 40px;

  .section-header {
    text-align: center;
    margin-bottom: 50px;
    h2 { font-size: 34px; font-weight: 800; margin-bottom: 12px; }
    .header-line { width: 60px; height: 4px; background: $primary-blue; margin: 0 auto; border-radius: 2px; }
  }

  .cards {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 30px;
  }

  .card {
    background: #fff;
    padding: 36px;
    border-radius: 20px;
    border: 1px solid #edf2f7;
    box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);
    transition: 0.3s;
    
    &:hover { border-color: $primary-blue; box-shadow: 0 10px 25px rgba(59,130,246,0.1); }

    .card-header h4 {
      font-size: 21px;
      font-weight: 700;
      color: $text-dark;
      margin-bottom: 20px;
      border-left: 5px solid #22d3ee;
      padding-left: 15px;
    }

    ul {
      list-style: none;
      padding: 0;
      li {
        font-size: 16px;
        color: $text-gray;
        padding: 8px 0;
        border-bottom: 1px solid #f9fafb;
        &:last-child { border-bottom: none; }
        &::before { content: "•"; color: $primary-blue; font-weight: bold; display: inline-block; width: 1em; }
      }
    }
  }
}

/* 其他通用样式 */
.cta {
  background: #fff;
  padding: 100px 40px;
  text-align: center;
  border-top: 1px solid $border-color;
  h2 { font-size: 32px; margin-bottom: 30px; }
}

.btn {
  padding: 14px 32px;
  border-radius: 12px;
  font-weight: 600;
  font-size: 16px;
  cursor: pointer;
  border: none;
  transition: all 0.2s;
  
  &-primary { background: $primary-blue; color: #fff; &:hover { background: #2563eb; transform: scale(1.02); } }
  &-green { background: #10b981; color: #fff; &:hover { background: #059669; } }
  &-accent { background: #f3f4f6; color: $text-dark; &:hover { background: #e5e7eb; } }
  &-large { padding: 18px 48px; font-size: 18px; }
}

.footer {
  background: #fff;
  border-top: 1px solid $border-color;
  padding: 40px 0;
  margin-top: auto;
  .footer-inner {
    max-width: $content-width;
    margin: 0 auto;
    padding: 0 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #9ca3af;
    font-size: 15px;
    .footer-links a { color: #9ca3af; margin-left: 24px; text-decoration: none; &:hover { color: $text-dark; } }
  }
}

/* 响应式适配 */
@media (max-width: 1200px) {
  .features, .data-grid .cards { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 768px) {
  .nav-inner { flex-direction: column; height: auto; padding: 20px; }
  .features, .data-grid .cards { grid-template-columns: 1fr; }
  .hero h1 { font-size: 36px; }
  .hero { min-height: 400px; }
}
</style>