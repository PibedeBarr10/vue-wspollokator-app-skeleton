<template>
  <div
    v-if="users.length === 0"
    class="flex justify-center"
  >
    <p>Brak wyników</p>
  </div>
  <div
    v-else
    v-for="user in users"
    :key="user"
    class="flex mb-4 rounded-box shadow-md mx-2 group"
    @mouseover.native="getUserOnHover(user)"
    @mouseleave.native="getUserOnHover"
  >
    <div class="flex-shrink self-center m-4">
      <div class="-space-x-6 avatar-group justify-center min-w-120">
        <div class="avatar w-12 h-12">
          <img :src="`${user.avatar}`" :alt="user.first_name + ' image'">
        </div>
        <!-- <div
          v-for="member in group.members"
          :key="member"
          class="avatar"
        >
          <div class="w-12 h-12">
            <img :src="member.imgUrl" :alt="member.name + ' image'">
          </div>
        </div>
        <div
          v-if="users[filteredGroup.indexOf(group)].members.length > 2"
          class="avatar placeholder"
        >
          <div class="w-12 h-12 rounded-full bg-neutral-focus text-neutral-content">
            <span>+{{ users[filteredGroup.indexOf(group)].members.length - 2 }}</span>
          </div>
        </div> -->
      </div>
    </div>

    <div class="flex justify-between flex-grow pl-0 pr-4 py-4">
      <div>
        <p class="card-title">
          <!-- <a href="/group-chat">{{ group.membersNames }}</a> -->
          <a href="/group-chat">{{ `${user.first_name} ${user.last_name}` }}</a>
        </p>
<!--        <div class="space-x-4">-->
<!--          <div class="badge badge-primary">Warszawa</div>-->
<!--          <div class="badge badge-primary">Docelowa liczba osób: 4</div>-->
<!--        </div>-->
      </div>

      <div class="self-center space-x-4">
        <HeartIcon
          class="h-5 w-5 text-red-500 cursor-pointer"
          @click="sendToFavourite"
        />
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
    users: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      // filteredUsers: [],
      activeUser: -1
    }
  },
  mounted () {
    console.log(this.users)
  },
  methods: {
    // filterMembers () {
    //   // deep copy
    //   this.filteredUsers = JSON.parse(JSON.stringify(this.users))
    // },
    getUserOnHover(user = null) {
      const oldActiveUserIndex = this.activeUser
      user ? this.activeUser = this.users.indexOf(user) : this.activeUser = -1

      if (this.activeUser !== oldActiveUserIndex) {
        this.$emit('setMarkersOnMap', this.activeUser)
      }
    },
    sendToFavourite() {
      alert('Heart clicked!')
    }
  }
}
</script>

<style scoped>
.group:hover {
  background-color: #ddd;
}
</style>
