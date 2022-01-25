<template>
  <div class="flex w-full flex-col bg-base-300 my-2 p-2 rounded border-2 border-black">
    <div class="flex w-full">
      <div class="flex w-full text-2xs">
        <p v-if="name !== ''">
          {{ name }}
        </p>
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
    return {
      name: ''
    }
  }
}
</script>

