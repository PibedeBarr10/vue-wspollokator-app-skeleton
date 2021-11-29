<template>
  <transition name="fade" mode="out-in">
    <div
      v-if="show"
      class="notification text-gray-50"
      :class="color"
    >
      {{ msg }}
    </div>
  </transition>
</template>

<script>
export default {
  name: "NotificationBar",
  computed: {
    msg: {
      get () {
        return this.$store.getters['notificationModule/msg']
      }
    },
    color: {
      get () {
        return this.$store.getters['notificationModule/color']
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

.fade-enter-active, .fade-leave-active {
  transition: opacity 1.5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>