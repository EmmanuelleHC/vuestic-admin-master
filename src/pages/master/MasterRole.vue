<template>
  <div class="master-role">
    <va-card>
      <va-button  type="button" color="success" @click="addRole()">Add </va-button>

      <div class="row">

        <data-table-role :listRole="listRole"
          class="mb-4"/>
      </div>

    </va-card>
    <div>
      <va-modal
        v-model="showRoleModal"
        size="large"
        :title="'Add Role'"
        :hideDefaultActions=true>
        <form>

          <div>
            <va-input v-model="role_name" placeholder="Role Name">
            </va-input>
            <va-input v-model="role_desc" placeholder="Role Description">
            </va-input>

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
import DataTableRole from '../../components/admin/master/DataTableRole.vue'
export default {
  name: 'master-role',
  components: {
    DataTableRole,
  },
  data () {
    return {
      listRole: [],
      role_name: '',
      role_desc: '',
      showRoleModal: false,
    }
  },
  mounted () {
    this.get_role()
  },
  created: function () {

  },
  methods: {
    addRole () {
      this.showRoleModal = true
    },
    submit () {
      axios({
        method: 'post',
        url: 'http://localhost:8000/insert_role/',
        data: {
          role_name: this.role_name,
          role_desc: this.role_desc,
          user_id: this.$session.get('id'),
        },
        headers: {
          Authorization: 'Bearer ' + this.$session.get('token'),
        },
      })
        .then(response => {
          Swal.fire({
            title: 'Success!',
            text: 'User berhasil didaftarkan.',
            icon: 'success',
          })
          this.showRoleModal = false
          this.get_role()
          console.log(response.data)
        })
        .catch(error => {
          console.log(error.response)
        })
    },
    close_modal () {
      this.showRoleModal = false
    },
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
