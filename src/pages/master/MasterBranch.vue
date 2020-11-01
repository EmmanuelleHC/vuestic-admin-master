<template>
  <div class="master-branch">
    <va-card>
      <div class="justify center">
        <data-table-branch :listBranch="listBranch" class="mb-4" />
      </div>
    </va-card>
  </div>
</template>

<script>
import axios from 'axios'
import 'sweetalert2/src/sweetalert2.scss'
import DataTableBranch from '../../components/admin/master/DataTableBranch.vue'
export default {
  name: 'master-branch',
  components: {
    DataTableBranch,
  },
  data () {
    return {
      listBranch: [],
      role_name: '',
      role_desc: '',
      showRoleModal: false,
    }
  },
  mounted () {
    this.get_branch()
  },
  created: function () {},
  methods: {

    submit () {

    },
    close_modal () {
      this.showRoleModal = false
    },
    get_branch: function () {
      axios({
        method: 'get',
        url: 'http://localhost:8000/get_data_cbg/',
        data: {},
        headers: {
          Authorization: 'Bearer ' + this.$session.get('token'),
        },
      })
        .then((response) => {
          this.listBranch = []
          this.data = response.data
          this.data.forEach((item) => {
            this.listBranch.push({
              BRANCH_ID: item.BRANCH_ID,
              BRANCH_CODE: item.BRANCH_CODE,
              BRANCH_NAME: item.BRANCH_NAME,
              ALTERNATE_NAME: item.ALTERNATE_NAME,
              ORG_ID: item.ORG_ID,
              SOB_ID: item.SOB_ID,
              ORG_TYPE: item.ORG_TYPE,
              COMPANY_ID: item.COMPANY_ID,
              COMPANY: item.COMPANY,
            })
          })
        })
        .catch((error) => {
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
