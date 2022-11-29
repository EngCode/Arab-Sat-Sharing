<script setup>
  const { data, error } = await usePlaywright().fetchData();
  console.log(data);
</script>

<template>
  <section v-if="error" class="text-center [direction:rtl]">
    <BaseImg
      src="Data_Error"
      class="mx-auto mb-8"
      height="384"
      alt="Player holding a football in his hand"
    />

    <p class="text-lg font-semibold">
      حصل خطأ اثناء الحصول علي البيانات. نأسف لذلك وسنحاول إصلاح الخطأ في أسرع
      وقت!
    </p>
  </section>

  <section v-else-if="data" class="flex flex-col gap-5 py-4">
    <CompetitionCard
      v-for="(competition, index) in data.competitions"
      :key="index"
      :competition="competition"
    />
  </section>
</template>
