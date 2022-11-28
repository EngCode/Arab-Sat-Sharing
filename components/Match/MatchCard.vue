<script setup>
  const props = defineProps({ match: { type: Object, required: true } });

  const mena = props.match.channels.mena;
  const free = props.match.channels.free;
  const encrypted = props.match.channels.encrypted;
</script>

<template>
  <div
    v-if="match"
    class="flex flex-col gap-2 rounded bg-gray-100 p-4 dark:bg-blue-500"
  >
    <MatchCompetition :competition="match.competition" />
    <MatchHeading :teams="match.teams" :time="match.time" />
    <MatchChannels :channels="mena"> القنوات العربية </MatchChannels>
    <MatchChannels :channels="free"> القنوات المجانية </MatchChannels>
    <MatchChannels :channels="encrypted"> القنوات المشفرة </MatchChannels>
  </div>
</template>
