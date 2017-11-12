<template>
  <div>
    <section class="hero is-primary is-fullheight">
        <!-- Hero content: will be in the middle -->
        <div class="hero-body">
            <div class="container has-text-center">
                <h1 class="subtitle">
                    <fb-signin-button
                      :params="fbSignInParams"
                      @success="onSignInSuccess"
                      @error="onSignInError">
                      <i class="fa fa-facebook" aria-hidden="true"></i> Sign in with Facebook
                    </fb-signin-button>
                </h1>
            </div>
        </div>
    </section>
  </div>
</template>

<script>
import FBSignInButton from 'vue-facebook-signin-button'

export default {
  components: {
     FBSignInButton
   },
  data () {
    return {
      fbSignInParams: {
        scope: 'email',
        return_scopes: true
      }
    }
  },
  methods: {
    onSignInSuccess (res) {
        this.$store.dispatch("login", {
            accessToken: res.authResponse.accessToken
        }).then(() => {
            console.log('login successful!!')
        });
    },
    onSignInError (error) {
      console.log('OH NOES', error)
    }
  }
}
</script>

<style>
.fb-signin-button {
  display: inline-block;
  padding: 4px 8px;
  border-radius: 3px;
  background-color: #4267b2;
  color: #fff;
  cursor:pointer;
}
</style>