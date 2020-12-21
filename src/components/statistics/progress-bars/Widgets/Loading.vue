<template>
  <va-card
    class="circle-bars"
  >
   <v-layout row justify-center>
      <v-dialog v-model="loading" persistent fullscreen 
      >

        <v-container fill-height>
          <v-layout row justify-center align-center>
            <v-progress-circular indeterminate :size="70" :width="7" color="blue"></v-progress-circular>
          </v-layout>
        </v-container>
      </v-dialog>
    </v-layout>
  </va-card>
</template>

<script>
export default {
  name: 'circle-bars',
  data () {
    return {
      dialog: false,
      loading: true,
      color: '#303030',
    }
  },
  mounted () {
    //this.animateValue()
  },
  methods: {
    animateValue () {
      setTimeout(() => {
        this.value = 100
      })
    },
  },
}
</script>
