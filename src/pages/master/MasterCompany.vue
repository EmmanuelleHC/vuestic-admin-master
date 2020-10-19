<template>
  <div class="master-company">
    <va-card>
      <va-button  type="button" color="success" @click="addCompany()">Add </va-button>

      <div class="row">

        <data-table-company :listCompany="listCompany"
          class="mb-4"/>
      </div>

    </va-card>
    <div>
      <va-modal
        v-model="showCompanyModal"
        size="large"
        :title="'Add Company'"
        :hideDefaultActions=true>
        <form>

          <div>
            <va-input v-model="company_code" placeholder="Company Code">
            </va-input>
            <va-input v-model="company_name" placeholder="Company Name">
            </va-input>
            <va-checkbox v-model="active_flag" label="Active Flag" />

            <va-button  type="button" color="danger" @click="close_modal()"> Cancel</va-button>
            <va-button  type="button" color="success" @click="submit()"> Submit</va-button>

          </div>

        </form>
      </va-modal>
    </div>
  </div>

</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2/dist/sweetalert2.js'

import 'sweetalert2/src/sweetalert2.scss'
import DataTableCompany from '../../components/admin/master/DataTableCompany.vue'
export default {
  name: 'master-company',
  components: {
    DataTableCompany,
  },
  data () {
    return {
      listCompany: [],
      company_code: '',
      company_name: '',
      active_flag: true,
      showCompanyModal: false,
    }
  },
  mounted () {
    this.get_company()
  },
  created: function () {

  },
  methods: {
    addCompany () {
      this.showCompanyModal = true
    },
    submit () {
      if (this.active_flag === true) {
        this.active_flag = 'Y'
      } else {
        this.active_flag = 'N'
      }
      axios({
        method: 'post',
        url: 'http://localhost:8000/insert_data_company/',
        data: {
          company_code: this.company_code,
          company_name: this.company_name,
          active_flag: this.active_flag,
          user_id: this.$session.get('id'),
        },
        headers: {
          Authorization: 'Bearer ' + this.$session.get('token'),
        },
      })
        .then(response => {
          Swal.fire({
            title: 'Success!',
            text: 'Company berhasil didaftarkan.',
            icon: 'success',
          })
          this.showCompanyModal = false
          this.get_company()
          console.log(response.data)
        })
        .catch(error => {
          console.log(error.response)
        })
    },
    close_modal () {
      this.showCompanyModal = false
    },
    get_company: function () {
      axios({
        method: 'get',
        url: 'http://localhost:8000/get_data_master_company/',
        data: {
        },
        headers: {
          Authorization: 'Bearer ' + this.$session.get('token'),
        },
      })
        .then(response => {
          this.listCompany = []
          this.data = response.data
          this.data.forEach(item => {
            this.listCompany.push({ COMPANY_CODE: item.COMPANY_CODE, ID: item.COMPANY_ID, COMPANY_NAME: item.COMPANY_NAME, ACTIVE_FLAG: item.ACTIVE_FLAG, ACTIVE_DATE: item.ACTIVE_DATE, INACTIVE_DATE: item.INACTIVE_DATE })
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
