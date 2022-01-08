<template>
  <div
    v-if="newProfileModalVisibility"
    class="flex flex-col justify-center items-center fixed w-full"
    style="height: 100vh; z-index: 600; background-color: rgba(0,0,0,0.3)"
  >
    <div
      class="flex flex-col justify-center items-center p-6 border-black border-4"
      style="background-color: rgb(240, 240, 240); border-radius: 10px"
    >
      <h1 class="text-2xl font-extrabold pb-3">
        Witamy w systemie Współlokator!
      </h1>
      <p>
        Aby swobodnie poruszać się w systemie musisz skonfigurować swój profil
      </p>
      <div class="w-full">
        <p class="font-bold mt-3">Rzeczy do wykonania:</p>
        <p v-for="value in toDoForUser">
          - {{ value }}
        </p>
      </div>
      <button
        class="btn btn-primary mt-4"
        @click="newProfileModalVisibility = false"
      >
        Przejdź do Profilu
      </button>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    toDoForUser: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      newProfileModalVisibility: false,
    }
  },
  watch: {
    toDoForUser: {
      deep: true,
      handler() {
        if (this.toDoForUser.length > 0) {
          this.newProfileModalVisibility = true
        }
      }
    }
  }
}
</script>
