<template>
  <div id="app" class="app">
    <router-view />
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'app',
  data () {
    return {
      // Temporary config for 2.1.
      contextConfig: {
        gradient: true,
        shadow: 'lg', // 3 states: 'sm', 'lg', undefined (no shadow).
        invertedColor: false,
      },
    }
  },
  beforeCreate: function () {
    if (!this.$session.exists() && this.$router.name) {
      this.$router.push('/')
    }
  },
  provide () {
    return {
      contextConfig: this.contextConfig,
    }
  },
  methods: {
    refreshAccessToken () {
      const options = {
        url: 'http://localhost:8000/api/refresh',
        method: 'post',
        headers: {
          Authorization: 'Bearer ' + this.$session.get('token'),
        },
      }

      axios(options)
        .then((response) => {
          this.$session.set('token', response.data.token)
        })
        .catch((e) => {
          //
          alert(e + 'Failed to Refresh Token')
          this.$router.push('/')
          this.$session.destroy()
        })
    },
  },
  created: function () {
    axios.interceptors.request.use(
      (config) => {
        console.log('Req Intercept' + JSON.stringify(config))
        return config
      },
      (error) => Promise.reject(error),
    )

    // axios.interceptors.response.use(
    //   (response) => {
    //     console.log("Res Intercept" + JSON.stringify(response));
    //     return response;
    //   },
    //   (error) => {
    //     const originalRequest = error.config;
    //     // console.log(JSON.stringify(error.response.data.refresh.token));
    //     if (error.response.status == 401) {
    //       //Set New Token
    //       let token = error.response.data.refresh.token;
    //       this.$session.set("token", token);
    //       // console.log('OLD ' + JSON.stringify(originalRequest));

    //       // axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    //       // axios.defaults['Authorization'] = 'Bearer ' + token;
    //       originalRequest.headers["Authorization"] = "Bearer " + token;
    //       console.log("NEW " + JSON.stringify(originalRequest));
    //       return axios(originalRequest);
    //     } else {
    //       alert("Failed to Refresh Token");
    //       this.$router.push("/");
    //       this.$session.destroy();
    //       return Promise.reject(error);
    //     }
    //     // this.cover = false
    //   }
    // );
  },
  watch: {
    // Temporary colors fix for 2.1.
    'contextConfig.invertedColor' (val) {
      const invertedColorClass = 'va-inverted-color'
      if (val) {
        document.body.classList.add(invertedColorClass)
      } else {
        document.body.classList.remove(invertedColorClass)
      }
    },
  },
}
</script>

<style lang="scss">
@import "../sass/main.scss";

body {
  height: 100%;

  #app {
    height: 100%;
  }
}
</style>
