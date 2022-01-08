<template>
  <label for="modal-change-password" class="my-1 btn btn-primary modal-button w-full">Zmień hasło</label>
  <input type="checkbox" id="modal-change-password" class="modal-toggle">
  <div class="modal">
    <div class="modal-box">
      <input
        v-model="newpassword.password"
        type="password"
        placeholder="Nowe hasło"
        class="mt-5"
      />

      <input
        v-model="newpassword.repeatedPassword"
        type="password"
        placeholder="Powtórz nowe hasło"
        class="mt-5"
      />

      <div class="modal-action">
        <label for="modal-change-password" class="btn btn-primary" @click="changePassword">Zatwierdź</label>
        <label for="modal-change-password" class="btn">Anuluj</label>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data () {
    return {
      newpassword: {
        password: '',
        repeatedPassword: ''
      }
    }
  },
  methods: {
    changePassword(e) {
      e.preventDefault()

      const errorsArray = [
        this.passwordRequired(this.newpassword.password),
        this.passwordRegex(this.newpassword.password),
        this.samePasswords(this.newpassword.password, this.newpassword.repeatedPassword),
      ]
      // console.log(errorsArray)

      const firstError = errorsArray.find(element => element !== true)

      if (firstError) {
        this.$store.dispatch('notificationModule/show', { text: firstError, type: 'error' })
        return
      }

      this.$store.dispatch('auth/changePassword', this.newpassword).then(() => {
        this.$store.dispatch('notificationModule/show', { text: 'Pomyślnie zmieniono hasło', type: 'success' })
      })
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
        /[$@#&!_]+/.test(password) || 'Hasło powinno zawierać co najmniej jeden znak specjalny'
      ].find(element => element !== true) || true
    },
    samePasswords(password1, password2) {
      return password1 === password2 || 'Hasła nie są takie same'
    }
  }
}

</script>
