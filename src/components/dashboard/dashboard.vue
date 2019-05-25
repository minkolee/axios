<template>
  <div id="dashboard">
    <h1>That's the dashboard!</h1>
    <p v-if="!userdata">You should only get here if you're authenticated!</p>
    <p v-if="userdata" v-for="user in userdata">{{user}}</p>
  </div>
</template>

<script>
  export default {
    computed:{
      userdata: function () {
        return this.$store.state.userdata;
      }
    },
    created() {
      this.$store.dispatch('fetchUser').then(()=>console.log("getUser执行完毕"));
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
