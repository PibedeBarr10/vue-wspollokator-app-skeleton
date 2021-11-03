<template>
  <div class="flex flex-col w-3/4 lg:w-1/2 items-center justify-center">
    <span class="text-2xl font-bold mb-10">Join us and find a flatmate</span>
    <Input placeholder="e-mail" />
    <Input type="password" placeholder="password" class="mt-5" />
    <Input type="password" placeholder="re-type password" class="mt-5" />
    <BaseButton round key="login" size="lg" class="mt-10">
      <span class="normal-case">Sign up</span>
    </BaseButton>
    <BaseButton
      @click="$router.push('login')"
      round
      outline
      color="gray"
      key="red"
      size="lg"
      class="mt-5"
    >
      <span class="normal-case">Do you have an account? Log in</span>
    </BaseButton>
  </div>
</template>

<script>
import BaseButton from "../reusable-components/BaseButton.vue";
import Input from "../reusable-components/Input.vue";

export default {
  components: { BaseButton, Input },
  data() {
    return {};
  },
  mounted() {},
  methods: {},
};
</script>

<style scoped></style>
