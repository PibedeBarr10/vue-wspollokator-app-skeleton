<template>
  <div class="lg:w-3/5 lg:h-2/5 mx-auto flex flex-wrap">
    <p class="font-medium py-2">Opinie:</p>
    <div
      class="flex w-full bg-base-200"
      v-for="opinion in opinions"
      :key="opinion.id"
    >
      <Opinion
        :opinion="opinion"
      />
    </div>
  </div>
</template>

<script>
import Opinion from './Opinion.vue'

export default {
  components: {Opinion},
  data() {
    return {
      opinions: [
        {
          uuid: 'safa-123tw-asfgw-12rwf',
          text: 'Pierwsza opinia',
          rate: 3
        },
        {
          uuid: 'ktye-23hss-kygh3-hdf31',
          text: 'Jakiś tekst',
          rate: 2
        }
      ]
    }
  }
}
</script>
