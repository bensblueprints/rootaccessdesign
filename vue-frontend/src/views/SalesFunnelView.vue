<template>
  <div class="sales-funnel-view">
    <SalesFunnel :funnelId="$route.params.funnelId" />
  </div>
</template>

<script>
import SalesFunnel from '@/components/SalesFunnel.vue'

export default {
  name: 'SalesFunnelView',
  components: {
    SalesFunnel
  }
}
</script>

<style scoped>
.sales-funnel-view {
  width: 100%;
  min-height: 100vh;
}
</style> 