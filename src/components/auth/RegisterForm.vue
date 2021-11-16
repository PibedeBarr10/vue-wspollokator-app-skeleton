<template>
  <div class="flex flex-col w-3/4 lg:w-1/2 items-center justify-center">
    <span class="text-2xl font-bold mb-10 text-center">Dołącz do nas i znajdź współlokatora</span>
    <Input placeholder="E-mail" />
    <Input type="password" placeholder="Hasło" class="mt-5" />
    <Input type="password" placeholder="Powtórz hasło" class="mt-5" />
    <BaseButton round key="login" size="lg" class="mt-10" @click="$router.push('dashboard')">
      <span class="normal-case">Zarejestruj się</span>
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
      <span class="normal-case">Przejdź do logowania</span>
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
