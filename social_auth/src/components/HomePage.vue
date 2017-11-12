<template>
  <div>
    <h1>Welcome User</h1>
    <a href="#" v-if="isLoggedIn" @click="logout">Logout</a> 
  </div>
</template>
<script>
export default {
  methods: {
    logout() {
     this.$store.dispatch('logout').then(() => {
            this.$router.push({name: 'login'})
        });
    }
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters.isLoggedIn;
    }
  }
}
</script>

