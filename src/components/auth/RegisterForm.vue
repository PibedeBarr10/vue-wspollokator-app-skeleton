<template>
  <div class="flex flex-col w-3/4 lg:w-1/2 items-center justify-center">
    <span class="text-2xl font-bold mb-10 text-center">Dołącz do nas i znajdź współlokatora</span>
<!--    <Input placeholder="E-mail" />-->
<!--    <Input type="password" placeholder="Hasło" additional-classes="mt-5" />-->
<!--    <Input type="password" placeholder="Powtórz hasło" additional-classes="mt-5" />-->
    <input
        v-model="registerData.email"
        type="text"
        placeholder="E-mail"
        class="mt-5"
    />
    <input
        v-model="registerData.password"
        type="password"
        placeholder="Hasło"
        class="mt-5"
    />
    <input
        v-model="repeatedPassword"
        type="password"
        placeholder="Powtórz hasło"
        class="mt-5"
    />
    <input
        v-model="registerData.firstName"
        type="text"
        placeholder="Imię"
        class="mt-5"
    />
    <input
        v-model="registerData.lastName"
        type="text"
        placeholder="Nazwisko"
        class="mt-5"
    />

    <BaseButton round key="login" size="lg" class="mt-10" @click="register">
      <span class="normal-case">Zarejestruj się</span>
    </BaseButton>
    <BaseButton
      @click="$router.push('login')"
      round
      outline
      color="gray"
      key="red"
      size="lg"
      class="mt-5"
    >
      <span class="normal-case">Przejdź do logowania</span>
    </BaseButton>
  </div>
</template>

<script>
import BaseButton from "../reusable-components/BaseButton.vue";
import Input from "../reusable-components/Input.vue";

export default {
  components: { BaseButton, Input },
  data() {
    return {
      registerData: {
        email: '',
        password: '',
        firstName: '',
        lastName: ''
      },
      repeatedPassword: ''
    };
  },
  mounted() {},
  methods: {
    register() {
      this.$store.dispatch('auth/register', this.registerData).then(() => {
        this.$router.push('login')
      })
    }
  },
};
</script>

<style scoped></style>
