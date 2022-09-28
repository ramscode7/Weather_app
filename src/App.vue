<template>
  <div>
    <the-loader v-if="loader"></the-loader>
    <the-first></the-first>
  </div>
</template>

<script>
import { mapState } from "vuex";
import TheFirst from "./components/TheFirst.vue";
import TheLoader from "./components/TheLoader.vue";
export default {
  components: {
    TheFirst,
    TheLoader,
  },
  computed: {
    ...mapState({ loader: (state) => state.showLoader }),
  },
};
</script>

<style>
* {
  background-color: rgb(202, 241, 228);
}
</style>
