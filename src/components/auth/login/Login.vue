<template>
    
<div>
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
  <v-layout row justify-center>
      <v-dialog v-model="loading" persistent fullscreen 
      >

        <v-container fill-height>
          <v-layout row justify-center align-center>
            <v-progress-circular indeterminate :size="70" :width="7" color="purple"></v-progress-circular>
          </v-layout>
        </v-container>
      </v-dialog>
    </v-layout>
    </div>
      

</template>

<script>
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'
import axios from 'axios'
export default {
  name: 'login',
  data () {
    return {
      username: '',
      password: '',
      dialog: false,
      loading: false,
      color: '#303030',
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
      this.loading=true
      this.usernameErrors = this.username ? [] : ['Username is required']
      this.passwordErrors = this.password ? [] : ['Password is required']
      if (!this.formReady) {

      } else {
        const formData = new FormData()
        formData.append('username', this.username.trim())
        formData.append('password', this.password)

        const options = {
          url: 'http://sd6webdev.indomaret.lan:8000/auth/login',
          method: 'post',
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          data: formData,
        }

        axios(options)
          .then(response => {
            const token = response.data.token
            if (token) {
              this.$session.set('role', response.data.role_id)
              this.$session.set('token', response.data.token)
              this.$session.set('id', response.data.user_id)
              this.$session.set('resp_id', response.data.resp_id)
              this.$session.set('username', response.data.username)
              if (response.data.role_id === 1) {

                  this.$router.push({ name: 'Admin' })
                this.loading=false
              } else if (response.data.role_id === 2) {
                this.$router.push({ name: 'User' })
                this.loading=false
              }
              // window.location.reload();
            }
          })
          .catch(e => {
             Swal.fire({
                  title: 'Error!',
                  text: 'username / password yang dimasukkan salah',
                  icon: 'error',
                })
             console.log(e)
            // alert(
            //   e +
            //     '\n' +
            //     'username / password yang dimasukkan salah.',
            // )
            this.loading=false
          })
      }
    },
  },
}
</script>

