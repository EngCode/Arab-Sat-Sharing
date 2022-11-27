<script setup>
  defineProps({ beinChannels: { type: Array, required: true } });
  const isBeinChannelsVisible = ref(false);

  const imgUrl = useImageUrl();
</script>

<template>
  <section
    v-auto-animate
    v-if="beinChannels.length"
    class="border-t border-gray-200 pt-2 dark:border-blue-400"
  >
    <div class="flex items-center justify-between gap-2 [direction:rtl]">
      <div>
        <Icon name="majesticons:tv-old-line" />
        <p class="mr-2 inline-block">قنوات beIN الشرق الأوسط</p>
      </div>

      <BaseToggleButton v-model:is-active="isBeinChannelsVisible" />
    </div>

    <div class="mt-2 flex flex-col gap-3" v-if="isBeinChannelsVisible">
      <div
        v-for="(channel, index) in beinChannels"
        :key="index"
        class="flex flex-col gap-2 2xs:flex-row 2xs:items-center 2xs:justify-between"
      >
        <div class="flex items-center gap-2">
          <BaseImg :src="imgUrl.getBeinChannelUrl(channel.name)" width="24" />
          <p>{{ channel.name }}</p>
        </div>

        <div
          v-if="channel.commentator"
          class="flex items-center gap-2 2xs:flex-row-reverse"
        >
          <Icon name="bi:mic" class="mx-1 2xs:m-0" />
          <p>{{ channel.commentator }}</p>
        </div>
      </div>
    </div>
  </section>
</template>
