<template>
  <form class="form" @submit.prevent="submitForm">
    <div class="mb-4">
      <label class="label-form" for="title"> Título </label>
      <input
        class="input-form focus:shadow-outline focus:outline-none"
        type="text"
        placeholder=""
        v-model="state.title"
        id="title"
        autocomplete="off"
      />
      <span class="error-message" v-if="v$.title.$error">
        {{ v$.title.$errors[0].$message }}
      </span>
    </div>
    <div class="mb-4">
      <label class="label-form" for="description"> Descripción </label>
      <input
        class="input-form focus:shadow-outline focus:outline-none"
        type="text"
        placeholder=""
        v-model="state.description"
        id="description"
        autocomplete="off"
      />
      <span class="error-message" v-if="v$.description.$error">
        {{ v$.description.$errors[0].$message }}
      </span>
    </div>
    <div class="flex items-center justify-end">
      <button
        class="submit-button focus:outline-none focus:shadow-outline"
        type="submit"
      >
        Crear tarea
      </button>
    </div>
  </form>
</template>

<script>
import useValidate from "@vuelidate/core";
import { required, helpers } from "@vuelidate/validators";
import { reactive, computed } from "vue";
import Swal from "sweetalert2";
import tasksService from "../services/taskService";
import { useRouter } from "vue-router";

export default {
  props: {
    projectId: {
      type: Number,
      required: true,
    },
  },
  setup(props) {
    const state = reactive({
      title: "",
      description: "",
    });

    const rules = computed(() => {
      return {
        title: {
          required: helpers.withMessage("El título es requerido", required),
        },
        description: {
          required: helpers.withMessage(
            "La descripción es requerida",
            required
          ),
        },
      };
    });

    const v$ = useValidate(rules, state);
    const router = useRouter();

    return {
      state,
      v$,
      router,
      props
    };
  },
  methods: {
    submitForm() {
      this.v$.$validate();
      if (this.v$.$error) {
        return;
      }
      const task = {
        project_id: `${this.props.projectId}`,
        title: this.state.title,
        description: this.state.description,
      };

      tasksService
        .createTask(task)
        .then((response) => {
          Swal.fire({
            icon: "success",
            title: "Tarea creada",
            text: "Haz click en ok para ver las tareas",
          }).then(() => {
            this.$emit("showTasks");
            this.$emit("closeModal");
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
