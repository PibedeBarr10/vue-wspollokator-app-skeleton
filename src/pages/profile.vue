<template>
  <p>{{ id }}</p>
</template>

<script>
import usersService from "../services/usersService";

export default {
  name: 'Profil użytkownika',
  props: {
    id: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      profile: []
    }
  },
  mounted() {
    this.getProfileData()
  },
  methods: {
    getProfileData() {
      usersService.getProfiles(this.id).then((data) => {
        this.profile = JSON.parse(JSON.stringify(data))
        // console.log(JSON.parse(JSON.stringify(data)))
        this.profile.find((element) => {
          return element.user.id.value === this.id
        })
      }).then(() => {
        console.log(this.profile)
      })
    }
  }
}
</script>
