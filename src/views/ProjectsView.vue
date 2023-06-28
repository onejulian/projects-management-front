<template>
  <div class="flex justify-center">
    <div class="create-project" @click="toggleModalCreateProject">
      Crear proyecto
    </div>
  </div>
  <div class="container-window">
    <div
      class="single-window"
      :class="{
        'bg-gray-200': myProjectsWindow,
        'bg-white': !myProjectsWindow,
      }"
      @click="toggleWindow"
    >
      mis proyectos
    </div>
    <div
      class="single-window"
      :class="{
        'bg-gray-200': !myProjectsWindow,
        'bg-white': myProjectsWindow,
      }"
      @click="toggleWindow"
    >
      otros proyectos
    </div>
  </div>
  <div class="flex justify-evenly">
    <button class="button-sort" type="button" @click="sortProjectsByStartDate">
      Ordenar por fecha inicial
    </button>
    <button class="button-sort" type="button" @click="sortProjectsByEndDate">
      Ordenar por fecha final
    </button>
  </div>
  <div class="flex flex-col items-center" v-if="myProjectsWindow">
    <Project
      v-for="project in projects"
      :id="project.id"
      :title="project.title"
      :description="project.description"
      :startDate="project.date_init"
      :endDate="project.date_end"
      @click="showProject(project)"
    />
  </div>
  <div class="flex flex-col items-center" v-if="!myProjectsWindow">
    <Project
      v-for="project in otherProjects"
      :id="project.id"
      :title="project.title"
      :description="project.description"
      :startDate="project.date_init"
      :endDate="project.date_end"
      @click="showProject(project)"
    />
  </div>
  <div class="container-modal" v-if="modalCreateProject">
    <div class="container-modal-content">
      <div class="flex justify-end">
        <div class="container-close-modal" @click="toggleModalCreateProject">
          cerrar
        </div>
      </div>
      <div class="flex justify-center pt-7">
        <CreateProjectForm
          @showProjects="getMyProjects"
          @closeModal="toggleModalCreateProject"
        />
      </div>
    </div>
  </div>
  <div class="container-modal" v-if="modalViewProject">
    <div class="container-modal-content">
      <div class="flex justify-end top-0 sticky bg-white">
        <div class="container-close-modal" @click="toggleModalShowProject">
          cerrar
        </div>
      </div>
      <div class="top-[64px] sticky bg-white" v-if="myProjectsWindow">
        <div class="mt-2 flex">
          <div
            class="container-option-modal bg-blue-500"
            @click="toggleModalEditProject"
          >
            editar proyecto
          </div>
        </div>
        <div class="mt-2 flex" @click="toggleModalCreateTask">
          <div class="container-option-modal bg-blue-500">crear tarea</div>
        </div>
        <div class="mt-2 flex">
          <div
            class="container-option-modal bg-blue-500"
            @click="toggleModalCreateAssingment"
          >
            asignar usuario
          </div>
        </div>
        <div class="mt-2 flex">
          <div class="container-option-modal bg-red-500" @click="deleteProject">
            eliminar proyecto
          </div>
        </div>
      </div>
      <div class="flex justify-center pt-7">
        <Project
          :id="project.id"
          :title="project.title"
          :description="project.description"
          :startDate="project.date_init"
          :endDate="project.date_end"
        />
      </div>
      <div class="mt-2 flex flex-col items-center" v-if="myProjectsWindow">
        Asignados
        <span v-if="assignments.length === 0"
          >No hay usuarios asignados de momento</span
        >
        <Assignment
          v-for="assignment in assignments"
          :id="assignment.id"
          :project_id="project.id"
          :user_id="assignment.user.id"
          :user_name="assignment.user.name"
          :user_email="assignment.user.email"
          @deleteAssignment="deleteAssignment"
        />
      </div>
      <div class="mt-2 flex flex-col items-center">
        Tareas
        <span v-if="tasks.length === 0">No hay tareas de momento</span>
        <div class="flex justify-evenly px-4">
          <button type="button" @click="sortByPending" class="button-sort">
            Pendientes
          </button>
          <button type="button" @click="sortByInProgress" class="button-sort">
            En progreso
          </button>
          <button type="button" @click="sortByCompleted" class="button-sort">
            Completadas
          </button>
        </div>
        <Task
          v-for="task in tasks"
          :id="task.id"
          :project_id="project.id"
          :title="task.title"
          :description="task.description"
          :state_task="task.state"
          :is_owner="myProjectsWindow"
          @toggleModalUpdateTask="toggleModalUpdateTask"
          @deleteTask="deleteTask"
        />
      </div>
    </div>
  </div>
  <div class="container-modal" v-if="modalEditProject">
    <div class="container-modal-content">
      <div class="flex justify-end top-0 sticky">
        <div class="container-close-modal" @click="toggleModalEditProject">
          cerrar
        </div>
      </div>
      <div class="flex justify-center pt-7">
        <EditProjectForm
          @showProject="getProject(project.id)"
          @closeModal="toggleModalEditProject"
          :id="project.id"
          :title="project.title"
          :description="project.description"
          :date_init="project.date_init"
          :date_end="project.date_end"
        />
      </div>
    </div>
  </div>
  <div class="container-modal" v-if="modalCreateTask">
    <div class="container-modal-content">
      <div class="flex justify-end top-0 sticky">
        <div class="container-close-modal" @click="toggleModalCreateTask">
          cerrar
        </div>
      </div>
      <div class="flex justify-center pt-7">
        <CreateTaskForm
          @showTasks="getTasks(project.id)"
          @closeModal="toggleModalCreateTask"
          :projectId="project.id"
        />
      </div>
    </div>
  </div>
  <div class="container-modal" v-if="modalUpdateTask">
    <div class="container-modal-content">
      <div class="flex justify-end">
        <div class="container-close-modal" @click="toggleModalUpdateTask">
          cerrar
        </div>
      </div>
      <div class="flex justify-center pt-7">
        <EditTaskForm
          @showTasks="getTasks(project.id)"
          @closeModal="toggleModalUpdateTask"
          :id="task.id"
          :project_id="project.id"
          :title="task.title"
          :description="task.description"
          :state_task="task.state"
          :is_owner="myProjectsWindow"
        />
      </div>
    </div>
  </div>
  <div class="container-modal" v-if="modalCreateAssingment">
    <div class="container-modal-content">
      <div class="flex justify-end">
        <div class="container-close-modal" @click="toggleModalCreateAssingment">
          cerrar
        </div>
      </div>
      <div class="flex justify-center pt-7">
        <CreateAssingment
          @closeModal="toggleModalCreateAssingment"
          :projectId="project.id"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import projectsService from "@/services/projectService";
