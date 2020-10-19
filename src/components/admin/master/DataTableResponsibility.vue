<template>
  <va-card :title="'List Responsibility'">
    <v-data-table
      v-model="selected"
      :headers="fields"
      :items="listResponsibility"
      :single-select="singleSelect"
      item-key="RESPONSIBILITY_NAME"
      show-select
      @click:row="edit"
      class="elevation-1"
    >

    </v-data-table>

    <va-modal
      v-model="editResponsibilityModal"
      size="large"
      :title="'Edit Responsibility'"
      :hideDefaultActions=true>

      <form>

        <va-input v-model="resp_name" placeholder="Responsibility Name">
        </va-input>
        <va-input v-model="resp_desc" placeholder="Responsibility Description">
        </va-input>
        <va-checkbox v-model="active_flag" label="Active Flag" />
        <va-button  type="button" color="danger" @click="close_modal()"> Cancel</va-button>
        <va-button  type="button" color="success" @click="update()"> Submit</va-button>

      </form>
    </va-modal>
  </va-card>

</template>

<script>

import axios from 'axios'
import Swal from 'sweetalert2/dist/sweetalert2.js'

import 'sweetalert2/src/sweetalert2.scss'
export default {
  data () {
    return {
      isFound: false,
      editResponsibilityModal: false,
      pindah: [],
      selected: [],
      singleSelect: true,
      resp_id: '',
      active_flag1: '',
      resp_desc: '',
      active_flag: false,
      resp_name: '',
    }
  },
  created () {
  },
  props: {
    listResponsibility: Array,

  },
  computed: {
    fields () {
      return [

        {
          value: 'COMPANY',
          text: 'Company',
        }, {
          value: 'CABANG',
          text: 'Cabang',
        },
        {
          value: 'ROLE',
          text: 'Role',
        },
        {
          value: 'MENU',
          text: 'Menu',
        },
        {
          value: 'RESP',
          text: 'Resp',
        },
        {
          value: 'RESP_DESC',
          text: 'Resp Desc',
        },
        {
          value: 'ACTIVE',
          text: 'Active Flag',
        },
        {
          value: 'ACTIVE_DATE',
          text: 'Active Date',
        },
        {
          value: 'INACTIVE_DATE',
          text: 'Inactive Date',
        },
      ]
    },
  },
  methods: {
    edit (data) {
      this.resp_id = data.RESPONSIBILITY_ID
      this.resp_name = data.RESP
      this.resp_desc = data.RESP_DESC
      if (data.ACTIVE === 'Y') {
        this.active_flag1 = 'Y'
        this.active_flag = true
      } else {
        this.active_flag1 = 'N'
        this.active_flag = false
      }
      this.editResponsibilityModal = true
    },
    close_modal () {
      this.editResponsibilityModal = false
    },
    update () {
      if (this.active_flag === true) {
        this.active_flag1 = 'Y'
      } else {
        this.active_flag1 = 'N'
      }

      if (this.resp_name !== '' && this.resp_desc !== '' && this.active_flag1 !== '') {
        axios({
          method: 'post',
          url: 'http://localhost:8000/update_data_resp/',
          data: {

            resp_id: this.resp_id,
            resp_name: this.resp_name,
            resp_desc: this.resp_desc,
            active_flag: this.active_flag1,
            user_id: this.$session.get('id'),
          },
          headers: {
            Authorization: 'Bearer ' + this.$session.get('token'),
          },
        })
          .then(response => {
            this.close_modal()
            Swal.fire({
              title: 'Success!',
              text: 'Responsibility berhasil diupdate.',
              icon: 'success',
            })
            this.get_role()
            console.log(response.data)
          })
          .catch(error => {
            console.log(error.response)
          })
      } else {
        Swal.fire({
          title: 'Warning!',
          text: 'Harap mengisi data dengan lengkap.',
          icon: 'warning',
          confirmButtonText: 'OK',
        })
      }
    },
  },
}
</script>

<style lang="scss">
</style>
