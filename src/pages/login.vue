<template>
  <AuthTemplate>
    <LoginForm />
  </AuthTemplate>
</template>
<script>
import AuthTemplate from "../components/auth/AuthTemplate.vue";
import LoginForm from "../components/auth/LoginForm.vue";

export default {
  components: {
    AuthTemplate,
    LoginForm,
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    }
  },
  mounted() {
    if (this.currentUser) {
      this.$router.push('/dashboard');
    }
  }
};
</script>

<style scoped></style>
