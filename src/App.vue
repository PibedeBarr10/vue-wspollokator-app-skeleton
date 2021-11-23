<template>
  <router-view />
</template>

<script>
export default {
  data() {
    return {
      time: 0
    }
  },
  mounted () {
    this.autoLogout()
  },
  methods: {
    autoLogout() {
      setInterval(() => {
        this.time = JSON.parse(localStorage.getItem('tokenExpiryTime'))

        if (this.$store.state.auth.status.loggedIn) {
          if (this.time === 0) {
            localStorage.setItem('tokenExpiryTime', JSON.stringify(-1))
            this.$store.dispatch('auth/logout')
            window.location.reload(true)
          }
          if (this.time < 0) {
            localStorage.setItem('tokenExpiryTime', JSON.stringify(599))
          }
          localStorage.setItem('tokenExpiryTime', JSON.stringify(this.time - 1))
        } else {
          localStorage.setItem('tokenExpiryTime', JSON.stringify(-1))
        }
        // console.log(JSON.parse(localStorage.getItem('tokenExpiryTime')))
      }, 1000)
    }
  }
}
</script>
