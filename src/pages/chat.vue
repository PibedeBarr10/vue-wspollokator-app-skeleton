<template>
<div class="flex flex-col" style="height: 100vh;">
  <div style="max-height:10%;">
        <Navbar/>
  </div>
  <div class="flex flex-col" style=" flex:1;" >
      <div class="flex flex-grow">
      <ChatList/>
      <Conversation/>  
      </div>
  </div>
 </div>
</template>
<script>
import { SearchIcon } from "@heroicons/vue/outline";

import Navbar from "../components/reusable-components/Navbar.vue";
import ChatList from "../components/chat/ChatList.vue";
import Conversation from "../components/chat/Conversation.vue"

export default {
  components: {
    SearchIcon,
    Navbar,
    ChatList,
    Conversation,
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    }
  },
  methods: {
  }
};
</script>

<style scoped>
</style>
