<template>
<div class="flex flex-col" style="height: 100vh; overflow: hidden;">
  <div style="max-height:10%;">
        <Navbar/>
  </div>
  <div class="flex flex-col" style=" flex:1;" >
      <div class="flex flex-grow" >
      <ChatList :conversationsList="conversationsList" :currentUserId="this.currentUser.user.pk" @clicked="onClickChildChild"/>    
      <Conversation :messageList="this.messageList" :oponentUser="this.oponentUser" v-if="this.chooseConversationId !==''" @send="sendMessageChild" /> 
      <div v-else >Wybierz konwersacje z listy</div>
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
      chooseConversationId: '',
      conversationsList: {
        id: '',
        users:
        {
          id: '',
          first_name: '',
          last_name: '',
          profile: '',
          avatar: '',
        },
        last_message:{
          user: '',
          user_name: '',
          text: '',
          is_read: false,
          created_at: ''
        },

         },
      messageList:{ 
        user:'',
        user_name:'',
        text:'',
        is_read:false,
        created_at:''
      },
      oponentUser:{
         id: '',
         first_name: '',
         last_name: '',
         profile: '',
         avatar: '',
      },
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
        chatService.getConversations().then(data => {
          if (data.length > 0) {
            this.conversationsList = JSON.parse(JSON.stringify(data))
          }
        
      })
    },
    createConversation()
    {
      this.$store.dispatch('createConversation').then(console.log("dodano konwersacje"))
    },
    onClickChildChild(chooseConversationId,oponentUser)
    {
      this.chooseConversationId=chooseConversationId;
      this.oponentUser=oponentUser;
      this.getConversation();
    },
    getConversation()
    {
      chatService.getConversation(this.chooseConversationId).then(data => {
        this.messageList = JSON.parse(JSON.stringify(data))
        console.log("pobrano konwersacje id");
     })
    },
    sendMessageChild(message)
    {
      chatService.sendMessage(this.chooseConversationId, message).then(console.log("wysłano wiadomość"))
    },
  }
};
</script>

<style scoped>
</style>
