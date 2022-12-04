<script setup>
  const { data } = await usePlaywright().fetchData();
</script>

<template>
  <section class="py-4 [direction:rtl]">
    <div
      class="rounded border border-gray-100 py-2 px-4 text-center dark:border-blue-500"
    >
      <h1 class="text-xl font-semibold">مباريات اليوم</h1>
      <h2 class="font-medium text-blue-300 dark:text-blue-200">
        {{ data.date.ar }}
      </h2>

      <BaseInfo>جميع مواعيد المباريات بتوقيت مصر (+2 GMT).</BaseInfo>
      <BaseInfo>اضغط علي القناة لمعرفة جميع الترددات المتاحة.</BaseInfo>
    </div>
  </section>
</template>
