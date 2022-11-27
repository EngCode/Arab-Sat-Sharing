<script setup>
  defineProps({ competition: { type: Object, required: true } });
  const isMatchesVisible = ref(true);

  const imgUrl = useImageUrl();
</script>

<template>
  <div v-auto-animate>
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-2">
        <BaseImg :src="imgUrl.getCompetitionUrl(competition.name)" width="32" />
        <h2 class="text-xl font-medium text-blue-300 dark:text-blue-200">
          {{ competition.name }}
        </h2>
      </div>

      <div class="flex items-center gap-2">
        <div
          class="grid h-3 w-3 place-content-center rounded-full bg-blue-300 p-3 text-sm font-semibold text-white dark:bg-blue-200"
        >
          <p>{{ competition.matches.length }}</p>
        </div>

        <BaseToggleButton v-model:is-active="isMatchesVisible" />
      </div>
    </div>

    <MatchWrapper :matches="competition.matches" v-if="isMatchesVisible" />
  </div>
</template>
