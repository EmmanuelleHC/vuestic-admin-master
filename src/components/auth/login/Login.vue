<template>
  <form @submit.prevent="onsubmit">
    <va-input
      v-model="username"
      type="text"
      :label="$t('Username')"
      :error="!!usernameErrors.length"
      :error-messages="usernameErrors"
    />

    <va-input
      v-model="password"
      type="password"
      :label="$t('auth.password')"
      :error="!!passwordErrors.length"
      :error-messages="passwordErrors"
    />

  

    <div class="d-flex justify--center mt-3">
      <va-button type="submit" class="my-0">{{ $t('auth.login') }}</va-button>
    </div>
  </form>
</template>

<script>

import axios from "axios";
export default {
  name: 'login',
  data () {
    return {
      username: '',
      password: '',
      keepLoggedIn: false,
      usernameErrors: [],
      passwordErrors: [],
    }
  },
  computed: {
    formReady () {
      return !this.usernameErrors.length && !this.passwordErrors.length
    },
  },
  methods: {
    onsubmit () {
      this.usernameErrors = this.username ? [] : ['Username is required']
      this.passwordErrors = this.password ? [] : ['Password is required']
      if (!this.formReady) {
        return
      }else{
        let formData = new FormData();
        formData.append("username", this.username.trim());
        formData.append("password", this.password);

        const options = {
          url: "http://localhost:8000/auth/login",
          method: "post",
          headers: {
            "Content-Type": "multipart/form-data"
          },
          data: formData
        };

        axios(options)
          .then(response => {
            const token = response.data.token;
            if (token) {
              this.$session.set("role", response.data.role_id);
              this.$session.set("token", response.data.token);
              this.$session.set("id", response.data.user_id);
              this.$session.set("resp_id", response.data.resp_id);
              if (response.data.role_id == 1) {
                console.log("Login as Admin");
                 this.$router.push({ name: 'Admin' })
                
              } else if (response.data.role_id == 2) {
                console.log("Login as User");
                this.$router.push({ name: "User" });
              }
              window.location.reload();
            }
          })
          .catch(e => {
            alert(
              e +
                "\n" +
                "username / password yang dimasukkan salah."
            );
          });
      
      }

     
    },
  },
}
</script>

<style lang="scss">
</style>
