<script setup>
  defineProps({ competition: { type: Object, required: true } });

  const imgUrl = useImageUrl();
</script>

<template>
  <div class="flex items-center gap-2">
    <BaseImg :src="imgUrl.getCompetitionUrl(competition.name)" width="24" />
    <p>{{ competition.name }} - {{ competition.stage }}</p>
  </div>
</template>
