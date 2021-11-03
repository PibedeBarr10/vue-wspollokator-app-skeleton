<template>
  <div class="flex flex-col" style="height: 100vh">
    <Navbar
      ><router-link to="/" class="btn btn-ghost btn-sm rounded-btn">
        Home
      </router-link></Navbar
    >
    <div class="flex flex-row flex-1">
      <img
        class="object-cover flex w-1/2 bg-black items-center justify-center"
        :src="selectedImage"
      />
      <div class="flex w-1/2 items-center justify-center">
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
import "leaflet/dist/leaflet.css";
import L from "leaflet";

import Navbar from "../reusable-components/Navbar.vue";

export default {
  components: {
    Navbar,
  },
  data() {
    return {
      images: [
        "/src/assets/authImages/authImages1.jpeg",
        "/src/assets/authImages/authImages2.jpeg",
        "/src/assets/authImages/authImages3.jpeg",
        "/src/assets/authImages/authImages4.jpeg",
      ],
      selectedImage: null,
    };
  },
  mounted() {},
  methods: {
    randomItem(items) {
      return items[Math.floor(Math.random() * items.length)];
    },
  },
  created() {
    this.selectedImage = this.randomItem(this.images);
  },
};
</script>

<style scoped></style>
