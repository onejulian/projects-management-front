<template>
  <div class="container-task">
    <h2>{{ user_name }}</h2>
    <h2>{{ user_email }}</h2>
    <div class="flex justify-evenly mt-4">
      <div
        class="single-option bg-red-400 text-white"
        @click="deleteAssignment"
      >
        eliminar
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Item",
  props: {
    id: {
      type: Number,
      required: true,
    },
    project_id: {
      type: Number,
      required: true,
    },
    user_id: {
      type: Number,
      required: true,
    },
    user_name: {
      type: String,
      required: true,
    },
    user_email: {
      type: String,
      required: true,
    },
  },
  methods: {
    deleteAssignment() {
      this.$emit("deleteAssignment", this.id);
    },
  },
};
</script>

<style>
.container-task {
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

.single-option {
  @apply py-3
        w-full
        sm:w-auto
        rounded-md
        border-none
        sm:px-6
        mx-3
        text-center
        cursor-pointer
        hover:bg-opacity-80;
}
</style>
