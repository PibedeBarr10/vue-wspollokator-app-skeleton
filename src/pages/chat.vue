<template>
<div class="flex flex-col" style="height: 100vh; overflow: hidden;">
  <div style="max-height:10%;">
        <Navbar/>
  </div>
  <div class="flex flex-col" style=" flex:1;">
    <div class="flex flex-grow">
      <ChatList
        :conversationsList="conversationsList"
        :currentUserId="this.currentUser.user.pk"
        @clicked="onClickChildChild"
      />  <!--  :key="this.componentKey"-->
      <Conversation
        v-if="chooseConversationId !== '0' && !loading"
        :messageList="this.messageList"
        :oponentUser="this.oponentUser"
        @send="sendMessageChild"
      />  <!--:key="this.componentKey" -->
      <div
        v-else-if="chooseConversationId !== '0' && loading"
        class="flex justify-center items-center w-full"
      >
        Trwa ładowanie konwersacji
      </div>
      <div
        v-else
        class="flex justify-center items-center w-full"
      >
        Wybierz konwersacje z listy
      </div>
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
  props:{
    chooseConversationId:{
      type: String,
      default: '0',
    },
  },
  data () {
    return {
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
      loading: true
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
    setInterval(() => {
      chatService.getConversations().then(data => {
        if (data.length > 0) {
          this.conversationsList = JSON.parse(JSON.stringify(data))
        }
      })
      if(this.chooseConversationId !== '0'){
          chatService.getConversation(this.chooseConversationId).then(data => {
            this.messageList = JSON.parse(JSON.stringify(data))
           });
      }
      this.loading = false
    },1500);
    this.getConversations()
  },
  methods: {
    getConversations()
    {
        chatService.getConversations().then(data => {
          if (data.length > 0) {
            this.conversationsList = JSON.parse(JSON.stringify(data))
          }
      }).then(()=> {
        this.getConversation()})
    },
    onClickChildChild(chooseConversationId, oponentUser) {
      this.oponentUser = oponentUser
      this.loading = true
      this.$router.push({name: 'Wiadomości', params: { chooseConversationId: chooseConversationId } })
    },
    sendMessageChild(message)
    {
      chatService.sendMessage(this.chooseConversationId, message).then(() => {
        console.log("wysłano wiadomość")
      })
    },
    getConversation()
    {
      if(this.chooseConversationId!=='0'){
        console.log(this.conversationsList)
          this.conversationsList.forEach(item => {
            if (item.id ===this.chooseConversationId) {
              item.users.forEach(item2 => {
                if(item2.id !== this.currentUser.id) {
                  this.oponentUser.id = item2.id;
                  this.oponentUser.last_name = item2.last_name;
                  this.oponentUser.first_name = item2.first_name;
                  this.oponentUser.profile = item2.profile;
                  this.oponentUser.avatar = item2.avatar;
                }
              })
            }
          });
          chatService.getConversation(this.chooseConversationId).then(data => {
            this.messageList = JSON.parse(JSON.stringify(data))
          });
      }
    }
  }
};
</script>

<style scoped>
</style>
