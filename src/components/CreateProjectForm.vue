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
    <div class="mb-4">
      <label class="label-form" for="date_init"> Fecha de inicio </label>
      <input
        class="input-form focus:shadow-outline focus:outline-none"
        type="date"
        placeholder=""
        v-model="state.date_init"
        id="date_init"
        autocomplete="off"
      />
      <span class="error-message" v-if="v$.date_init.$error">
        {{ v$.date_init.$errors[0].$message }}
      </span>
    </div>
    <div class="mb-4">
      <label class="label-form" for="date_end"> Fecha de finalización </label>
      <input
        class="input-form focus:shadow-outline focus:outline-none"
        type="date"
        placeholder=""
        v-model="state.date_end"
        id="date_end"
        autocomplete="off"
      />
      <span class="error-message" v-if="v$.date_end.$error">
        {{ v$.date_end.$errors[0].$message }}
      </span>
    </div>
    <div class="flex items-center justify-end">
      <button
        class="submit-button focus:outline-none focus:shadow-outline"
        type="submit"
      >
        Crear proyecto
      </button>
    </div>
  </form>
</template>

<script>
import useValidate from "@vuelidate/core";
import { required, helpers } from "@vuelidate/validators";
import { reactive, computed } from "vue";
import Swal from "sweetalert2";
import projectsService from "@/services/projectService";
import { useRouter } from "vue-router";

export default {
  setup() {
    const state = reactive({
      title: "",
      description: "",
      date_init: "",
      date_end: "",
    });

    const endDateMustBeGreaterThanInitDate = (value) => {
      if (value) {
        const date_init = new Date(state.date_init);
        const date_end = new Date(value);
        return date_end > date_init;
      }
      return true;
    };

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
        date_init: {
          required: helpers.withMessage(
            "La fecha de inicio es requerida",
            required
          ),
        },
        date_end: {
          required: helpers.withMessage(
            "La fecha de finalización es requerida",
            required
          ),
          endDateMustBeGreaterThanInitDate: helpers.withMessage(
            "La fecha de finalización debe ser mayor a la fecha de inicio",
            endDateMustBeGreaterThanInitDate
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
    };
  },
  methods: {
    submitForm() {
      this.v$.$validate();
      if (this.v$.$error) {
        return;
      }
      const project = {
        title: this.state.title,
        description: this.state.description,
        date_init: this.state.date_init,
        date_end: this.state.date_end,
      };

      projectsService
        .createProject(project)
        .then((response) => {
          Swal.fire({
            icon: "success",
            title: "Proyecto creado",
            text: "Haz click en ok para ver tus proyectos",
          }).then(() => {
            this.$emit("showProjects");
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
