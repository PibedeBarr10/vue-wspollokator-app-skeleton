<template>
  <div class="w-3/12 bg-gray-100">
     <div class="text-lg font-extrabold p-3">
         Wiadomości
     </div> 
     <div class ="p-3 ">
         <div class="relative">
            <input type="text" placeholder="Wyszukaj" class=" w-full input"> 
            <button class="absolute top-0 right-0 rounded-l-none btn btn-ghost"><SearchIcon class="h-6 w-6"/></button>
         </div> 
      </div>
      <UsersTopBar/>
      <AllConversations/>
 </div>
</template>

<script>
import UsersTopBar from "../chat/UsersTopBar.vue";
import AllConversations from "../chat/AllConversations.vue";
export default {
  components: {
      UsersTopBar,
      AllConversations,
  },
  data() {
    return {}
  },

  methods: {},
};
</script>

<style scoped></style>