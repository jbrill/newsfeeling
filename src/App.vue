<template>
  <v-app>
    

    <v-main>
      <HelloWorld/>
    </v-main>
    <v-footer absolute color="transparent">
      <v-layout justify-space-between flex>
        <span class="caption">Data from <a target="_blank" href="https://developer.nytimes.com/apis" style="color: black"><strong>The New York Times API</strong></a></span>
        <span class="caption"><a href="https://github.com/jbrill" target="_blank">Coded</a> by <a target="_blank" href="https://jbrill.com" style="color: black"><strong>Jason Brill</strong></a></span>
      </v-layout>
    </v-footer>
  </v-app>
</template>

<script>
import HelloWorld from './components/HelloWorld';

export default {
  name: 'App',

  components: {
    HelloWorld,
  },

  data: () => ({
    //
  }),
};
</script>