import taskService from "../services/taskService";
import assignmentService from "../services/assignmentService";
import CreateProjectForm from "@/components/createProjectForm.vue";
import CreateTaskForm from "@/components/createTaskForm.vue";
import EditProjectForm from "@/components/editProjectForm.vue";
import CreateAssingment from "@/components/CreateAssingment.vue";
import Project from "@/components/Project.vue";
import Task from "@/components/Task.vue";
import Assignment from "../components/Assignment.vue";
import { useRouter } from "vue-router";
import EditTaskForm from "@/components/editTaskForm.vue";
import Swal from "sweetalert2";

const router = useRouter();
const modalCreateProject = ref(false);
const modalViewProject = ref(false);
const modalEditProject = ref(false);
const modalCreateTask = ref(false);
const modalCreateAssingment = ref(false);
const projects = ref([]);
const tasks = ref([]);
const assignments = ref([]);
const myProjectsWindow = ref(true);
const otherProjects = ref([]);
const project = ref({});
const task = ref({});
const modalUpdateTask = ref(false);

const toggleModalUpdateTask = (id) => {
  if (typeof id === "number") {
    Swal.fire({
      title: "Cargando...",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });
    taskService.getTask(project.value.id, id).then((res) => {
      task.value = res.data;
      modalUpdateTask.value = !modalUpdateTask.value;
      Swal.close();
    });
  } else {
    modalUpdateTask.value = !modalUpdateTask.value;
  }
};

function toggleModalCreateProject() {
  modalCreateProject.value = !modalCreateProject.value;
}

function toggleModalShowProject() {
  modalViewProject.value = !modalViewProject.value;
}

function toggleModalEditProject() {
  toggleModalShowProject();
  modalEditProject.value = !modalEditProject.value;
}

function toggleModalCreateTask() {
  toggleModalShowProject();
  modalCreateTask.value = !modalCreateTask.value;
}

function toggleModalCreateAssingment() {
  toggleModalShowProject();
  modalCreateAssingment.value = !modalCreateAssingment.value;
}

function showProject(projectfromList) {
  project.value = projectfromList;
  getTasks(projectfromList.id);
  getAssignments(projectfromList.id);
  toggleModalShowProject();
}

async function getProject(projectId) {
  const response = await projectsService.getProject(projectId);
  if (!response || response.status === 401) {
    router.push("/login");
    return;
  }
  getMyProjects();
  project.value = response.data;
}

function toggleWindow() {
  myProjectsWindow.value = !myProjectsWindow.value;
}

async function getOtherProjects() {
  const response = await projectsService.getOtherProjects();
  if (!response || response.status === 401) {
    router.push("/login");
    return;
  }
  otherProjects.value = response.data;
}

async function getMyProjects() {
  const response = await projectsService.getMyProjects();
  if (!response || response.status === 401) {
    localStorage.removeItem("token");
    router.push("login");
    return;
  }
  projects.value = response.data;
}

