<script setup>
  defineProps({
    teams: { type: Object, required: true },
    time: { type: Object, required: true },
  });

  const imgUrl = useImageUrl();
</script>

<template>
  <div class="match-heading">
    <div class="team team--home">
      <p class="font-lg font-medium">{{ teams.homeTeam }}</p>
      <BaseImg :src="imgUrl.getTeamUrl(teams.homeTeam)" width="24" />
    </div>

    <span class="time">{{ time.full }}</span>

    <div class="team team--away">
      <p class="font-lg font-medium">{{ teams.awayTeam }}</p>
      <BaseImg :src="imgUrl.getTeamUrl(teams.awayTeam)" width="24" />
    </div>
  </div>
</template>

<style scoped lang="scss">
  .match-heading {
    @apply my-2 grid items-center gap-x-3 gap-y-1.5;

    grid-template-areas:
      'home home time'
      'away away time';

    @media (min-width: 480px) {
      grid-template-areas: 'home home home home home home time away away away away away away';
    }
  }

  .team {
    @apply flex items-center justify-between gap-2 2xs:justify-end;

    &--home {
      @apply [grid-area:home];
    }

    &--away {
      @apply [grid-area:away] 2xs:flex-row-reverse;
    }
  }

  .time {
    @apply text-center font-semibold text-gray-300 [grid-area:time] dark:text-blue-100;
  }
</style>
