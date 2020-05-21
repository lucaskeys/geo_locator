<template>
  <div class="map">
    <div class="google-map" id="map">

    </div>
  </div>
</template>
<script>
import firebase from 'firebase'
import db from '@/firebase/init'
export default {
  name: 'GMap',
  data() {
    return {  
      lat: null,
      lng: null
    }
  },
  methods: {
    renderMap() {
      const map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: this.lat, lng: this.lng },
        zoom: 12,
        maxZoom: 20,
        minZoom: 3,
        streetViewControl: false
      })

      db.collection('users').get().then(users => {
        users.docs.forEach(doc => {
          let data = doc.data()
          if(data.geolocation) {
            let marker = new google.maps.Marker({
              position: {
                lat: data.geolocation.lat,
                lng: data.geolocation.lng
              },
              map: map
            })
            // add click event to marker
            marker.addListener('click', () => {
              this.$router.push({name: 'ViewProfile', params: {id: doc.id}})
            })
          }
        })
      })
    }
  },
  mounted() {
    // get current user
    let user = firebase.auth().currentUser



    console.log(user, 'this is the curent user')

    // This just tests to see how long it takes for firebase to initialize the auth after the component is mounted. That is why it starts with null then shows the logged in user two seconds later.
    // setTimeout(() => {
    //   console.log(firebase.auth().currentUser)
    // }, 2000)


  // Check if the API exists in browser - browser support
    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.lat = position.coords.latitude
        this.lng = position.coords.longitude
        // find user record and update geo coordinates
        db.collection('users').where('user_id', '==', user.uid).get().then(snapshot => {
          snapshot.forEach(doc => {
            db.collection('users').doc(doc.id).update({
              geolocation: {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
              }
            })
          })
        }).then(() => {
        this.renderMap()
        })
      }, (error) => {
        console.log(error)
        this.renderMap()
      }, {
        maximumAge: 60000, 
        timeout: 6000,
      })
     
    } else {
      // position center by default value
      this.renderMap()
    }
  }
}
</script>
<style>
.google-map {
  width: 100%;
  height: 100%;
  margin: 0 auto;
  background: #fff;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
}
</style>