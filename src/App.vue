<template>
  <div id="app">
    <Visualizer />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Visualizer from "./components/Visualizer.vue";

@Component({
  components: {
    Visualizer
  }
})
export default class App extends Vue {}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height: 100vh;
}
html {
  margin: 0;
  padding: 0;
}
body {
  overflow-x: hidden;
  margin: 0;
  padding: 0;
}

@media screen and (min-width: 1301px) {
  body {
    overflow-y: hidden;
  }
}

@media screen and (max-width: 1300px) {
  body {
    overflow-y: scroll;
  }
}

h3 {
  font-size: 2rem;
}
</style>
