<template>
  <div class="stats main-layout">
    <ValueChart/>
    <AvgChart/>
  </div>
</template>



<script>
import ValueChart from "@/cmps/value-chart.vue"
import AvgChart from "@/cmps/avg-chart.vue"

export default {
  components: {
    ValueChart,
    AvgChart,
  },
}
</script>