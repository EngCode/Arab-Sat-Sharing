<script setup>
  defineProps({ channels: { type: Array, required: true } });
  const isChannelsVisible = ref(false);

  const isModalVisible = ref(false);
</script>

<template>
  <div
    v-auto-animate
    v-if="channels.length"
    class="border-t border-gray-200 pt-2 dark:border-blue-400"
  >
    <div class="flex items-center justify-between gap-2 [direction:rtl]">
      <div>
        <Icon name="majesticons:tv-old-line" />
        <p class="mr-2 inline-block">
          <slot />

          <button
            class="hover:text-blue-300 hover:transition-colors dark:hover:text-blue-200"
          >
            <Icon name="fe:info" size="14" @click="isModalVisible = true" />
          </button>
        </p>

        <BaseModal v-model:is-modal-visible="isModalVisible">
          <p class="caption">اضغط علي القناة لمعرفة التردد ومعلومات اخري</p>
        </BaseModal>
      </div>

      <div class="flex items-center gap-2">
        <div
          class="grid h-3 w-3 place-content-center rounded-full bg-blue-400 p-3 text-sm font-semibold text-white"
        >
          <p>{{ channels.length }}</p>
        </div>

        <BaseToggleButton v-model:is-active="isChannelsVisible" />
      </div>
    </div>

    <div class="mt-2 flex flex-col gap-2" v-if="isChannelsVisible">
      <ChannelCard
        v-for="(channel, index) in channels"
        :key="index"
        :channel="channel"
      />
    </div>
  </div>
</template>
