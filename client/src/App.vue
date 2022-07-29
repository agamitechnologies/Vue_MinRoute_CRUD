<template>
  <div id="app">
    <UserComponent msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
import UserComponent from "./components/UserComponent.vue";

export default {
  name: "App",
  components: {
    UserComponent,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>