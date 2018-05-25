<template>
  <div>
    <div class="columns">
      <div class="column is-offset-2 is-8">
        <article class="message">
          <div class="message-header">
            <p>Submit New Topic</p>
          </div>
          <div class="message-body">
            <form @submit.prevent="submit">
              <div class="field">
                <label class="label">Title</label>
                <div class="control">
                  <input class="input" type="text" placeholder="Title" v-model="title">
                </div>
              </div>
              <div class="field">
                <label class="label">Message</label>
                <div class="control">
                  <textarea class="textarea" placeholder="Message" v-model="message"></textarea>
                </div>
              </div>
              <button class="button is-primary">Submit</button>
            </form>
          </div>
        </article>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    name: "SubmitTopic",
    data() {
      return {
        title: '',
        message: ''
      }
    },
    methods: {
      submit(){
        console.log(this.title, this.message)
        axios.post('/topic', {
          title: this.title,
          content: this.message
        },
          {
            headers: {'x-access-token': localStorage.getItem('token')}
          })
          .then(response => {
            console.log(response)
          })
          .catch(response => {
            console.log(response.response.data.message)
          })
      }
    }
  }
</script>

<style scoped>

</style>
