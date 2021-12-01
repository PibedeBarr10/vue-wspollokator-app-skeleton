<template>
  <AuthTemplate>
    <RegisterForm />
  </AuthTemplate>
</template>
<script>
import AuthTemplate from "../components/auth/AuthTemplate.vue";
import RegisterForm from "../components/auth/RegisterForm.vue";

export default {
  components: {
    AuthTemplate,
    RegisterForm,
  },
  data() {
    return {};
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
