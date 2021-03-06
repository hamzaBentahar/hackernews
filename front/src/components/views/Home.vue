<template>
  <div class="hello">
    <div class="columns">
      <div class="column is-10 is-offset-1">
        <table v-if="topics" class="table is-striped is-hoverable is-fullwidth" ref="topics">
          <thead>
          <tr>
            <th colspan="2">
              Sort By: <a href="#" @click.prevent="changeSort('recent')">Most Recent</a> -
              <a href="#" @click.prevent="changeSort('rates')">Most
              Rated</a>
            </th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(topic, index) in topics.items">
            <td width="70px">{{ topicNb(index) }}.
              <upvote :topic-id="topic.id"></upvote>
            </td>
            <td>
              <router-link :to="{name: 'topic', params: {id: topic.id }}">{{ topic.title }}</router-link>
              <br>
              <small class="is-size-7">{{ topic.rates }} points -
                {{ fullName(topic.author.firstName, topic.author.lastName) }} - {{ topic.createdAt | timeFromNow}}
              </small>
            </td>
          </tr>
          </tbody>
        </table>
        <nav class="pagination is-centered" role="navigation" aria-label="pagination" v-if="displayPagination">
          <a class="pagination-previous" :disabled="!topics.meta.previousPage"
             @click="changePage(topics.meta.previousPage)" v-if="topics">Previous</a>
          <a class="pagination-next" :disabled="!topics.meta.nextPage" @click="changePage(topics.meta.nextPage)"
             v-if="topics">Next</a>
          <ul class="pagination-list">
            <li>{{ params.page }}</li>
          </ul>
        </nav>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from "axios"
  import moment from 'moment'
  import upvote from '../upvote'

  export default {
    name: 'Home',
    components: {
      upvote
    },
    mounted() {
      this.getTopics()
      Event.$on('upvotedTopic', response => {
        this.topics.items.find(element => element.id === response.topicId).rates = response.totalUpvotes
      })
    },
    data() {
      return {
        topics: null,
        params: {
          sort: this.$route.query['sort'] ? this.$route.query['sort'] : 'recent',
          page: this.$route.query['page'] ? this.$route.query['page'] : 1
        }
      }
    },
    filters: {
      timeFromNow(value) {
        return moment(value).fromNow()
      }
    },
    methods: {
      displayPagination() {
        return this.topics !== null && this.topics.meta > 1;
      },
      fullName(firstName, lastName) {
        return firstName + ' ' + lastName
      },
      topicNb(index) {
        const currentPage = Number.isInteger(parseInt(this.params.page)) ? parseInt(this.params.page) : 1
        return (index + 1) + this.topics.meta.perPage * (currentPage - 1)
      },
      changePage(pageNb) {
        this.params.page = pageNb
        this.newQuery()
      },
      changeSort(sort) {
        this.params.sort = sort
        this.newQuery()
      },
      newQuery() {
        this.$router.push({name: 'home', query: this.params})
      },
      getTopics() {
        axios.get('/topics', {params: this.params})
          .then(response => {
            this.topics = response.data
          })
      }
    },
    watch: {
      '$route': function () {
        this.params.sort = this.$route.query['sort'] ? this.$route.query['sort'] : 'recent'
        this.params.page = this.$route.query['page'] ? this.$route.query['page'] : 1
        this.getTopics()
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
