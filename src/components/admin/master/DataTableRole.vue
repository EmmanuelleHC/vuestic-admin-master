<template>
  <va-card>
    <div class="justify center">
       <div v-if="loading">
       
          <loader />
        </div>
    </div>
    <v-data-table
      v-model="selected"
      :headers="fields"
      :items="listRole"
      :single-select="singleSelect"
      @click:row="edit"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar
          flat
        >
          <v-toolbar-title>Master Role</v-toolbar-title>
          <v-divider
            class="mx-4"
            inset
            vertical
          ></v-divider>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            dark
            class="mb-2"
            @click="addRole()"
          >
            New Role
          </v-btn>

        </v-toolbar>
      </template>

    </v-data-table>
    <div>
      <va-modal
        v-model="showRoleModal"
        size="large"
        :title="title_modal"
        :hideDefaultActions="true"
      >
        <form>
          <div>
            <v-row justify="center">
              <v-col col-md-6>

                <v-text-field
                  v-model="role_name"
                  label="Role Name"
                  required
                ></v-text-field>

                <v-text-field
                  v-model="role_desc"
                  label="Role Desc"
                  required
                ></v-text-field>

              </v-col>

            </v-row>

            <va-button type="button" color="danger" @click="close_modal()">
              Cancel</va-button
            >
            <va-button type="button" color="success" @click="submit()">
              Submit</va-button
            >
          </div>
        </form>
      </va-modal>
    </div>

  </va-card>
</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2/dist/sweetalert2.js'
import Loader from '../../../components/statistics/progress-bars/Widgets/Loading.vue'
import 'sweetalert2/src/sweetalert2.scss'
export default {
  data () {
    return {
      listRole: [],
      title_modal: '',
      pindah: [],
      formTitle: 'Add New Role',
      isFound: false,
      loading:false,
      singleSelect: true,
      selected: [],
      role_id: '',
      role_name: '',
      role_desc: '',
      dialog: false,
      action_edit: false,
      showRoleModal: false,
      select: true,
    }
  },
  created () {
    this.get_role()
  },
  components: {
    Loader,
   
  },
  computed: {
    fields () {
      return [

        {
          value: 'ROLE_NAME',
          text: 'Role Name',
        }, {
          value: 'ROLE_DESC',
          text: 'Role Desc',
        }]
    },
  },
  methods: {
    close_modal () {
      this.showRoleModal = false
    },
    addRole () {
      this.action_edit = false
      this.showRoleModal = true
      this.title_modal = 'Add New Role'
      this.role_name = ''
      this.role_desc = ''
      this.role_id = ''
    },
    submit () {
      this.loading=true
      if (this.role_name !== '' && this.role_desc !== '') {
        if (this.action_edit === false) {
           axios({
            method: 'post',
            url: 'http://sd6webdev.indomaret.lan:8000/compare_data_master_role/',
            data: {
              role_name: this.role_name,
              role_id: this.role_id,
              role_desc: this.role_desc,
            },
            headers: {
              Authorization: 'Bearer ' + this.$session.get('token'),
            },
          })
            .then(response => {
              if (response.data === 0) {
                axios({
            method: 'post',
            url: 'http://sd6webdev.indomaret.lan:8000/insert_role/',
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
              this.loading=false
              console.log(response.data)
            })
            .catch(error => {
              console.log(error.response)
            })
              }else{
               Swal.fire({
          title: 'Error!',
          text: 'Data Role gagal ditambahkan.',
          icon: 'error',
        })
               this.loading=false
            }
            })
          
        } else {
          axios({
            method: 'post',
            url: 'http://sd6webdev.indomaret.lan:8000/compare_data_master_role/',
            data: {
              role_name: this.role_name,
              role_id: this.role_id,
              role_desc: this.role_desc,
            },
            headers: {
              Authorization: 'Bearer ' + this.$session.get('token'),
            },
          })
            .then(response => {
              if (response.data === 0) {
                axios({
                  method: 'post',
                  url: 'http://sd6webdev.indomaret.lan:8000/update_role/',
                  data: {
                    role_name: this.role_name,
                    role_desc: this.role_desc,
                    role_id: this.role_id,
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
                      text: 'Role berhasil diupdate.',
                      icon: 'success',
                    })
                    this.get_role()
                    this.loading=false
                    console.log(response.data)
                  })
                  .catch(error => {
                    console.log(error.response)
                  })
              }else{
                 Swal.fire({
                  title: 'Error!',
                  text: 'Data Role gagal diupdate.',
                  icon: 'error',
                })
                 this.loading=false
              }
            })
        }
      } else {
        Swal.fire({
          title: 'Error!',
          text: 'Harap lengkapi datanya .',
          icon: 'error',
        })
        this.loading=false
      }
    },
    edit (data) {
      this.title_modal = 'Edit Master Role'
      this.action_edit = true
      this.showRoleModal = true
      this.role_name = data.ROLE_NAME
      this.role_desc = data.ROLE_DESC
      this.role_id = data.ID
    },
    get_role: function () {
      this.loading=true
      axios({
        method: 'get',
        url: 'http://sd6webdev.indomaret.lan:8000/get_list_role/',
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
          this.loading=false
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
