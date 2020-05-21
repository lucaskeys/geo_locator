<template>
  <div class="login container">
    <form class="card-panel" @submit.prevent="login">
      <h2 class="center deep-purple-text">Login</h2>
      <div class="field">
        <label for="email">Email:</label>
        <input type="email" name="email" v-model="email">
      </div>
      <div class="field">
        <label for="password">Password:</label>
        <input type="password" name="password" v-model="password">
      </div>
      <p v-if="feedback" class="red-text center">{{feedback}}</p>
      <div class="field center">
        <button class="btn deep-purple">
          login
        </button>
      </div>
    </form>
  </div>
</template>
<script>
import db from '@/firebase/init'
import firebase from 'firebase'
name: 'Login'
export default {
    data() {
      return {
        password: null,
        email: null,
        feedback: null
      }
    },
    methods: {
      login() {
        if(this.email && this.password) {
          firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(cred => {
            console.log(cred.user)
            this.$router.push({name: 'GMap'})
          }).catch(error => {
            this.feedback = error.message
          })
          this.feedback = null
        } else {
          this.feedback = "Enter your login information"
        }
      }
    }
  }
</script>
 <style>

 </style> 