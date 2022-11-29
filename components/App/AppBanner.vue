<script setup>
  const { data, error } = await usePlaywright().fetchData();

  const arDate = computed(() => {
    // Convert the recieved dd/mm/yyyy format to yyyy/mm/dd
    const formattedDate = new Date(
      data.date.fullDate.split('/').reverse().join('/')
    );

    return formattedDate.toLocaleDateString('ar-EG', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      weekday: 'long',
    });
  });
</script>

<template>
  <section class="py-4 [direction:rtl]">
    <div
      class="rounded border border-gray-100 py-2 px-4 text-center dark:border-blue-500"
    >
      <h1 class="text-xl font-semibold">مباريات اليوم</h1>
      <h2 class="font-medium text-blue-300 dark:text-blue-200">{{ arDate }}</h2>
    </div>
  </section>
</template>
