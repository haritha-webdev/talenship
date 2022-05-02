<template>
  <div class="contentWrap">
    <div class="breadCrumb">
      <router-link to="/">Home</router-link>
      <router-link
        v-if="
          $route.path.indexOf('/members') > -1
        "
        to="/members"
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

