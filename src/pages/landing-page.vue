<template>
  <Navbar />
  <Hero />
</template>

<script>
import Hero from "../components/landing-page/Hero.vue";
import Navbar from "../components/reusable-components/Navbar.vue";

export default {
  components: {
    Navbar,
    Hero,
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  mounted() {
    if (this.currentUser) {
      this.$router.push("/dashboard");
    }
  },
};
</script>

<style scoped></style>
