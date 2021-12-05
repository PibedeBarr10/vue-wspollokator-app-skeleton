<template>
   <div class=" flex justify-end">
          <div class="flex items-end w-1/2 m-4 ">
            <div class="p-3 bg-blue-600 rounded-t-lg rounded-bl-lg">
              <div class="text-sm text-gray-100 ">
               {{text}}
              </div>
               <!-- ile czasu temu, lub dać czesc tylko z godziną  -->
              <!-- <div class="text-xs text-gray-300">
                8 min ago
              </div> -->
            </div>
              <!-- <img class="w-8 rounded-full m-3 mb-0" src="http://daisyui.com/tailwind-css-component-profile-2@94w.png" /> -->
          </div>
        </div>
</template>

<script>

export default {
   props:
  {
    text:String,
    avatar:String,
    created_at:String,
  },
  components: {
    
  },
  data() {
    return {}
  },

  methods: {},
};
</script>

<style scoped></style>