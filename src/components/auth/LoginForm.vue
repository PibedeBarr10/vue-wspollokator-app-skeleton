<template>
  <div class="flex flex-col w-3/4 lg:w-1/2 items-center justify-center">
    <span class="text-2xl font-bold mb-10">Zaloguj się do konta</span>
    <input
      v-model="loginData.email"
      type="text"
      placeholder="E-mail"
      class="mt-5"
    />
    <input
      v-model="loginData.password"
      type="password"
      placeholder="Hasło"
      class="mt-5"
    />
    <BaseButton
      @click="login"
      round
      key="login"
      size="lg"
      class="mt-10"
    >
      <span class="normal-case">Zaloguj się</span>
    </BaseButton>
    <BaseButton
      @click="$router.push('register')"
      round
      outline
      color="gray"
      key="red"
      size="lg"
      class="mt-5"
    >
      <span class="normal-case">Zarejestruj się</span>
    </BaseButton>
  </div>
</template>

<script>
import BaseButton from "../reusable-components/BaseButton.vue";
import Input from "../reusable-components/Input.vue";

export default {
  components: {
    BaseButton,
    Input
  },
  data() {
    return {
      loginData: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    login() {
      console.log('clicked')
      this.$store.dispatch('auth/login', this.loginData).then(() => {
        this.$router.push('dashboard')
      })
    }
  }
};
</script>

<style scoped></style>
