<template>
  <div class="master-company">
    <va-card>
      <div class="justify center">
        <data-table-company :listCompany="listCompany" class="mb-4" />
      </div>
    </va-card>
  </div>
</template>

<script>
import axios from 'axios'
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
      ShowCompanyModal: false,
    }
  },
  mounted () {
    this.get_company()
  },
  created: function () {},
  methods: {
    close_modal () {
      this.ShowCompanyModal = false
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
