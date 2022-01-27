<template>
<div class="flex flex-col" style="max-height: 100vh; overflow: hidden;">
  <div style="max-height:10%;">
    <Navbar/>
  </div>
  <div class="flex flex-col" style=" flex:1;">
    <div class="flex flex-grow">
      <ChatList
        :conversationsList="conversationsList"
        :currentUserId="this.currentUser.user.pk"
        @clicked="onClickChildChild"
        @clickedGroup="onClickChildChildGroup"
      />
      <Conversation
        v-if="chooseConversationId !== '0' && !loading && !isGroup"
        ref="conversationComponent"
        :messageList="this.messageList"
        :oponentUser="this.oponentUser"
        @send="sendMessageChild"
      />
      <ConversationGroup
        v-else-if="chooseConversationId !== '0' && !loading && isGroup"
        :messageList="this.messageList"
        :users="this.users"
        :name="this.nameGroup"
        :currentUserId="currentUser.user.pk"
        @send="sendMessageChild"
      />
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
import ConversationGroup from "../components/chat/ConversationGroup.vue";
import chatService from "../services/chatService";

export default {
  components: {
    Navbar,
    ChatList,
    Conversation,
    ConversationGroup,
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
        is_group: false,
        name: '',
        users: {
          id: '',
          first_name: '',
          last_name: '',
          profile: '',
          avatar: '',
        },
        last_message: {
          user: '',
          user_name: '',
          text: '',
          is_read: false,
          created_at: ''
        },

      },
      messageList: {
        user: '',
        user_name: '',
        text: '',
        is_read: false,
        created_at: ''
      },
      oponentUser: {
         id: '',
         first_name: '',
         last_name: '',
         profile: '',
         avatar: '',
      },
      nameGroup: '',
      loading: true,
      interval: null,
      isGroup: false,
      canScroll: false
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
    this.interval = setInterval(() => {
      chatService.getConversations().then(data => {
        if (data.length > 0) {
          this.conversationsList = JSON.parse(JSON.stringify(data))
        }
      })
      if(this.chooseConversationId !== '0'){
        chatService.getConversation(this.chooseConversationId).then(data => {
          this.messageList = JSON.parse(JSON.stringify(data))
        }).then(() => {
          if (this.canScroll) {
            this.$refs.conversationComponent.scrollDown()
            this.canScroll = false
          }
        })
      }
      this.loading = false
    },1500)
    this.getConversations()
  },
  beforeUnmount(){
    clearInterval(this.interval);
  },
  methods: {
    getConversations () {
        chatService.getConversations().then(data => {
          if (data.length > 0) {
            this.conversationsList = JSON.parse(JSON.stringify(data))
          }
      }).then(()=> {
        this.getConversation()})
    },
    onClickChildChild (chooseConversationId, oponentUser) {
      this.oponentUser = oponentUser
      this.loading = true
      this.isGroup = false 
      this.$router.push({name: 'Wiadomości', params: { chooseConversationId: chooseConversationId } })
    },
    onClickChildChildGroup (chooseGroupConversationId,users,name)
    {
      this.users = users
      this.loading= true
      this.isGroup=true
      this.nameGroup=name
      this.$router.push({name: 'Wiadomości', params: { chooseConversationId: chooseGroupConversationId } })
    },
    sendMessageChild (message) {
      chatService.sendMessage(this.chooseConversationId, message).then(() => {
        // console.log("wysłano wiadomość")

        this.canScroll = true
      })
    },
    getConversation () {
      if(this.chooseConversationId !== '0') {
        this.conversationsList.forEach(item => {
          if (item.id ===this.chooseConversationId) {
            item.users.forEach(item2 => {
              if (item2.id !== this.currentUser.user.pk) {
                this.oponentUser.id = item2.id
                this.oponentUser.last_name = item2.last_name
                this.oponentUser.first_name = item2.first_name
                this.oponentUser.profile = item2.profile
                this.oponentUser.avatar = item2.avatar
              }
            })
          }
        })
        chatService.getConversation(this.chooseConversationId).then(data => {
          this.messageList = JSON.parse(JSON.stringify(data))
        })
      }
    }
  }
};
</script>

<style scoped>
</style>
