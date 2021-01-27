<template>
  <transition name="slide">
    <v-container fill-height fluid>
      <v-container absolute padding="20%">
        <v-text-field
          ref="searchField"
          v-model="searchTerm"
          light
          flat
          clearable
          autofocus
          outlined
          rounded
          @click:clear="loading = false"
          color="#1210FF"
          :loading="loading"
          class="blinking-cursor"
          @change="getHistoricalArticles"
          label="Fetch Sentiment Analysis for the News"
          placeholder="Search for Historical Content"
        ></v-text-field>
        <v-layout justify-space-between flex v-if="showTotal">
          <span class="caption">Search: <strong>{{ currentSearch }}</strong></span>
          <span class="caption">{{ searchArticleResults.length }} / {{ totalPages - faultyArticles }} Articles</span>
        </v-layout>
      </v-container>
      <v-container fluid background-color="#f2f2f2" v-if="searchArticleResults.length">
        <v-row
          no-gutters
          align="center"
          justify-content
          v-for="rowIdx in (pageIdx + 1)"
          :key="rowIdx"
        >
        <transition-group class="row center" name="list" tag="div">
          <v-col
            v-for="i in 10"
            :key="'article-' + i"
          >
          <v-hover
            v-slot="{ hover }"
            open-delay="100"
          >
            <v-tooltip
              top
            >
              <template v-slot:activator="{ on }">
                <v-container v-on="on">
                  <a target="_blank" :href="searchArticleResults[((rowIdx - 1) * 10) + i - 1].web_url">
                  <v-card
                    :elevation="hover ? 6 : 2"
                    :class="{ 'on-hover': hover }"
                    class="mx-auto pa-4"
                    style="cursor: pointer"
                    outlined
                    :color="getColorFromArticle(searchArticleResults[((rowIdx - 1) * 10) + i - 1])"
                  >
                  </v-card>
                  </a>
                </v-container>
              </template>
              
              <span class="headline">{{ searchArticleResults[((rowIdx - 1) * 10) + i - 1].headline.main }}</span>
            </v-tooltip>
          </v-hover>
          
          </v-col></transition-group>
        </v-row>
      </v-container>
      <v-snackbar
        v-model="snackbar"
        vertical
      >
        API requires new key
        <template v-slot:action="{ attrs }">
          <v-btn
            color="indigo"
            text
            v-bind="attrs"
            @click="snackbar = false"
          >
            Close
          </v-btn>
        </template>
      </v-snackbar>
    </v-container>
  </transition>
</template>

<script>
import { analyze, getColorFromSentimentScore } from '../utils/sentiment.js';

export default {
  name: 'SearchComponent',
  data: () => ({
    loading: false,
    snackbar: false,
    searchTerm: '',
    nytApiKey: 'otMhcdzXQYCrN8NkJuJfbMlKVGItb8LP',
    searchArticleResults: [],
    pageIdx: 0,
    totalPages: 0,
    faultyArticles: 0,
    showTotal: false,
    currentSearch: '',
  }),
  methods: {  
    async getHistoricalArticles() {
      if (!this.searchTerm) {
        this.loading = false;
        return;
      }
      this.totalPages = 0;
      this.pageIdx = 0;
      this.showTotal = false;
      this.searchArticleResults = [];
      this.faultyArticles = 0;
      this.loading = true;
      let nytAPIUrl = `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${this.searchTerm}&api-key=${this.nytApiKey}`;
      let nytResponse;
      this.currentSearch = this.searchTerm;
      try {
        nytResponse = await this.$http.get(nytAPIUrl); 
      } catch (err) {
        this.snackbar = true;
        this.loading = false;
        return;
      }
      this.totalPages = nytResponse.data.response.meta.hits;
      this.showTotal = true;
      nytResponse.data.response.docs.forEach((article) => {
        if ('abstract' in article && 'headline' in article && 'web_url' in article && 'snippet' in article) {
          this.searchArticleResults.push(article)
        }
      });
      const ms = 6000;
      await new Promise(resolve => setTimeout(resolve, ms));

      for (let pageIdx = 1; pageIdx < (nytResponse.data.response.meta.hits / 10); pageIdx += 1) {
        let nytAPIUrl = `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${this.searchTerm}&api-key=${this.nytApiKey}&page=${pageIdx}`
        try {
          if (!this.loading) {
            return;
          }
          nytResponse = await this.$http.get(nytAPIUrl);
        } catch (err) {
          this.snackbar = true;
          this.loading = false;
          return;
        }
        this.pageIdx = pageIdx;
        nytResponse.data.response.docs.forEach((article) => {
          if ('abstract' in article && 'headline' in article && 'web_url' in article && 'snippet' in article) {
            this.searchArticleResults.push(article)
          } else {
            this.faultyArticles += 1;
          }
        });
        await new Promise(resolve => setTimeout(resolve, ms));
      }
      this.loading = false;
    },
    calculateSentiment(text) {
      return analyze(text.abstract) +  analyze(text.snippet);
    },
    getColorFromArticle(article) {
      const sentimentScore = this.calculateSentiment(article);
      const targetColor = getColorFromSentimentScore(sentimentScore);
      return targetColor;
    },
  },
  mounted () {
    this.$nextTick(() => {
      setTimeout(() => {
        this.$refs.searchField.$refs.input.focus()
      })
    })
  },
}
</script>

<style scoped>
.blinking-cursor {
  font-weight: 400;
  color: #2E3D48;
  -webkit-animation: 1s blink step-end infinite;
  -moz-animation: 1s blink step-end infinite;
  -ms-animation: 1s blink step-end infinite;
  -o-animation: 1s blink step-end infinite;
  animation: 1s blink step-end infinite;
}
.list-enter, .list-leave-to {
  opacity: 0;
}
.list-enter-active, .list-leave-active {
  transition: opacity 0.5s ease;
}
</style>