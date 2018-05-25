<template>
  <div class="hello">
    <div class="columns">
      <div class="column is-10 is-offset-1">
        <table class="table is-striped is-hoverable is-fullwidth">
          <thead>
          <tr>
            <th colspan="2">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus at earum expedita laborum, magnam nostrum.</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td>Lorem ipsum dolor sit amet.</td>
            <td>Lorem ipsum dolor sit amet.</td>
          </tr>
          <tr>
            <td>Lorem ipsum dolor sit amet.</td>
            <td>Lorem ipsum dolor sit amet.</td>
          </tr>
          <tr>
            <td>Lorem ipsum dolor sit amet.</td>
            <td>Lorem ipsum dolor sit amet.</td>
          </tr>
          <tr>
            <td>Lorem ipsum dolor sit amet.</td>
            <td>Lorem ipsum dolor sit amet.</td>
          </tr>
          <tr>
            <td>Lorem ipsum dolor sit amet.</td>
            <td>Lorem ipsum dolor sit amet.</td>
          </tr>
          <tr>
            <td>Lorem ipsum dolor sit amet.</td>
            <td>Lorem ipsum dolor sit amet.</td>
          </tr>
          <tr>
            <td>Lorem ipsum dolor sit amet.</td>
            <td>Lorem ipsum dolor sit amet.</td>
          </tr>
          <tr>
            <td>Lorem ipsum dolor sit amet.</td>
            <td>Lorem ipsum dolor sit amet.</td>
          </tr>
          <tr>
            <td>Lorem ipsum dolor sit amet.</td>
            <td>Lorem ipsum dolor sit amet.</td>
          </tr>
          <tr>
            <td>Lorem ipsum dolor sit amet.</td>
            <td>Lorem ipsum dolor sit amet.</td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from "axios"
  import jwt from 'jsonwebtoken'

  export default {
    name: 'Home',
    created() {
      Event.$on('fbInit', () => {
        var that = this
        FB.getLoginStatus(function (response) {
          console.log(that.isLogged(response.status))
        })
      })
    },
    mounted() {
    },
    data() {
      return {
        msg: 'Welcome to Your Vue.js App'
      }
    },
    methods: {
      isLogged(status) {
        switch (status) {
          case 'connected':
            return "Connected user"
            break
          case 'not_authorized':
            return "Not authorized"
            break
          case 'unknown':
            return 'Not logged in'
            break
          default:
            return 'error'
        }

      },
      fbLogin() {
        var that = this
        FB.fbLogin(function (response) {
          axios.post('/auth/facebook', {
            'access_token': response.authResponse.accessToken
          })
            .then((response) => {
              console.log(response.data)
              var token = jwt.decode(response.data)
              console.log(token)
              localStorage.setItem('token', response.data)
            })
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
