<script setup>
  const props = defineProps({
    isModalVisible: {
      type: Boolean,
      required: true,
    },
  });

  const emit = defineEmits(['update:isModalVisible']);
  const modal = ref(null);

  const closeModal = () => {
    emit('update:isModalVisible', false);
  };

  watch(
    () => props.isModalVisible,
    (newValue) => {
      if (newValue)
        onClickOutside(modal, () => closeModal(), {
          ignore: [],
        });
    }
  );
</script>

<template>
  <Teleport to="body">
    <Transition name="fade" appear>
      <div v-if="isModalVisible" class="backdrop"></div>
    </Transition>

    <Transition name="pop" appear>
      <div class="container">
        <div
          v-if="isModalVisible"
          ref="modal"
          class="app-modal modal"
          :class="$attrs.class"
          role="dialog"
        >
          <slot />
          <button class="app-button mt-2" @click.prevent="closeModal">
            إغلاق
          </button>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped lang="scss">
  .backdrop {
    @apply fixed top-0 left-0 z-40  h-screen w-screen  bg-black bg-opacity-75;

    &.fade-enter-active,
    &.fade-leave-active {
      @apply transition-colors duration-300;
    }

    &.fade-enter-from,
    &.fade-leave-to {
      @apply bg-opacity-0;
    }
  }

  .modal {
    @apply fixed top-1/2 left-1/2 z-50  -translate-y-1/2 -translate-x-1/2  rounded-lg  p-4  text-center;
    @apply min-w-[80vw] md:min-w-fit;

    &.pop-enter-active,
    &.pop-leave-active {
      @apply transition-all duration-500;
    }

    &.pop-enter-from,
    &.pop-leave-to {
      @apply scale-95 opacity-0;
    }
  }
</style>
