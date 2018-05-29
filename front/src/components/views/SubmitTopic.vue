<template>
  <div>
    <div class="columns">
      <div class="column is-offset-2 is-8">
        <div class="notification is-danger" v-for="(error, index) in errors">
          <button class="delete" @click="deleteNotification(index)"></button>
          {{ error }}
        </div>
        <article class="message">
          <div class="message-header">
            <p>Submit New Topic</p>
          </div>
          <div class="message-body">
            <form @submit.prevent="submit">
              <div class="field">
                <label class="label">Title</label>
                <div class="control">
                  <input class="input" type="text" placeholder="Title" v-model="submitForm.title">
                </div>
              </div>
              <div class="field">
                <label class="label">Message</label>
                <div class="control">
                  <textarea class="textarea" placeholder="Message" v-model="submitForm.message"></textarea>
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
        submitForm: {
          title: '',
          message: ''
        },
        errors: []
      }
    },
    methods: {
      submit(){
        // submit topic
        axios.post('/topic', this.submitForm,
          {
            headers: {'x-access-token': localStorage.getItem('token')}
          })
          .then(response => {
            this.$toasted.show('Topic created!') // Show notification
            this.$router.push({name: 'topic', params: {id: response.data.id }}) // redirect to topic page
          })
          .catch(response => {
            this.errors = []
            this.errors.push(response.response.data.message) // display errors
          })
      },
      deleteNotification(index){
        this.errors.splice(index, 1) // Delete notification
      }
    }
  }
</script>

<style scoped>

</style>
