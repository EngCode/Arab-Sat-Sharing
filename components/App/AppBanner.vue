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

      <BaseInfo>يتم تحديث المباريات يوميا الساعة 12:30 بتوقيت مصر.</BaseInfo>
      <BaseInfo>جميع مواعيد المباريات بتوقيت مصر (+2 GMT).</BaseInfo>
      <BaseInfo>اضغط علي القناة لمعرفة جميع الترددات المتاحة.</BaseInfo>
      <BaseInfo
        >القنوات مرتبة ابجدياً كالتالي: المجانية، قنوات 4K ، قنوات HD، قنوات SD،
      </BaseInfo>
    </div>
  </section>
</template>
