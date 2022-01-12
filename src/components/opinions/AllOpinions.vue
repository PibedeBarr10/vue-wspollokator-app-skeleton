<template>
  <div class="lg:w-3/5 lg:h-2/5 mx-auto flex flex-wrap">
    <p class="font-medium py-2">Opinie:</p>
    <div
      v-if="opinions.length > 0"
      class="flex w-full bg-base-200"
      v-for="opinion in opinions"
      :key="opinion.id"
    >
      <Opinion
        v-if="opinionsLoaded"
        :opinion="opinion"
      />
    </div>
    <div
      v-else
      class="flex w-full justify-center"
    >
      <p>Brak wystawionych opinii</p>
    </div>
  </div>
</template>

<script>
import Opinion from './Opinion.vue'
import opinionService from "../../services/opinionService"

export default {
  components: {
    Opinion
  },
  props: {
    userId: {
      type: String,
      required: false
    }
  },
  data() {
    return {
      opinions: [
        {
          text: 'Pierwsza opinia',
          rate: 3
        },
        {
          text: 'Jakiś tekst',
          rate: 2
        }
      ],
      opinionsLoaded: false
    }
  },
  mounted () {
    this.getOpinionsAboutUser()
  },
  methods: {
    getOpinionsAboutUser() {
      this.opinionsLoaded = false
      opinionService.getOpinionsAboutUser(this.userId).then((data) => {
        this.opinions = data
        this.opinionsLoaded = true
      })
    }
  }
}
</script>
