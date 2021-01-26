<template>
  <v-app id="app">
    <v-main>
      <v-toolbar color="#f3f3f3" absolute width="100%">
        <v-toolbar-title>
          <v-container fill-height fluid>
            <v-row align="center" justify="center">
              <v-col><span class="display-1">NewsFeeling</span></v-col>
              <v-col><span class="body-1">A Sentiment Visualization of the News</span></v-col>
            </v-row>          
          </v-container>
        </v-toolbar-title>
        <v-toolbar-items><v-btn absolute right fab icon><v-icon>mdi-book-open-blank-variant</v-icon></v-btn></v-toolbar-items>
      </v-toolbar>
      <SearchComponent />
    </v-main>
    <v-footer absolute color="transparent">
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