<template>
  <div class="flex flex-col w-3/4 lg:w-1/2 items-center justify-center">
    <span class="text-2xl font-bold mb-10 text-center">Dołącz do nas i znajdź współlokatora</span>
<!--    <Input placeholder="E-mail" />-->
<!--    <Input type="password" placeholder="Hasło" additional-classes="mt-5" />-->
<!--    <Input type="password" placeholder="Powtórz hasło" additional-classes="mt-5" />-->
    <form>
      <input
          v-model="registerData.email"
          type="text"
          placeholder="E-mail"
          class="mt-5"
          ref="email"
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

      <BaseButton
        @click="register"
        round
        size="lg"
        class="mt-10"
      >
        <span class="normal-case">Zarejestruj się</span>
      </BaseButton>
    </form>
    <BaseButton
      @click="$router.push('login')"
      round
      outline
      color="gray"
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
  mounted() {
    this.$refs.email.focus()
  },
  methods: {
    register(e) {
      e.preventDefault()

      const errorsArray = [
        this.emailRequired(this.registerData.email),
        this.emailRegex(this.registerData.email),
        this.passwordRequired(this.registerData.password),
        this.passwordRegex(this.registerData.password),
        this.samePasswords(this.registerData.password, this.repeatedPassword),
        this.nameRequired(this.registerData.firstName),
        this.surnameRequired(this.registerData.lastName),
      ]
      // console.log(errorsArray)

      const firstError = errorsArray.find(element => element !== true)

      if (firstError) {
        this.$store.dispatch('notificationModule/show', { text: firstError, type: 'error' })
        return
      }

      this.$store.dispatch('auth/register', this.registerData).then(() => {
        this.$router.push('login')
      })
    },
    emailRequired(email) {
      return !!email || 'E-mail jest wymagany'
    },
    emailRegex(email) {
      return /.+@.+\..+/.test(email) || 'Nieprawidłowy e-mail'
    },
    passwordRequired(password) {
      return !!password || 'Hasło jest wymagane'
    },
    passwordRegex(password) {
      return [
        password.length >= 8 || 'Hasło powinno zawierać co najmniej 8 znaków',
        password.length <= 255 || 'Maksymalnie 255 znaków',
        /[0-9]+/.test(password) || 'Hasło powinno zawierać co najmniej jedną cyfrę',
        /[A-Z]+/.test(password) || 'Hasło powinno zawierać co najmiej jedną wielką literę',
        /[$@#&!-_]+/.test(password) || 'Hasło powinno zawierać co najmniej jeden znak specjalny'
      ].find(element => element !== true) || true
    },
    samePasswords(password1, password2) {
      return password1 === password2 || 'Hasła nie są takie same'
    },
    nameRequired(name) {
      return !!name || 'Imię jest wymagane'
    },
    surnameRequired(surname) {
      return !!surname || 'Nazwisko jest wymagane'
    },
  },
};
</script>

<style scoped></style>
