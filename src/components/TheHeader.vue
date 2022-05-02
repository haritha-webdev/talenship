<template>
  <header class="header">
    <div class="inputWrap">
      <i class="bi bi-search"></i>
      <input
        class="form-control"
        type="text"
        v-model="searchText"
        placeholder="Search"
        @keyup ="$emitter.$emit('searchEvent', searchText)"
      />
    </div>
  </header>
</template>

<script>
export default {
  data() {
    return {
      searchText: "",
    };
  },
};
</script>