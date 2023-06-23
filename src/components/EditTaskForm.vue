<template>
  <form class="form" @submit.prevent="submitForm">
    <div class="mb-4" v-if="is_owner">
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
    <div class="mb-4" v-if="is_owner">
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
    <div class="mb-4">
      <label class="label-form" for="state_task"> Estado </label>
      <select
        class="input-form focus:shadow-outline focus:outline-none"
        v-model="state.state_task"
        id="state_task"
      >
        <option value="pending">Pendiente</option>
        <option value="in_progress">En progreso</option>
        <option value="completed">Completada</option>
      </select>
      <span class="error-message" v-if="v$.state_task.$error">
        {{ v$.state_task.$errors[0].$message }}
      </span>
    </div>
    <div class="flex items-center justify-end">
      <button
        class="submit-button focus:outline-none focus:shadow-outline"
        type="submit"
      >
        Actualizar tarea
      </button>
    </div>
  </form>
</template>

<script>
import useValidate from "@vuelidate/core";
import { required, helpers } from "@vuelidate/validators";
import { reactive, computed } from "vue";
import Swal from "sweetalert2";
import taskService from "../services/taskService";
import { useRouter } from "vue-router";

export default {
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
  setup(props) {
    const state = reactive({
      id: props.id,
      project_id: props.project_id,
      title: props.title,
      description: props.description,
      state_task: props.state_task,
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
        state_task: {
          required: helpers.withMessage(
            "El estado de la tarea es requerido",
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
      props,
    };
  },
  methods: {
    submitForm() {
      this.v$.$validate();
      if (this.v$.$error) {
        return;
      }
      const task = {
        id: `${this.props.id}`,
        project_id: `${this.props.project_id}`,
        title: this.state.title,
        description: this.state.description,
        state: this.state.state_task,
      };

      taskService
        .updateTask(task)
        .then((response) => {
          Swal.fire({
            icon: "success",
            title: "Tarea actualizada",
            text: "Haz click en ok para ver los cambios",
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
