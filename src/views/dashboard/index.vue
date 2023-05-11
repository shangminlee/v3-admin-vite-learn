<template>
  <div style="height: 600px; display: flex; justify-content: center; align-items: center">{{ title }}</div>
</template>

<script setup lang="ts">
import { ref } from "vue"

const title = ref("首页")
</script>
