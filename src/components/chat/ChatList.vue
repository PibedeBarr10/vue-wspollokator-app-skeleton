<template>
  <div class="flex flex-col w-3/12 bg-gray-100" style="height:100vh;" >
     <div class="flex text-lg font-extrabold p-3" style="max-height:10%;">
         Wiadomości
     </div> 
     <div class ="p-3 ">
         <div class="relative">
            <input type="text" placeholder="Wyszukaj" class=" w-full input"> 
            <button class="absolute top-0 right-0 rounded-l-none btn btn-ghost"><SearchIcon class="h-6 w-6"/></button>
         </div> 
      </div>
      <!-- póki co ukryte
      
      <UsersTopBar/> 
      -->
      <div class="flex flex-col mb-20" style="flex:1; overflow:hidden; overflow-y:auto;">
      <AllConversations/>
      </div>
      
 </div>
</template>

<script>
import UsersTopBar from "../chat/UsersTopBar.vue";
import AllConversations from "../chat/AllConversations.vue";
import { SearchIcon } from "@heroicons/vue/outline";
export default {
  components: {
      UsersTopBar,
      AllConversations,
      SearchIcon,
  },
  data() {
    return {}
  },

  methods: {},
};
</script>

<style scoped>
::-webkit-scrollbar {
  width: 10px;
}
::-webkit-scrollbar-thumb {
  background: mediumpurple;
  border-radius: 10px; 
}
</style>