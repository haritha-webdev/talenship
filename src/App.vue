<style >
@import './assets/members.css';
</style> 
<template>
  <div>
    <header-content />
    <body-content />
    <footer-content />
  </div>
</template>

<script>
import HeaderContent from "./components/TheHeader.vue";
import FooterContent from "./components/TheFooter.vue";
import BodyContent from "./components/Content.vue";

export default {
  components: {
    HeaderContent,
    FooterContent,
    BodyContent,
  },
};
</script>

