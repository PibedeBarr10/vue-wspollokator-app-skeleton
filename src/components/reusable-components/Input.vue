<template>
  <input
    :type="type"
    :placeholder="placeholder"
    class="
      w-full
      border
      font-medium
      h-5
      px-3
      py-4
      hover:outline-none
      focus:outline-none focus:ring-1 focus:ring-indigo-600
      rounded-md
    "
    :class="additionalClasses"
  />
</template>
<script>
export default {
  inheritAttrs: false,
  props: {
    value: String,
    type: {
      type: String,
      default: "text",
    },
    placeholder: String,
    additionalClasses: String,
  },
};
</script>
