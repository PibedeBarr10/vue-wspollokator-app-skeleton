<template>
<div class="flex flex-col" style="height: 100vh; overflow: hidden;">
  <div style="max-height:10%;">
        <Navbar/>
  </div>
  <div class="flex flex-col" style=" flex:1;" >
      <div class="flex flex-grow" >
      <ChatList/>    
      <Conversation/>  
      </div>
  </div>
 </div>
</template>
<script>
import Navbar from "../components/reusable-components/Navbar.vue";
import ChatList from "../components/chat/ChatList.vue";
import Conversation from "../components/chat/Conversation.vue";
import chatService from "../services/chatService";

export default {
  components: {
    Navbar,
    ChatList,
    Conversation,
  },
  data(){
    return {
      conversationsList: {
        user: '',
        last_message:{
          user: '',
          text: '',
          is_read: false,
          created_at: ''
        },

        }
      }
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    }
  },
  mounted () {
    if (!this.currentUser) {
      this.$router.push('/login');
    }
   this.getConversations()
   //this.createConversation()
  },
  methods: {
    getConversations()
    {
       this.$store.dispatch('getConversations').then(() => {
        chatService.getConversations().then(data => {
          if (data.length > 0) {
            this.conversationsList = JSON.parse(JSON.stringify(data[0]))
          }
          console.log("pobrano konwersacje");
        })
      })
    },
    createConversation()
    {
      this.$store.dispatch('createConversation').then(console.log("dodano konwersacje"))
    }
  }
};
</script>

<style scoped>
</style>
