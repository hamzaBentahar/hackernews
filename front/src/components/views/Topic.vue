<template>
    <div>
      <div v-if="topic !== null">
        <article class="message is-dark">
          <div class="message-header">
            <p class="is-pulled-right">↑ {{ topic.title}} (0 points - mminutes ago)</p>
          </div>
          <div class="message-body">
            {{ topic.content }}
          </div>
        </article>
        <form>
          <div class="columns">
            <div class="column is-half">
              <textarea class="textarea" placeholder="Write your comment here"></textarea>
              <br>
              <button class="button is-primary is-pulled-right">Submit</button>
            </div>
          </div>
        </form>
        <hr>
        <article class="message is-dark">
          <div class="message-header">
            <p class="is-pulled-right">Comment title</p>
          </div>
          <div class="message-body">
            Comment topic
          </div>
        </article>
      </div>
    </div>
</template>

<script>
  import axios from 'axios'
  export default {
    name: "Topic",
    props: ['id'],
    data(){
      return {
        topic: null
      }
    },
    watch: {
      '$route': 'info'
    },
    created(){
      this.info()
    },
    methods: {
      info(){
        if (Number.isInteger(parseInt(this.id))){
          axios.get('/topic/'+this.id)
            .then(response => {
              console.log(response)
              this.topic = response.data.topic
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
      }
    }
  }
</script>

<style scoped>

</style>
