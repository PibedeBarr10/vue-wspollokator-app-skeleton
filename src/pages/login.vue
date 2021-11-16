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
  }
};
</script>

<style scoped></style>
