<template>
  <transition name="fade" mode="out-in">
    <div
      v-if="show"
      class="notification"
      :class="type"
      style="z-index: 500;"
    >
      {{ text }}
    </div>
  </transition>
</template>

<script>
export default {
  name: "NotificationBar",
  computed: {
    text: {
      get () {
        return this.$store.getters['notificationModule/text']
      }
    },
    type: {
      get () {
        return this.$store.getters['notificationModule/type']
      }
    },
    show: {
      get () {
        return this.$store.getters['notificationModule/show']
      },
      set (value) {
        this.$store.dispatch('notificationModule/hide')
      }
    }
  }
}
</script>

<style scoped>
.notification {
  padding: 8px 12px;
  border-radius: 6px;
}

.success {
  background-color: rgb(15, 217, 0);
  color: rgb(255, 255, 255);
}

.error {
  background-color: rgb(225, 0, 1);
  color: rgb(255, 255, 255);
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .4s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>