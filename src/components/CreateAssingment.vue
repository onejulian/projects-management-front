<template>
  <form class="form" @submit.prevent="submitForm">
    <div class="mb-4">
      <label class="label-form" for="email"> Correo electrónico </label>
      <input
        class="input-form focus:shadow-outline focus:outline-none"
        type="text"
        placeholder=""
        v-model="state.email"
        id="email"
        autocomplete="off"
      />
      <span class="error-message" v-if="v$.email.$error">
        {{ v$.email.$errors[0].$message }}
      </span>
    </div>
    <div class="flex items-center justify-end">
      <button
        class="submit-button focus:outline-none focus:shadow-outline"
        type="submit"
      >
        Asignar usuario
      </button>
    </div>
  </form>
</template>

<script>
import useValidate from "@vuelidate/core";
import { required, email, helpers } from "@vuelidate/validators";
import { reactive, computed } from "vue";
import Swal from "sweetalert2";
import assignmentsService from "../services/assignmentService";
import userService from "../services/userService";

export default {
  props: {
    projectId: {
      type: Number,
      required: true,
    },
  },
  setup(props) {
    const state = reactive({
      email: "",
      user_id: "",
    });

    const rules = computed(() => {
      return {
        email: {
          required: helpers.withMessage("El email es requerido", required),
          email: helpers.withMessage("El email no es válido", email),
        },
      };
    });

    const v$ = useValidate(rules, state);

    return {
      state,
      v$,
      props,
    };
  },
  methods: {
    submitForm() {
      this.v$.$validate();
      if (this.v$.$error) {
        return;
      }

      userService.searchUser(this.state.email).then((response) => {
        this.state.user_id = response.data.id;
        const assignment = {
          project_id: `${this.props.projectId}`,
          user_id: `${this.state.user_id}`,
        };

        assignmentsService
          .createAssignment(assignment)
          .then((response) => {
            Swal.fire({
              icon: "success",
              title: "Usuario asignado correctamente",
              text: "Haz click en ok para ver los usuarios asignados",
            }).then(() => {
              this.$emit("showAssignments");
              this.$emit("closeModal");
            });
          })
          .catch((error) => {
            console.log(error);
          });
      });
    },
  },
};
</script>
