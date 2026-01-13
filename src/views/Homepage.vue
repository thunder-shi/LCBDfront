<template>
  <div class="homepage">
    <header class="nav">
      <div class="brand">
        <span class="logo">LCBD</span>
        <span class="title">Lung Cancer Breathomics Database</span>
      </div>
      <nav class="links">
        <a href="#">Home</a>
        <a href="#">Search Database</a>
        <a href="#">About Us</a>
        <a href="#">API Docs</a>
      </nav>
      <div class="actions">
        <button class="btn btn-accent">Login/Register</button>
      </div>
    </header>

    <section class="hero" :style="heroStyle">
      <div class="hero-content">
        <h1>UNLOCKING BREATH. REVOLUTIONIZE LUNG CANCER CARE.</h1>
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
        <div class="feature-thumb" />
      </div>
      <div class="feature">
        <h3>AI-powered Insights</h3>
        <p>Predict diagnosis & treatment response with advanced ML models.</p>
        <div class="feature-thumb" />
      </div>
      <div class="feature">
        <h3>Integrated Data Analysis</h3>
        <p>Seamless data integration & analysis for deeper biological context.</p>
        <div class="feature-thumb" />
      </div>
    </section>

    <section class="data-grid">
      <h2>Key Data Fields at Glance</h2>
      <div class="cards">
        <div class="card">
          <h4>Patient Demographics</h4>
          <ul>
            <li>Age</li>
            <li>Gender</li>
            <li>Smoking Status</li>
          </ul>
        </div>
        <div class="card">
          <h4>Clinical Oncology</h4>
          <ul>
            <li>TNM Stage</li>
            <li>Mutation Status</li>
            <li>Treatment</li>
          </ul>
        </div>
        <div class="card">
          <h4>Treatment Outcome</h4>
          <ul>
            <li>Response (RECIST)</li>
            <li>Progression-free Survival</li>
          </ul>
        </div>
        <div class="card">
          <h4>Breathomics Data</h4>
          <ul>
            <li>GC-MS Header</li>
            <li>VOC Panel</li>
            <li>Normalization</li>
          </ul>
        </div>
        <div class="card">
          <h4>Analytical Parameters</h4>
          <ul>
            <li>Sample Prep</li>
            <li>MS Settings</li>
          </ul>
        </div>
        <div class="card">
          <h4>External Links</h4>
          <ul>
            <li>Bioportal</li>
            <li>PubMed</li>
          </ul>
        </div>
      </div>
    </section>

    <section class="cta">
      <h2>Ready for advanced Breathomics Research?</h2>
      <button class="btn btn-primary">Join LCBD Today!</button>
    </section>

    <footer class="footer">
      <div class="footer-inner">
        <div class="brand">LCBD - Lung Cancer Breathomics Database</div>
        <div class="links">
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
    return {}
  },
  computed: {
    heroStyle() {
      try {
        const img = require('@/assets/img/homepage.png')
        return { backgroundImage: `url(${img})` }
      } catch (e) {
        return {}
      }
    }
  },
  methods: {
    navigateToSearch() {
      this.$router.push({ name: 'Search' })
    }
  }
}
</script>

<style lang="scss" scoped>
.homepage {
  color: #e6eef6;
  background: #0f172a;
  min-height: 100vh;
}

.nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 24px;
  background: #1f2937;
  border-bottom: 1px solid rgba(255,255,255,0.08);
}
.brand { display: flex; align-items: center; gap: 10px; }
.logo { background:#22d3ee; color:#0b1020; font-weight:700; padding:4px 8px; border-radius:6px; }
.title { opacity: 0.9; }
.links a { color:#cbd5e1; margin:0 10px; text-decoration:none; }
.links a:hover { color:#fff; }
.actions { display:flex; align-items:center; }

.hero {
  background: linear-gradient(135deg, rgba(20,30,48,0.9), rgba(36,59,85,0.9));
  background-size: cover;
  background-position: center;
  padding: 60px 24px;
  position: relative;
}
.hero::after {
  content: '';
  position: absolute; inset: 0; 
  background: radial-gradient(1000px 400px at 30% 20%, rgba(56,189,248,0.15), transparent);
  pointer-events:none;
}
.hero-content { max-width: 1100px; margin: 0 auto; position: relative; z-index:1; }
.hero h1 { font-size: 32px; line-height: 1.25; margin: 0 0 20px; letter-spacing: 0.5px; }
.hero-actions { display:flex; gap:12px; }

.btn { 
  padding: 10px 16px; border-radius:8px; border:0; cursor:pointer; 
  font-weight:600; transition: all .2s ease; 
}
.btn-primary { background:#3b82f6; color:#fff; }
.btn-primary:hover { background:#2563eb; }
.btn-green { background:#22c55e; color:#06220f; }
.btn-green:hover { background:#16a34a; }
.btn-accent { background:#34d399; color:#0a1a13; }

.features { 
  display:grid; grid-template-columns: repeat(3, 1fr); gap:16px; 
  max-width: 1100px; margin: 24px auto; 
}
.feature { background:#111827; border:1px solid rgba(255,255,255,0.06); border-radius:12px; padding:16px; }
.feature h3 { margin:0 0 8px; font-size:18px; }
.feature p { margin:0 0 12px; color:#a0aec0; }
.feature-thumb { height:120px; background: linear-gradient(135deg, #0b132b, #1c2541); border-radius:10px; }

.data-grid { max-width: 1100px; margin: 24px auto; }
.data-grid h2 { font-size:22px; margin-bottom: 14px; }
.cards { display:grid; grid-template-columns: repeat(3, 1fr); gap:14px; }
.card { background:#0b1220; border:1px solid rgba(255,255,255,0.07); border-radius:12px; padding:14px; }
.card h4 { margin:0 0 8px; font-size:16px; }
.card ul { margin:0; padding-left:18px; color:#a3b1c6; }

.cta { text-align:center; padding:30px 16px; background:#111827; margin-top: 28px; }
.cta h2 { margin:0 0 12px; }

.footer { background:#0b1020; border-top:1px solid rgba(255,255,255,0.06); margin-top: 24px; }
.footer-inner { max-width:1100px; margin:0 auto; display:flex; justify-content:space-between; align-items:center; padding:14px 0; }
.footer .links a { color:#a3b1c6; margin-left:12px; text-decoration:none; }
.footer .links a:hover { color:#fff; }

@media (max-width: 960px) {
  .features { grid-template-columns: 1fr; }
  .cards { grid-template-columns: 1fr; }
  .nav { flex-wrap: wrap; gap:12px; }
}
</style>
