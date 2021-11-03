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
  mounted() {},
  methods: {},
  created() {},
};
</script>

<style scoped></style>
