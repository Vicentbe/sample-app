// This component displays the Decathlon Sport list
// Fetches the sports data from Decathlon Sports API
// (https://sportplaces.api.decathlon.com/api/v1/sports)
<template>
  <div>
    <p>Decathlon is making <b>{{sports.length}} sports</b> more accesible for you!!</p>
    <p><i>Here's the list of all the sports</i></p>
    <ul>
      <!-- Displays the sports list by looping over the sports array -->
      <li v-for="sport in sports" v-bind:key="sport.id">
        <p>{{sport.name}}</p>
      </li>
    </ul>

  </div>
</template>

<script>
import vue from 'vue';
import axios from 'axios';

export default {
  name: "Sport",
  data() {
    return {
      sports: [],
      errors: [],
    }
  },

  created() {
    axios.get(`https://sportplaces.api.decathlon.com/api/v1/sports`)
    .then(response => {
      // JSON responses are automatically parsed.
      this.sports = response.data
    })
    .catch(e => {
      this.errors.push(e)
    })
  }
}
</script>
