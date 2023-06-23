<template>
  <div class="container-project">
    <h2>{{ title }}</h2>
    <p>{{ description }}</p>
    <p>Fecha de inicio: {{ startDate }}</p>
    <p>Fecha de finalización: {{ endDate }}</p>
  </div>
</template>

<script>
export default {
  name: "Item",
  props: {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    startDate: {
      type: String,
      required: true,
    },
    endDate: {
      type: String,
      required: true,
    },
  }
};
</script>

<style>
.container-project {
  @apply border-4
        border-gray-400
        w-[95%]
        py-7
        text-center
        mt-6
        hover:border-gray-500
        cursor-pointer
        hover:bg-gray-100;
}
</style>
