<template>
    <div>
      <div v-if="topic !== null">
        <article class="message is-dark">
          <div class="message-header">
            <p class="is-pulled-right"><upvote :topic-id="id"></upvote> {{ topic.title}} ({{ this.topic.rates }} points - {{ fullName(topic.author.firstName, topic.author.lastName)}} - {{ topic.createdAt | timeFromNow}})</p>
          </div>
          <div class="message-body">
            {{ topic.content }}
          </div>
        </article>
        <form @submit.prevent="submitComment">
          <div class="columns">
            <div class="column is-half">
              <textarea class="textarea" placeholder="Write your comment here" v-model="comment"></textarea>
              <br>
              <button class="button is-primary is-pulled-right">Submit</button>
            </div>
          </div>
        </form>
        <hr>
        <h2>{{ comments.length }} comments</h2>
        <br>
        <div v-if="comments.length === 0">
          Be the first to comment
        </div>
        <article class="message is-dark" v-for="comment in comments" v-else>
          <div class="message-header">
            <p class="is-pulled-right">{{ fullName(comment.user.firstName, comment.user.lastName) }} - {{ comment.createdAt | timeFromNow}}</p>
          </div>
          <div class="message-body">
            {{ comment.content }}
          </div>
        </article>
      </div>
    </div>
</template>

<script>
  import axios from 'axios'
  import upvote from '../upvote'
  import moment from 'moment'

  export default {
    name: "Topic",
    props: ['id'],
    data(){
      return {
        topic: null,
        comment: '',
        comments: []
      }
    },
    mounted(){
      Event.$on('upvotedTopic', response => {
        this.topic.rates = response.totalUpvotes
      })
    },
    watch: {
      '$route': 'info'
    },
    components: {
      upvote
    },
    created(){
      this.info()
    },
    filters: {
      timeFromNow(value){
        return moment(value).fromNow()
      }
    },
    methods: {
      fullName(firstName, lastName){
        return firstName + ' ' + lastName
      },
      info(){
        if (Number.isInteger(parseInt(this.id))){
          axios.get('/topic/'+this.id)
            .then(response => {
              console.log(response)
              this.topic = response.data.topic
              this.commentList()
            })
            .catch(response => {
              // redirect to list of topics
              console.log(response)
            })
          console.log("Is integer")
        } else {
          console.log("Not integer")
          // redirect to list of topics
        }
      },
      submitComment(){
        axios.post('/comment/'+this.id, {content: this.comment},
          {
            headers: {'x-access-token': localStorage.getItem('token')}
          })
          .then(response => {
            // redirect to topic page
            console.log(response)
            this.comments.unshift(response.data)
          })
          .catch(response => {
            console.log(response)
          })
      },
      commentList(){
        axios.get('/comments/'+this.id)
          .then(response => {
            console.log(response)
            this.comments = response.data.comments
          })
          .catch(response => {
            console.log(response)
          })
      }
    }
  }
</script>

<style scoped>

</style>
