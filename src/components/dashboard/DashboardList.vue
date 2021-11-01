<template>
  <div
    v-for="group in filteredGroup"
    :key="group"
    class="flex mb-4 rounded-box shadow-md mx-2 group"
    @mouseover.native="getGroupOnHover(group)"
    @mouseleave.native="getGroupOnHover"
  >
    <div class="flex-shrink self-center m-4">
      <div class="-space-x-6 avatar-group justify-center min-w-120">
        <div
          v-for="member in group.members"
          :key="member"
          class="avatar"
        >
          <div class="w-12 h-12">
            <img :src="member.imgUrl" :alt="member.name + ' image'">
          </div>
        </div>
        <div
          v-if="groups[filteredGroup.indexOf(group)].members.length > 2"
          class="avatar placeholder"
        >
          <div class="w-12 h-12 rounded-full bg-neutral-focus text-neutral-content">
            <span>+{{ groups[filteredGroup.indexOf(group)].members.length - 2 }}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="flex justify-between flex-grow pl-0 pr-4 py-4">
      <div>
        <p class="card-title">
          <a href="/group-chat">{{ group.membersNames }}</a>
        </p>
        <div class="space-x-4">
          <div class="badge badge-primary">Warszawa</div>
          <div class="badge badge-primary">Docelowa liczba osób: 4</div>
        </div>
      </div>

      <div class="self-center space-x-4">
        <HeartIcon class="h-5 w-5 text-red-500"/>
      </div>
    </div>
  </div>
</template>

<script>
import { HeartIcon } from '@heroicons/vue/outline'

export default {
  components: {
    HeartIcon
  },
  props: {
    groups: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      filteredGroup: [],
      activeGroup: -1
    }
  },
  mounted () {
    this.filterMembers()
  },
  methods: {
    filterMembers () {
      // deep copy
      this.filteredGroup = JSON.parse(JSON.stringify(this.groups))

      this.filteredGroup.forEach((group) => {
        const names = group.members.map((member) => {
          return member.name
        })

        group.membersNames = names.join(', ')

        group.members = group.members.filter((member) => {
          return group.members.indexOf(member) < 2
        })
      })
    },
    getGroupOnHover(group = null) {
      const oldActiveGroupIndex = this.activeGroup
      group ? this.activeGroup = this.filteredGroup.indexOf(group) : this.activeGroup = -1

      if (this.activeGroup !== oldActiveGroupIndex) {
        this.$emit('setMarkersOnMap', this.activeGroup)
      }
    }
  }
}
</script>

<style scoped>
.group:hover {
  background-color: #ddd;
}
</style>
