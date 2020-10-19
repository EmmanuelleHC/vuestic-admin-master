<template>
  <div class="inq-p3at">
    <va-card>

      <div class="row">

        <data-table-P3AT :listTrx="listTrx"
          class="mb-4"/>
      </div>

    </va-card>

  </div>

</template>

<script>
import {
  serverBus,
} from '../../router/index.js'
import axios from 'axios'
import Swal from 'sweetalert2/dist/sweetalert2.js'

import 'sweetalert2/src/sweetalert2.scss'
import DataTableP3AT from '../../../components/user/P3AT/transaction/DataTableP3AT.vue'
export default {
  name: 'inq_p3at',
  components: {
    DataTableP3AT,
  },
  data () {
    return {
      listTrx: [],
    }
  },
  mounted () {
    this.get_role()
  },
  created: function () {

  },
  methods: {
    get_role: function () {
      axios({
        method: 'get',
        url: 'http://localhost:8000/get_list_role/',
        data: {
        },
        headers: {
          Authorization: 'Bearer ' + this.$session.get('token'),
        },
      })
        .then(response => {
          this.listRole = []
          this.data = response.data
          this.data.forEach(item => {
            this.listRole.push({ ROLE_NAME: item.ROLE_NAME, ID: item.ROLE_ID, ROLE_DESC: item.ROLE_DESC })
          })
        })
        .catch(error => {
          console.log(error.response)
        })
    },
  },
}
</script>

<style>
.row.row-inside {
  max-width: none;
}
</style>
