<template>
      <div class="flex items-end w-1/2 m-2 ">
        <img class="w-8 rounded-full m-3 mb-0" :src="avatar" alt="avatar" />
        <div class="p-3  bg-gray-100 rounded-t-lg rounded-br-lg">
          <div class="text-sm text-gray-500 ">
            {{ text }}
          </div>
<!--          <div class="text-xs text-gray-400">-->
<!--            {{ created_at.split('T')[1].split('.')[0].split(':').slice(0, -1).join(':') }}-->
<!--          </div>-->
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