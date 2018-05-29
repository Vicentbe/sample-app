<template>
  <div id="app">
    <google-map />
    <sports />
  </div>
</template>

<script>
import GoogleMap from "./components/GoogleMap"
import Sports from "./components/Sports"

export default {
  name: "App",
  components: {
    GoogleMap,
    Sports
  }
};
</script>
