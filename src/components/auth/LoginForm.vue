<template>
  <div class="flex flex-col w-3/4 lg:w-1/2 items-center justify-center">
    <span class="text-2xl font-bold mb-10">Zaloguj się do konta</span>
    <form>
      <input
          v-model="loginData.email"
          type="text"
          placeholder="E-mail"
          class="mt-5"
          ref="email"
          :rules="[emailValidation, emailRequired]"
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
          size="lg"
          class="mt-10"
      >
        <span class="normal-case">Zaloguj się</span>
      </BaseButton>
    </form>
    <BaseButton
      @click="$router.push('register')"
      round
      outline
      color="gray"
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
  mounted () {
    this.$refs.email.focus()
  },
  methods: {
    login(e) {
      e.preventDefault()

      const errorsArray = [
        this.emailRequired(this.loginData.email),
        this.emailRegex(this.loginData.email),
        this.passwordRequired(this.loginData.password),
        this.passwordRegex(this.loginData.password)
      ]

      const firstError = errorsArray.find(element => element !== true)

      if (firstError) {
        this.$store.dispatch('notificationModule/show', { msg: firstError, color: 'bg-red-500' })
        return
      }

      this.$store.dispatch('auth/login', this.loginData).then(() => {
        this.$router.push('dashboard')
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
        /[$@#&!]+/.test(password) || 'Hasło powinno zawierać co najmniej jeden znak specjalny'
      ].find(element => element !== true)
    }
  }
};
</script>

<style scoped></style>
