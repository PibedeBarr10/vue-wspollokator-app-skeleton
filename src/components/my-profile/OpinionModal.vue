<template>
  <label for="modal-opinion" class="my-1 btn btn-primary modal-button w-full">Dodaj opinie</label>
  <input type="checkbox" id="modal-opinion" class="modal-toggle">
  <div class="modal">
    <div class="modal-box">

      Twoja ocena: <b> {{opinion.ocena}} </b>

      <input  type="range" min = "1" max="5"  class="range" v-model="opinion.ocena"> 

      <textarea
      class="
        form-control
        block
        w-full
        px-3
        py-1.5
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
      "
      v-model="opinion.textOpinion"
      rows="3"
      placeholder="Twoja opinia"
    ></textarea>


      <div class="modal-action">
        <label for="modal-opinion" class="btn btn-primary" @click="sendOpinion">Zatwierdź</label>
        <label for="modal-opinion" class="btn">Anuluj</label>
      </div>
    </div>
  </div>
</template>

<script>
import opinionService from "../../services/opinionService";

export default {
  data () {
    return {
      opinion:{
        ocena: 1,
        textOpinion: ''
      }
    }
  },
  props:{
    profileUserID: {
      type: String,
      required: true
    }
  },
  methods: {
    sendOpinion()
    {
      opinionService.addOpinion(this.currentUser.user.pk,this.profileUserID, this.opinion.ocena, this.opinion.textOpinion).then(() => {
        console.log("wysłano opinie")
      })
    },
  },
  computed: {
  currentUser() {
    return this.$store.state.auth.user;
  }
}

}

</script>
