<template>
   <!-- class=" flex-grow flex flex-col" -->
   <div class="flex flex-col " style="height: 100vh;">
    <div class ="w-full" > 

        <div class="flex items-center border-b-2 border-gray-50">
          <div class="p-3">
          <img class="w-10 rounded-full" src="http://daisyui.com/tailwind-css-component-profile-2@94w.png" />
          <!-- jeżeli użytkownik aktywny 

          <div class="flex justify-center items-center w-3 relative left-6 bottom-3 bg-white rounded-full" style="height: 0.75rem;">
            <div class="w-2.5 bg-green-600 rounded-full" style="height: 0.625rem;"/>
          </div>

          -->
          </div>
          <div class="p-2" >
            <div class="text-sm">William</div>
            <!-- jeżeli użytkownik aktywny -->
            <!-- <div class="text-xs  text-gray-400">aktywny</div> -->
          </div>
        </div>
      </div>
     <!-- ustawić scrolle  -->
    <div class ="w-full border-b-2 border-gray-50 flex flex-col" style=" overflow:hidden; overflow-y: auto; flex:1;">
      <!-- wiadomosc otrzymana -->
       <MessageIn/>
       <MessageIn/>
       <MessageIn/>
        <MessageIn/>
       <MessageIn/>
        <MessageIn/>
       <MessageIn/>
        <!-- wiadomość użytkownika -->
       <MessageOut/>

     </div>
    <div class ="p-2" style="height:130px; " >
          <div class="relative">
              <input type="text" placeholder="Napisz wiadomość ..." class=" w-full input"> 
              <button class="absolute top-0 right-0 rounded-l-none btn btn-ghost"><ArrowRightIcon class="h-6 w-6"/></button>
          </div> 
        </div>
  </div>
</template>

<script>
import { ArrowRightIcon } from "@heroicons/vue/outline";
 import MessageIn from "./MessageIn.vue";
import MessageOut from "../chat/MessageOut.vue";

export default {
  components: {
      MessageIn,
      MessageOut,
      ArrowRightIcon,
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