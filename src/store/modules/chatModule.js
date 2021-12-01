import chatService from "../../services/chatService";

export default {
    state: {
        conversationsList: {
            user: '',
            last_message: {
                user: '',
                text: '',
                is_read: false,
                created_at:''
            }

        },
        conversationsCreated: false
    },
    mutations: {
        SET_CONVERSATIONS(state, data) {
            state.conversationsList.user = data.user;
            state.conversationsList.last_message=data.last_message;
            
        },
        CONFIRM_CONVERSATIONS_CREATED(state) {
            state.conversationsCreated = true
        }
    },
    actions: {
        getConversations({ commit }) {
            chatService.getConversations().then(data => {
                if (data.length > 0) {
                    commit('SET_CONVERSATIONS', data[0])
                    commit('CONFIRM_CONVERSATIONS_CREATED')
                }
            })
        },
        createConversation({commit}) {
            chatService.createConversation()
        }
    },
    getters: {
        conversationList: state => state.conversationList,
        conversationsCreated: state => state.conversationsCreated
    }
}