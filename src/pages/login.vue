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
  data() {
    return {};
  },
  mounted() {},
  methods: {},
  created() {},
};
</script>

<style scoped></style>
