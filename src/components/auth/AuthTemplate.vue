<template>
  <div class="flex flex-col" style="height: 100vh">
    <Navbar />
    <div class="flex flex-row flex-1">
      <img
        class="
          object-cover
          hidden
          bg-black
          items-center
          justify-center
          md:flex md:w-1/2
        "
        :src="`${selectedImage}`"
      />
      <div class="flex w-full items-center justify-center md:w-1/2">
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
import "leaflet/dist/leaflet.css";

import Navbar from "../reusable-components/Navbar.vue";
import img1 from "/src/assets/authImages/authImages1.jpeg";
import img2 from "/src/assets/authImages/authImages2.jpeg";
import img3 from "/src/assets/authImages/authImages3.jpeg";
import img4 from "/src/assets/authImages/authImages4.jpeg";

export default {
  components: {
    Navbar,
  },
  data() {
    return {
      images: [img1, img2, img3, img4],
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
