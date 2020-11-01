<template>
  <va-card>
    <v-data-table
      v-model="selected"
      :headers="fields"
      :items="data_user"
      :single-select="singleSelect"
      item-key="USERNAME"
      @click:row="select"
      class="elevation-1"
    >

    </v-data-table>

  </va-card>
</template>

<script>
import {
  serverBus,
} from '../../../router/index.js'
import axios from 'axios'
export default {
  data () {
    return {
      data_user: [],
      pindah: [],
      role: [],
      singleSelect: true,
      selected: [],
    }
  },
  created () {
    this.get_username()
  },
  computed: {
    fields () {
      return [

        {
          value: 'USERNAME',
          text: 'Username',
        }, {
          value: 'ROLE_NAME',
          text: 'Role',
        },
        {
          value: 'EMAIL',
          text: 'Email',
        },
        {
          value: 'ACTIVE_FLAG',
          text: 'Active Status',
        },
        {
          value: 'ACTIVE_DATE',
          text: 'Effective Date',
        },
        {
          value: 'USER_EXPR',
          text: 'Period Access',
        }]
    },
  },
  methods: {
    onChildClick (value) {
      this.pindah = value
    },
    select: function (test) {
      if (test.ACTIVE_FLAG === 'Y') {
        test.active_flag = true
      } else {
        test.active_flag = false
      }
      this.pindah.push({ showUserModal: false, username: test.USERNAME, role: test.ROLE_NAME, active_flag: test.active_flag, email: test.EMAIL, active_date: test.ACTIVE_DATE })

      serverBus.$emit('onChildClick', this.pindah)
    },

    get_username: function () {
      axios({
        method: 'get',
        url: 'http://localhost:8000/get_list_username/',
        data: {

        },
        headers: {
          Authorization: 'Bearer ' + this.$session.get('token'),
        },
      })
        .then(response => {
          this.data_user = []
          this.data = response.data
          this.data.forEach(item => {
            this.data_user.push({
              USERNAME: item.USERNAME,
              ROLE_NAME: item.ROLE_NAME,
              ROLE_ID: item.ROLE_ID,
              USER_EXPR: item.USER_EXPR,
              USER_EXPR_COUNTER: item.USER_EXPR_COUNTER,
              ACTIVE_FLAG: item.ACTIVE_FLAG,
              ACTIVE_DATE: item.ACTIVE_DATE,
              EMAIL: item.EMAIL,
            })
          })
        })
        .catch(error => {
          console.log(error.response)
        })
    },
  },
}
</script>

<style lang="scss">
</style>
