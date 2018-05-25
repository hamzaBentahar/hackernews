<template>
  <div class="hello">
    <div class="columns">
      <div class="column is-10 is-offset-1">
        <table v-if="topics" class="table is-striped is-hoverable is-fullwidth" ref="topics">
          <thead>
          <tr>
            <th colspan="2">
              Sort By: <a href="#" @click.prevent="changeSort('recent')">Most Recent</a> - <a href="#" @click.prevent="changeSort('upvotes')">Most Rated</a>
            </th>
          </tr>
          </thead>
          <tbody>
            <tr v-for="(topic, index) in topics.items">
              <td width="70px">{{ topicNb(index) }}. <a href="#">↑</a> </td>
              <td>{{ topic.title }}</td>
            </tr>
          </tbody>
        </table>
        <nav class="pagination is-centered" role="navigation" aria-label="pagination">
          <a class="pagination-previous" :disabled="!topics.meta.previousPage" @click="changePage(topics.meta.previousPage)" v-if="topics">Previous</a>
          <a class="pagination-next" :disabled="!topics.meta.nextPage" @click="changePage(topics.meta.nextPage)" v-if="topics">Next page</a>

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
  import jwt from 'jsonwebtoken'

  export default {
    name: 'Home',
    mounted() {
      this.getTopics()
    },
    data() {
      return {
        topics: null,
        params: {
          sort: 'recent',
          page: 1
        }
      }
    },
    methods: {
      topicNb(index){
        return (index + 1) + this.topics.meta.perPage * (this.params.page - 1)
      },
      changePage(pageNb){
        this.params.page = pageNb
        this.getTopics()
        this.$nextTick(() => {
          this.$refs.topics.scrollTop = 0
        })
      },
      changeSort(sort){
        this.params.sort = sort
      },
      getTopics(){
        console.log(this.topics)
        axios.get('/topics', {params: this.params})
          .then(response => {
            this.topics = response.data
          })
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .loginBtn {
    box-sizing: border-box;
    position: relative;
    /* width: 13em;  - apply for fixed size */
    margin: 0.2em;
    padding: 0 15px 0 46px;
    border: none;
    text-align: left;
    line-height: 34px;
    white-space: nowrap;
    border-radius: 0.2em;
    font-size: 16px;
    color: #FFF;
    cursor: pointer;
  }
  .loginBtn:before {
    content: "";
    box-sizing: border-box;
    position: absolute;
    top: 0;
    left: 0;
    width: 34px;
    height: 100%;
  }
  .loginBtn:focus {
    outline: none;
  }
  .loginBtn:active {
    box-shadow: inset 0 0 0 32px rgba(0,0,0,0.1);
  }


  /* Facebook */
  .loginBtn--facebook {
    background-color: #4C69BA;
    background-image: linear-gradient(#4C69BA, #3B55A0);
    /*font-family: "Helvetica neue", Helvetica Neue, Helvetica, Arial, sans-serif;*/
    text-shadow: 0 -1px 0 #354C8C;
  }
  .loginBtn--facebook:before {
    border-right: #364e92 1px solid;
    background: url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/14082/icon_facebook.png') 6px 6px no-repeat;
  }
  .loginBtn--facebook:hover,
  .loginBtn--facebook:focus {
    background-color: #5B7BD5;
    background-image: linear-gradient(#5B7BD5, #4864B1);
  }

</style>
