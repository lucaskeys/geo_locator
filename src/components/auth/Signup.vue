<template>
  <div class="signup container">
    <form class="card-panel" @submit.prevent="signup">
      <h2 class="center deep-purple-text">Signup</h2>
      <div class="field">
        <label for="email">Email:</label>
        <input type="email" name="email" v-model="email">
      </div>
      <div class="field">
        <label for="password">Password:</label>
        <input type="password" name="password" v-model="password">
      </div>
      <div class="field">
        <label for="username">Username:</label>
        <input type="text" name="username" v-model="username">
      </div>
      <p v-if="feedback" class="red-text center">{{feedback}}</p>
      <div class="field center">
        <button class="btn deep-purple">
          Signup
        </button>
      </div>
    </form>
  </div>
</template>
<script>
import db from '@/firebase/init'
import slugify from 'slugify'
import firebase from 'firebase'
name: 'Signup'
export default {
    data() {
      return {
        email: null,
        password: null,
        username: null,
        feedback: null,
        slug: null
      }
    },
    methods: {
      signup() {
        if(this.username && this.email && this.password) {
          this.slug = slugify(this.username, {
            replace: '-',
            remove: /[$*_+~()'"!\-:@]/g,
            lower: true
          })
          let ref = db.collection('users').doc(this.slug)
          ref.get().then(doc => {
            if(doc.exists) {
              this.feedback = "This username already exists!"
            } else {
              firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then(cred => {
                ref.set({
                  username: this.username,
                  geolocation: null,
                  user_id: cred.user.uid
                }).then(() => {
                  this.$router.push({name: 'GMap'})
                })
              }).catch(error => {
                console.log(error)
                this.feedback = error.message
              })
            }
          })
        } else {
          this.feedback = "You must enter all felds"
        }
      }
    }
  }
</script>
 <style>
  .signup {
    max-width: 450px;
    margin-top: 60px;
  }
  .signup h2 {
    font-size: 2.4em;
  }
  .signup .field {
    margin-bottom: 16px;
  }
 </style> 