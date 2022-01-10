<template>
  <div class="flex w-full flex-col bg-base-300 my-1 p-1">
    <div class="flex w-full">
      <div class="flex w-full">
        {{ opinion.uuid }}
      </div>

      <div class="flex">
        <div v-for="index in opinion.rate" :key="index">
          <star-solid-icon class="h-6 w-6"/>
        </div>
        <div v-for="index in (5 - opinion.rate)" :key="index">
          <star-outline-icon class="h-6 w-6"/>
        </div>
      </div>
    </div>
    <div>
      {{ opinion.text }}
    </div>
  </div>

</template>

<script>
import { StarIcon as StarOutlineIcon } from '@heroicons/vue/outline'
import { StarIcon as StarSolidIcon } from '@heroicons/vue/solid'

export default {
  components: {
    StarOutlineIcon,
    StarSolidIcon
  },
  props: {
    opinion: {
      type: Object,
      required: true
    }
  },
  data() {
    return {}
  }
}
</script>

