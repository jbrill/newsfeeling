<template>
  <v-app id="app">
    <v-main>
      <v-toolbar color="#f3f3f3" width="100%">
        <v-toolbar-title>
          <span class="display-1 font-weight-bold">NewsFeeling</span>
        </v-toolbar-title>
        <v-toolbar-items><v-btn disabled absolute right fab icon><v-icon>mdi-book-open-blank-variant</v-icon></v-btn></v-toolbar-items>
      </v-toolbar>
      <SearchComponent />
    </v-main>
    <v-footer absolute color="white">
      <v-layout justify-space-between flex>
        <span class="caption">Data from <a target="_blank" href="https://developer.nytimes.com/apis" style="color: black"><strong>The New York Times API</strong></a></span>
        <span class="caption"><a href="https://github.com/jbrill/newsfeeling" target="_blank">Code</a> by <a target="_blank" href="https://jbrill.com" style="color: black"><strong>Jason Brill</strong></a></span>
      </v-layout>
    </v-footer>
  </v-app>
</template>

<script>
import SearchComponent from './components/SearchComponent';

export default {
  name: 'App',

  components: {
    SearchComponent,
  },

  data: () => ({
    //
  }),
};
</script>

<style>
#app {
  font-family: 'Lato', sans-serif;
}
</style>