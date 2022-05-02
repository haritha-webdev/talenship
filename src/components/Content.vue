<template>
  <div class="contentWrap">
    <div class="breadCrumb">
      <router-link to="/">Home</router-link>
      <router-link
        v-if="
          $route.path.indexOf('/profiles') > -1
        "
        to="/profiles"
        >Members</router-link
      >
    </div>
    <router-view />
  </div>
</template>

<script>
export default {

};
</script>

