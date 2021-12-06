<template>
   <div class=" flex justify-end">
          <div class="flex items-end m-4 max-w-1/2 ">
            <div class="p-3 bg-blue-600 rounded-t-lg rounded-bl-lg">
              <div class="text-sm text-gray-100 ">
               {{ text }}
              </div>
<!--              <div class="text-xs text-gray-300">-->
<!--                {{ created_at.split('T')[1].split('.')[0].split(':').slice(0, -1).join(':') }}-->
<!--              </div>-->
            </div>
              <!-- <img class="w-8 rounded-full m-3 mb-0" src="http://daisyui.com/tailwind-css-component-profile-2@94w.png" /> -->
          </div>
        </div>
</template>

<script>

export default {
  props: {
    text: String,
    avatar: String,
    created_at: String,
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