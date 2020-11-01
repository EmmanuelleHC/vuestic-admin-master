<template>
  <div class="master-resp">
    <va-card>
      <div class="justify center">
        <data-table-employee :listEmployee="listEmployee" class="mb-4" />
      </div>
    </va-card>
  </div>
</template>

<script>
import axios from 'axios'
import 'sweetalert2/src/sweetalert2.scss'
import DataTableEmployee from '../../components/admin/master/DataTableEmployee.vue'
export default {
  name: 'master-resp',
  components: {
    DataTableEmployee,
  },
  data () {
    return {
      listEmployee: [],
    }
  },
  mounted () {
    this.get_responsibility()
  },
  created: function () {},
  methods: {
    get_responsibility: function () {
      axios({
        method: 'get',
        url: 'http://localhost:8000/get_data_master_resp/',
        data: {
        },
        headers: {
          Authorization: 'Bearer ' + this.$session.get('token'),
        },
      })
        .then(response => {
          this.listResponsibility = []
          this.data = response.data
          this.data.forEach(item => {
            this.listResponsibility.push({ RESPONSIBILITY_ID: item.RESPONSIBILITY_ID, COMPANY: item.COMPANY_NAME, CABANG: item.BRANCH_NAME, ROLE: item.ROLE, MENU: item.MENU, RESP: item.RESPONSIBILITY_NAME, RESP_DESC: item.RESPONSIBILITY_DESC, ACTIVE: item.ACTIVE_FLAG, ACTIVE_DATE: item.ACTIVE_DATE, INACTIVE_DATE: item.INACTIVE_DATE })
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
