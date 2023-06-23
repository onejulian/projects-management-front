<template>
  <div class="container-form">
    <form
      class="form"
      @submit.prevent="login"
    >
      <div class="mb-4">
        <label class="label-form" for="email"> Correo electrónico </label>
        <input
          class="input-form focus:shadow-outline focus:outline-none"
          id="email"
          type="text"
          v-model="email"
          placeholder=""
          autocomplete="off"
        />
      </div>
      <div class="mb-6">
        <label class="label-form" for="password"> Contraseña </label>
        <input
          class="input-form focus:shadow-outline focus:outline-none"
          id="password"
          type="password"
          v-model="password"
          placeholder=""
        />
      </div>
      <div class="flex items-center justify-end">
        <button
          class="submit-button focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Iniciar sesión
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import loginService from "@/services/loginService";
import { useRouter } from "vue-router";
import Swal from "sweetalert2";
import { ref } from "vue";
import { onMounted } from "vue";

const router = useRouter();
const email = ref("");
const password = ref("");

onMounted(() => {
  if (localStorage.getItem("token")) {
    router.push("/projects");
  }
});

async function login() {
  Swal.fire({
    title: "Iniciando sesión",
    didOpen: () => {
      Swal.showLoading();
    },
    allowOutsideClick: false,
  });
  const response = await loginService.login(email.value, password.value);

  Swal.close();

  if (response.status === 200) {
    localStorage.setItem("token", response.data.token);
    router.push("/projects");
  } else {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: response.data.message,
    });
  }
}
</script>

<style>

</style>
