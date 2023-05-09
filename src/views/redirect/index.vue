import { useRoute, useRouter } from 'vue-router';
<template>
  <div />
</template>

<script setup lang="ts">
import { useRoute, useRouter } from "vue-router"

const route = useRoute()
const router = useRouter()

router.replace({ path: "/" + route.params.path, query: route.query })
</script>
