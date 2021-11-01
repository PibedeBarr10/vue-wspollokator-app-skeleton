<template>
  <div class="flex-none shadow-md px-6 py-4">
    <p class="font-bold">Filtry</p>
    <div class="flex flex-row">
      <div class="form-control">
        <label class="cursor-pointer flex flex-row content-center items-center pr-4">
          <span class="label-text pr-2">Zwierzęta domowe</span>
          <input type="checkbox" checked="checked" class="toggle">
        </label>
      </div>

      <div class="form-control">
        <label class="cursor-pointer flex flex-row content-center items-center pr-4">
          <span class="label-text pr-2">Osoby palące</span>
          <input type="checkbox" class="toggle">
        </label>
      </div>

      <div class="form-control">
        <label class="cursor-pointer flex flex-row content-center items-center pr-4">
          <span class="label-text pr-2">Zapisane</span>
          <input type="checkbox" class="toggle">
        </label>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Filters'
}
</script>

<style scoped>

</style>
