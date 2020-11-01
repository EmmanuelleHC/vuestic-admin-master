<template>
  <va-card>
    <v-data-table
      v-model="selected"
      :headers="fields"
      :items="data_list_user_resp"
      :single-select="singleSelect"
      item-key="RESPONSIBILITY_ID"
      @click:row="choose"
      class="elevation-1"
    >

    </v-data-table>
  </va-card>
</template>

<script>
import {
  serverBus,
} from '../../../router/index.js'
import Swal from 'sweetalert2/dist/sweetalert2.js'

import 'sweetalert2/src/sweetalert2.scss'
export default {
  data () {
    return {
      isFound: false,
      pindah: [],
      singleSelect: true,
      selected: [],
    }
  },
  created () {

  },
  props: {
    data_list_user_resp: Array,
    data_list_user_resp_temp: Array,
  },
  computed: {
    fields () {
      return [
        {
          value: 'RESPONSIBILITY_NAME',
          text: 'Resp Name',
        }, {
          value: 'RESPONSIBILITY_DESC',
          text: 'Resp Desc',
        },
        {
          value: 'BRANCH_NAME',
          text: 'Branch',
        },
        {
          value: 'COMPANY_NAME',
          text: 'Company',
        },
        {
          value: 'ACTIVE_FLAG',
          text: 'Active Flag',
        },
        {
          value: 'ACTIVE_DATE',
          text: 'Effective Date',
        },
        {
          value: 'INACTIVE_DATE',
          text: 'Ineffective Date',
        }]
    },
  },
  methods: {
    choose: function (val) {
      var length = this.data_list_user_resp_temp.length
      this.isFound = false
      for (var i = 0; i < length; i++) {
        if (this.data_list_user_resp_temp[i].RESPONSIBILITY_NAME === val.RESPONSIBILITY_NAME) {
          this.isFound = true
        }
      }
      if (this.isFound === false) {
        this.data_list_user_resp_temp.push({
          RESPONSIBILITY_NAME: val.RESPONSIBILITY_NAME,
          BRANCH_NAME: val.BRANCH_NAME,
          COMPANY_NAME: val.COMPANY_NAME,
          ACTIVE_FLAG: val.ACTIVE_FLAG,
          ACTIVE_DATE: val.ACTIVE_DATE,
          INACTIVE_DATE: val.INACTIVE_DATE,
        })
      } else {
        Swal.fire({
          title: 'Warning!',
          text: 'Anda sudah memilih responsibility tsb.',
          icon: 'warning',
          confirmButtonText: 'OK',
        })
        this.isFound = false
      }

      this.pindah.push({ isListResp: false })
      serverBus.$emit('onChildClick3', this.pindah)
    },
    onChildClick3 (value) {
      this.pindah = value
    },

  },
}
</script>

<style lang="scss">
</style>
