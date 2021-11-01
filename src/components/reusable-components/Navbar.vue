<template>
  <div class="flex-none navbar border-base-100 text-black" style=" border-bottom: 2px solid #ddd">
    <div class="flex-none px-4">
      <span class="text-lg font-extrabold">
        <a href="/">Współlokator</a>
      </span>
    </div>
    <div class="flex-1 px-2 mx-2">
      <div class="items-stretch hidden lg:flex">
      </div>
    </div>
    <div class="flex-none">
      <a
        href="/favourite"
        class="btn btn-ghost btn-sm rounded-btn"
      >
        Zapisane
      </a>
      <a
        href="/my-profile"
        class="btn btn-ghost btn-sm rounded-btn"
      >
        Mój profil
      </a>
      <a
        href="/logout"
        class="btn btn-ghost btn-sm rounded-btn"
      >
        <LogoutIcon class="h-6 w-6"/>
      </a>
    </div>
  </div>
</template>

<script>
import { LogoutIcon } from '@heroicons/vue/outline'

export default {
  name: 'Navbar',
  components: {
    LogoutIcon
  }
}
</script>

<style scoped>

</style>
