<template>
  <div id="dashboard">
    <h1>That's the dashboard!</h1>
    <p>You should only get here if you're authenticated!</p>
    <ol>
    <li v-for="user in info">{{user}}</li>
    </ol>
  </div>
</template>

<script>
  import axios from 'axios';
  export default {
    data: function () {
      return {
        info: ""
      }
    },
    created() {
      axios.get('/user-admin.json')
              .then(res => {
                this.info = res.data;
              })
              .catch(err => console.log(err));

    }
  }
</script>

<style scoped>
  h1, p {
    text-align: center;
  }

  p {
    color: red;
  }
</style>
