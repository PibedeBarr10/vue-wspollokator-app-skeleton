<template>
  <div class="flex-none shadow-md px-6 py-1">
    <p class="font-bold">Filtry</p>
    <div class="flex flex-row justify-between">
      <div class="flex flex-row w-full">
        <div class="form-control flex flex-row justify-between w-full">
          <div>
            <div class="flex flex-row flex-wrap">
              <label class="label px-0 mr-2">
                <span class="label-text mr-2">Zwierzęta domowe</span>
                <select v-model="accepts_animals" class="select select-sm select-bordered">
                  <option v-for="option in selectOptions" :value="option.value">
                    {{ option.text }}
                  </option>
                </select>
              </label>

              <label class="label px-0 mr-2">
                <span class="label-text mr-2">Osoby palące</span>
                <select v-model="smoking" class="select select-sm select-bordered">
                  <option v-for="option in selectOptions" :value="option.value">
                    {{ option.text }}
                  </option>
                </select>
              </label>

              <label class="label px-0 mr-2">
                <span class="label-text mr-2">Minimalna kwota</span>
                <input
                    v-model="min_preferable_price"
                    v-mask="'#####'"
                    type="text"
                    autocomplete="off"
                    placeholder="Kwota"
                    class="input input-sm input-bordered"
                    style="max-width: 100px"
                >
              </label>

              <label class="label px-0 mr-2">
                <span class="label-text mr-2">Maksymalna kwota</span>
                <input
                    v-model="max_preferable_price"
                    v-mask="'#####'"
                    type="text"
                    autocomplete="off"
                    placeholder="Kwota"
                    class="input input-sm input-bordered"
                    style="max-width: 100px"
                >
              </label>

              <label class="label px-0 mr-2">
                <span class="label-text mr-2">Minimalny wiek</span>
                <input
                    v-model="min_age"
                    v-mask="'##'"
                    type="text"
                    autocomplete="off"
                    placeholder="Wiek"
                    class="input input-sm input-bordered"
                    style="max-width: 100px"
                >
              </label>

              <label class="label px-0 mr-2">
                <span class="label-text mr-2">Maksymalny wiek</span>
                <input
                    v-model="max_age"
                    v-mask="'##'"
                    type="text"
                    autocomplete="off"
                    placeholder="Wiek"
                    class="input input-sm input-bordered"
                    style="max-width: 100px"
                >
              </label>
            </div>
          </div>

          <div class="flex flex-row items-center">
<!--            <label-->
<!--              class="cursor-pointer flex flex-row content-center items-center mr-3"-->
<!--            >-->
<!--              <span class="label-text pr-2">Zapisane</span>-->
<!--              <input type="checkbox" class="toggle" />-->
<!--            </label>-->
            <button
              class="btn btn-primary btn-sm"
              @click="searchUsers"
            >
              Wyszukaj
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Filters",
  emits: [
    "searchUsers"
  ],
  data () {
    return {
      accepts_animals: 'I',
      smoking: 'I',
      min_preferable_price: null,
      max_preferable_price: null,
      min_age: null,
      max_age: null,
      selectOptions: [
        { text: 'Akceptuję', value: 'A' },
        { text: 'Nie akceptuję', value: 'N' },
        { text: 'Nieistotne', value: 'I' }
      ],
    }
  },
  methods: {
    searchUsers() {
      const animalsSearch = this.accepts_animals === 'I' ? null : this.accepts_animals
      const smokingSearch = this.smoking === 'I' ? null : this.smoking

      this.$emit('searchUsers', {
        accepts_animals: animalsSearch,
        smoking: smokingSearch,
        min_preferable_price: this.min_preferable_price,
        max_preferable_price: this.max_preferable_price,
        min_age: this.min_age,
        max_age: this.max_age
      })
    }
  },
};
</script>

<style scoped></style>
