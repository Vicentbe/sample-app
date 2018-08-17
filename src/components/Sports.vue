// This component displays the Decathlon Sports list
// Fetches the sports data from Decathlon Sports API
// (https://sportplaces.api.decathlon.com/api/v1/sports)
<template>
  <div>
    <p class="accessible-sports">Decathlon is making <b>{{sports.length}} sports</b> more accesible for you!!</p>
    <p class="list-of-sports-heading"><i>Here's the list of all the sports</i></p>
    <div class="sports-list">
      <!-- Displays the sports list by looping over the sports array -->
      <div class="sports-item" v-for="sport in sports" v-bind:key="sport.id">
        <p class="sport-name"><i>{{sport.name}}</i></p>
      </div>
    </div>

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

<style>
.list-of-sports-heading {
  text-align: center;
}

.accessible-sports {
  text-align: center;
  font-size: 25px;
  font-weight: 700;
  color: #42a9f4;
}

.sports-list {
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
}

.sports-item {
  margin: 50px;
  background-color: #42a9f4;
  min-width: 150px;
  color: white;
}

.sport-name {
  max-width: 150px;
  text-align: center;
}

</style>
