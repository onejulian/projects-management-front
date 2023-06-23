<template>
  <div class="container-task">
    <h2>{{ title }}</h2>
    <p>{{ description }}</p>
    <p>Estado: {{ statusTranslations[state_task] }}</p>
    <div class="flex justify-evenly mt-4">
      <div
        class="single-option bg-blue-400 text-white"
        @click="toggleModalUpdateTask"
      >
        actualizar
      </div>
      <div
        class="single-option bg-red-400 text-white"
        v-if="is_owner"
        @click="deleteTask"
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
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    state_task: {
      type: String,
      required: true,
    },
    is_owner: {
      type: Boolean,
      required: true,
    },
  },
  methods: {
    toggleModalUpdateTask() {
      this.$emit("toggleModalUpdateTask", this.id);
    },
    deleteTask() {
      this.$emit("deleteTask", this.id);
    },
  },
  data() {
    return {
      statusTranslations: {
        pending: "Pendiente",
        in_progress: "En progreso",
        completed: "Completada",
      },
    };
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
