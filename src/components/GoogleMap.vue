// This component creates the Google map,
// loads the location marker,
// fetches the sport places from the Decathlon Sports Places API,
// and loads the sport places markers on the map
<template>
  <div>

    <div>
      <h2 class="main-heading-wrapper">Wanna play Ice Hockey today?</h2>
      <p class="sub-heading-wrapper"><i>Many Ice Hockey places have already been added in Montreal!! Search and explore...</i></p>
      <label class="label-wrapper">
        <!-- Autocompletes the location from Google Places -->
        <gmap-autocomplete
          @place_changed="setPlace">
        </gmap-autocomplete>
        <button @click="addMarker">Add</button>
      </label>
      <br/>
    </div>

    <br>

    <!-- Creates the vue-google-map -->
    <gmap-map
      :center="center"
      :zoom="12"
      style="width:100%;  height: 400px;"
    >
      <gmap-marker
        :key="index"
        v-for="(m, index) in markers"
        :position="m.position"
        @click="center=m.position"
      ></gmap-marker>
    </gmap-map>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: "GoogleMap",
  data() {
    return {
      // default to Montreal to keep it simple
      // change this to whatever makes sense
      center: { lat: 45.508, lng: -73.587 },
      markers: [],
      places: [],
      currentPlace: null,
      sportPlaces: [],
      errors: []
    };
  },

  mounted() {
    this.geolocate()
  },

  // Makes API resquest with Axios, when the component is created
  created() {
    // Hardcoded for Ice Hockey places in Montreal to keep it simple
    // the query parameters (origin, radius and sports) should be dynamic,
    // based on users location and sport choice
    axios.get(`https://sportplaces.api.decathlon.com/api/v1/places?origin=-73.582,45.511&radius=99&sports=175`)
    .then(response => {
      // JSON responses are automatically parsed.
      this.sportPlaces = response.data.data.features
    })
    .catch(e => {
      this.errors.push(e)
    })
  },

  methods: {
    // Receives a place object via the autocomplete component
    setPlace(place) {
      this.currentPlace = place;
    },

    // Loads the markers on the map
    addMarker() {
      if (this.currentPlace) {
        const marker = {
          lat: this.currentPlace.geometry.location.lat(),
          lng: this.currentPlace.geometry.location.lng()
        };
        this.markers.push({ position: marker });
        this.places.push(this.currentPlace);
        this.center = marker;
        this.currentPlace = null;
        // if sportplaces exist in that location
        // but here it is hardcoded Montreal places
        if(this.sportPlaces) {
          this.sportPlaces.forEach(place => {
            const sportPlaceMarker = {
            lng: place.geometry.coordinates[0],
            lat: place.geometry.coordinates[1]
          };
          this.markers.push({ position: sportPlaceMarker });
          })
        }
      }
    },

    // Geolocates the current position
    geolocate: function() {
      navigator.geolocation.getCurrentPosition(position => {
        this.center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
      });
    }

  }
};
</script>

<style>
.main-heading-wrapper {
  text-align: center;
  color: #42a9f4;
}

.sub-heading-wrapper {
  text-align: center;
}

.label-wrapper {
  display: table;
  margin-left: auto;
  margin-right: auto;
}
</style>