async function getTasks(projectId) {
  const response = await projectsService.getTasksFromProject(projectId);
  if (!response || response.status === 401) {
    router.push("/login");
    return;
  }
  tasks.value = response.data;
}

async function getAssignments(projectId) {
  if (!myProjectsWindow.value) {
    return;
  }
  const response = await assignmentService.getAssingmentsFromProject(projectId);
  if (!response || response.status === 401) {
    router.push("/login");
    return;
  }
  assignments.value = response.data;
}

function sortProjectsByStartDate() {
  projects.value.sort((a, b) => {
    return new Date(a.date_init) - new Date(b.date_init);
  });
  otherProjects.value.sort((a, b) => {
    return new Date(a.date_init) - new Date(b.date_init);
  });
}

function sortProjectsByEndDate() {
  projects.value.sort((a, b) => {
    return new Date(a.date_end) - new Date(b.date_end);
  });
  otherProjects.value.sort((a, b) => {
    return new Date(a.date_end) - new Date(b.date_end);
  });
}

const statusMap = {
  pending: 1,
  in_progress: 2,
  completed: 3,
};

function sortByPending() {
  tasks.value.sort((a, b) => {
    if (a.state === "pending" ) {
      return -1;
    }
    if (b.state === "pending") {
      return 1;
    }
  });
}

function sortByInProgress() {
  tasks.value.sort((a, b) => {
    if (a.state === "in_progress" ) {
      return -1;
    }
    if (b.state === "in_progress") {
      return 1;
    }
  });
}

function sortByCompleted() {
  tasks.value.sort((a, b) => {
    if (a.state === "completed" ) {
      return -1;
    }
    if (b.state === "completed") {
      return 1;
    }
  });
}

async function deleteProject() {
  Swal.fire({
    title: "¿Estas seguro?",
    text: "No podras revertir esta acción",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    cancelButtonText: "Cancelar",
    confirmButtonText: "Si, eliminar proyecto",
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: "Cargando...",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });
      projectsService.deleteProject(project.value.id).then((res) => {
        Swal.close();
        if (res.status === 200) {
          Swal.fire("Eliminado!", "El proyecto ha sido eliminado.", "success");
          getMyProjects();
          toggleModalShowProject();
        } else {
          Swal.fire("Error!", "No se pudo eliminar el proyecto.", "error");
        }
      });
    }
  });
}

const deleteTask = (id) => {
  Swal.fire({
    title: "¿Estas seguro?",
    text: "No podras revertir esta acción",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    cancelButtonText: "Cancelar",
    confirmButtonText: "Si, eliminar tarea",
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: "Cargando...",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });
      taskService.deleteTask(id, project.value.id).then((res) => {
        Swal.close();
        if (res.status === 200) {
          Swal.fire("Eliminada!", "La tarea ha sido eliminada.", "success");
          getTasks(project.value.id);
          // toggleModalShowProject();
        } else {
          Swal.fire("Error!", "No se pudo eliminar la tarea.", "error");
        }
      });
    }
  });
};

const deleteAssignment = (id) => {
  Swal.fire({
    title: "¿Estas seguro?",
    text: "No podras revertir esta acción",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    cancelButtonText: "Cancelar",
    confirmButtonText: "Si, eliminar asignación",
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: "Cargando...",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });
      assignmentService.deleteAssignment(id, project.value.id).then((res) => {
        Swal.close();
        if (res.status === 200) {
          Swal.fire(
            "Eliminada!",
            "La asignación ha sido eliminada.",
            "success"
          );
          getAssignments(project.value.id);
        } else {
          Swal.fire("Error!", "No se pudo eliminar la asignación.", "error");
        }
      });
    }
  });
};

onMounted(() => {
  getMyProjects();
  getOtherProjects();
});
</script>

<style scoped>
.container-window {
  @apply mt-4 flex justify-evenly top-[48px] sticky;
}

.button-sort {
  @apply bg-gray-200
        rounded-md
        px-3
        py-1
        mt-6
        mx-6
        text-center
        cursor-pointer
        hover:bg-gray-300;
}

.create-project {
  @apply /* borde punteado */
        border-dashed
        border-4
        border-gray-400
        w-[65%]
        py-7
        text-center
        mt-6
        hover:border-gray-500
        cursor-pointer
        hover:bg-gray-100;
}
.container-option-modal {
  @apply rounded-md
        /* bg-blue-500 */
        text-white
        /* w-auto */
        px-3
        py-1
        text-center
        cursor-pointer;
}

.container-modal {
  @apply fixed
        top-0
        left-0
        w-full
        h-full
        flex
        items-center
        justify-center
        bg-gray-800
        bg-opacity-50;
}
</style>
