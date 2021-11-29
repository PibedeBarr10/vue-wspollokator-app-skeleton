<template>
  <router-view />
</template>

<script>

export default {
  mounted () {
    this.autoLogout()
  },
  methods: {
    parseJwt (token) {
      const base64Url = token.split('.')[1]
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
      const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''))

      return JSON.parse(jsonPayload)
    },
    autoLogout() {
      setInterval(() => {
        if (this.$store.state.auth.status.loggedIn) {
          const parsedToken = this.parseJwt(this.$store.state.auth.user.access_token)

          // console.log(parsedToken.exp * 1000, new Date().getTime(), parsedToken.exp * 1000 - new Date().getTime())

          if (parsedToken.exp * 1000 - 5000 < new Date().getTime()) {
            this.$store.dispatch('auth/logout')
            window.location.reload(true)
          }
        }
      }, 2000)
    }
  }
}
</script>
