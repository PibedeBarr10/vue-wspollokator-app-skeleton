<template>
   <div class=" flex-grow flex flex-col">
    <div class ="w-full">
        <div class="flex items-center border-b-2 border-gray-50">
          <div class="p-3">
          <img class="w-8 rounded-full" src="http://daisyui.com/tailwind-css-component-profile-2@94w.png" />
          <div class="flex justify-center items-center w-3 relative left-6 bottom-3 bg-white rounded-full" style="height: 0.75rem;">
            <div class="w-2.5 bg-green-600 rounded-full" style="height: 0.625rem;"/>
          </div>
          </div>
          <div class="p-2">
            <div class="text-sm">William</div>
            <div class="text-xs  text-gray-400">aktywny</div>
          </div>
        </div>
      </div>
    <!-- ustawić scrolle  -->
    <div class ="w-full flex-grow border-b-2 border-gray-50" >
      <!-- wiadomosc otrzymana -->
       <MessageIn/>
       <MessageIn/>
        <!-- wiadomość użytkownika -->
       <MessageOut/>

      </div>
    <div class ="p-3 ">
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

<style scoped></style>