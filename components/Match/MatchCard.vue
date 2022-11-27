<script setup>
  defineProps({ fixture: { type: Object, required: true } });
</script>

<template>
  <div class="flex flex-col gap-2 rounded bg-gray-100 p-4 dark:bg-blue-500">
    <MatchCompetition :competition="fixture.competition" />
    <MatchHeading :teams="fixture.match" :time="fixture.time" />
    <MatchBeIN :bein-channels="fixture.channels.beinMENA" />
    <MatchChannels :channels="fixture.channels.others" />
  </div>
</template>
