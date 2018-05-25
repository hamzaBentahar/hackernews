<template>
  <div>
    <div class="columns" style="margin-top: 20px">
      <div class="column is-offset-4 is-4">
        <button @click="login" class="loginBtn loginFb">Login with facebook</button>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from "axios"
  import jwt from 'jsonwebtoken'

  export default {
    name: "Login",
    methods: {
      login() {
        var that = this
        FB.login(function (response) {
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
  .loginFb {
    background-color: #4C69BA;
    background-image: linear-gradient(#4C69BA, #3B55A0);
    /*font-family: "Helvetica neue", Helvetica Neue, Helvetica, Arial, sans-serif;*/
    text-shadow: 0 -1px 0 #354C8C;
  }
  .loginFb:before {
    border-right: #364e92 1px solid;
    background: url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/14082/icon_facebook.png') 6px 6px no-repeat;
  }
  .loginFb:hover,
  .loginFb:focus {
    background-color: #5B7BD5;
    background-image: linear-gradient(#5B7BD5, #4864B1);
  }

</style>

