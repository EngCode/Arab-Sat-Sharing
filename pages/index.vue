<script setup>
  const { data } = await useFetch('/fixtures');
</script>

<template>
  <div>
    <p>Nuxt with Playwright Demo</p>
    <p>{{ data }}</p>
  </div>
</template>
