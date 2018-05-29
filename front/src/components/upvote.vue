<template>
  <a href="#" @click.prevent="upvote">↑</a>
</template>

<script>
  import axios from 'axios'
  export default {
    name: "upvote",
    props: ['topicId'],
    methods: {
      upvote(){
        axios.post('/topic/upvote', {id: this.topicId} , {headers: {'x-access-token': localStorage.getItem('token')}})
          .then(response => {
            Event.$emit('upvotedTopic', {topicId: this.topicId, totalUpvotes: response.data})
          })
          .catch(response => {
            this.$toasted.show('You have already upvoted this topic')
            console.log(response.response.data)
          })
      }
    }
  }
</script>
