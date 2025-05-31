<template>
  <div class="admin-emails">
    <div class="admin-container">
      <h1 class="admin-title">📧 Collected Emails</h1>
      
      <div class="stats-cards">
        <div class="stat-card">
          <div class="stat-number">{{ emails.length }}</div>
          <div class="stat-label">Total Emails</div>
        </div>
        <div class="stat-card">
          <div class="stat-number">{{ funnelStats.length }}</div>
          <div class="stat-label">Funnels Used</div>
        </div>
      </div>

      <div class="emails-section">
        <div class="section-header">
          <h2>Email List</h2>
          <div class="actions">
            <button @click="exportEmails" class="export-btn">📥 Export CSV</button>
            <button @click="clearEmails" class="clear-btn">🗑️ Clear All</button>
          </div>
        </div>

        <div v-if="emails.length === 0" class="empty-state">
          <p>No emails collected yet. Start promoting your funnels!</p>
        </div>

        <div v-else class="emails-table">
          <div class="table-header">
            <div class="col-email">Email</div>
            <div class="col-funnel">Funnel</div>
            <div class="col-date">Date</div>
          </div>
          
          <div 
            v-for="(email, index) in sortedEmails" 
            :key="index"
            class="table-row"
          >
            <div class="col-email">{{ email.email }}</div>
            <div class="col-funnel">{{ email.funnelTitle || email.funnelId }}</div>
            <div class="col-date">{{ formatDate(email.timestamp) }}</div>
          </div>
        </div>
      </div>

      <div class="funnel-stats">
        <h3>📊 Funnel Performance</h3>
        <div class="funnel-cards">
          <div 
            v-for="stat in funnelStats" 
            :key="stat.funnelId"
            class="funnel-card"
          >
            <div class="funnel-name">{{ stat.funnelTitle || stat.funnelId }}</div>
            <div class="funnel-count">{{ stat.count }} emails</div>
          </div>
        </div>
      </div>

      <div class="back-section">
        <router-link to="/funnels" class="back-btn">← Back to Funnels</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AdminEmails',
  data() {
    return {
      emails: []
    }
  },
  computed: {
    sortedEmails() {
      return [...this.emails].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
    },
    funnelStats() {
      const stats = {}
      this.emails.forEach(email => {
        const key = email.funnelId
        if (!stats[key]) {
          stats[key] = {
            funnelId: email.funnelId,
            funnelTitle: email.funnelTitle,
            count: 0
          }
        }
        stats[key].count++
      })
      return Object.values(stats).sort((a, b) => b.count - a.count)
    }
  },
  mounted() {
    this.loadEmails()
  },
  methods: {
    loadEmails() {
      try {
        const stored = localStorage.getItem('captured_leads')
        this.emails = stored ? JSON.parse(stored) : []
        console.log('📧 Loaded emails:', this.emails)
      } catch (error) {
        console.error('Error loading emails:', error)
        this.emails = []
      }
    },
    formatDate(timestamp) {
      if (!timestamp) return 'Unknown'
      return new Date(timestamp).toLocaleDateString() + ' ' + new Date(timestamp).toLocaleTimeString()
    },
    exportEmails() {
      if (this.emails.length === 0) {
        alert('No emails to export')
        return
      }

      const csvContent = [
        'Email,Funnel ID,Funnel Title,Date',
        ...this.emails.map(email => 
          `"${email.email}","${email.funnelId || ''}","${email.funnelTitle || ''}","${email.timestamp || ''}"`
        )
      ].join('\n')

      const blob = new Blob([csvContent], { type: 'text/csv' })
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `email-leads-${new Date().toISOString().split('T')[0]}.csv`
      a.click()
      window.URL.revokeObjectURL(url)
    },
    clearEmails() {
      if (confirm('Are you sure you want to clear all collected emails? This cannot be undone.')) {
        localStorage.removeItem('captured_leads')
        this.emails = []
        console.log('🗑️ All emails cleared')
      }
    }
  }
}
</script>

<style scoped>
.admin-emails {
  background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
  color: #ffffff;
  min-height: 100vh;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.admin-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.admin-title {
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 2rem;
  color: #60a5fa;
}

.stats-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
}

.stat-card {
  background: rgba(255, 255, 255, 0.05);
  padding: 1.5rem;
  border-radius: 12px;
  text-align: center;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.stat-number {
  font-size: 2rem;
  font-weight: bold;
  color: #60a5fa;
}

.stat-label {
  color: #ccc;
  margin-top: 0.5rem;
}

.emails-section {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.section-header h2 {
  margin: 0;
  color: #60a5fa;
}

.actions {
  display: flex;
  gap: 1rem;
}

.export-btn, .clear-btn {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9rem;
}

.export-btn {
  background: #10b981;
  color: white;
}

.clear-btn {
  background: #ef4444;
  color: white;
}

.empty-state {
  text-align: center;
  padding: 2rem;
  color: #ccc;
}

.emails-table {
  background: rgba(0, 0, 0, 0.3);
  border-radius: 8px;
  overflow: hidden;
}

.table-header, .table-row {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  gap: 1rem;
  padding: 1rem;
}

.table-header {
  background: rgba(96, 165, 250, 0.2);
  font-weight: bold;
  color: #60a5fa;
}

.table-row {
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.table-row:last-child {
  border-bottom: none;
}

.col-email {
  word-break: break-all;
}

.funnel-stats {
  margin-bottom: 2rem;
}

.funnel-stats h3 {
  color: #60a5fa;
  margin-bottom: 1rem;
}

.funnel-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
}

.funnel-card {
  background: rgba(255, 255, 255, 0.05);
  padding: 1rem;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.funnel-name {
  font-weight: bold;
  margin-bottom: 0.5rem;
}

.funnel-count {
  color: #60a5fa;
  font-size: 1.2rem;
}

.back-section {
  text-align: center;
}

.back-btn {
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
  padding: 1rem 2rem;
  border-radius: 8px;
  text-decoration: none;
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: background 0.3s ease;
}

.back-btn:hover {
  background: rgba(255, 255, 255, 0.2);
}

@media (max-width: 768px) {
  .table-header, .table-row {
    grid-template-columns: 1fr;
    gap: 0.5rem;
  }
  
  .section-header {
    flex-direction: column;
    align-items: stretch;
    gap: 1rem;
  }
  
  .actions {
    justify-content: center;
  }
}
</style> 