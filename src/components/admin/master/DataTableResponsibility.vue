<template>
  <va-card>
    <v-data-table
      v-model="selected"
      :headers="fields"
      :items="listResponsibility"
      :single-select="singleSelect"
      @click:row="edit"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar
          flat
        >
          <v-toolbar-title>Master Responsibility</v-toolbar-title>
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
            @click="addResp()"
          >
            New Resp
          </v-btn>

        </v-toolbar>
      </template>

    </v-data-table>
    <div>
      <va-modal
        v-model="showResponsibilityModal"
        size="large"
        :title="title_modal"
        :hideDefaultActions="true"
      >
        <form>
          <div>
            <v-row justify="center">
              <v-col col-md-6>

                <v-select  v-model="company"
                  :items="listCompany"  v-on:input='test'  item-text="text" item-value="value" single-line  label="Company"></v-select>
                 

                <v-select  v-model="branch"
                  :items="listBranch" item-text="text" item-value="value" single-line  label="Branch"></v-select>

                <v-select  v-model="role"
                  :items="listRole" item-text="text" item-value="value" single-line  label="Role"></v-select>
                <v-select  v-model="menu"
                  :items="listMenu" item-text="text" item-value="value" single-line  label="Menu"></v-select>
                <v-text-field
                  v-model="resp_name"
                  label="Responsibility Name"
                  required
                ></v-text-field>

                <v-text-field
                  v-model="resp_desc"
                  label="Responsibility Description"
                  required
                ></v-text-field>
                <va-checkbox v-model="active_flag" label="Active Flag" />

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
      <va-modal
        v-model="editResponsibilityModal"
        size="large"
        :title="title_modal"
        :hideDefaultActions="true"
      >
        <form>
          <div>
            <v-row justify="center">
              <v-col col-md-6>

               
                <v-text-field
                  v-model="resp_name"
                  label="Responsibility Name"
                  required
                ></v-text-field>

                <v-text-field
                  v-model="resp_desc"
                  label="Responsibility Description"
                  required
                ></v-text-field>
                <va-checkbox v-model="active_flag" label="Active Flag" />

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

import 'sweetalert2/src/sweetalert2.scss'
export default {
  data () {
    return {
      listResponsibility: [],
      listMenu: [],
      listBranch: [],
      listRole: [],
      listCompany: [],
      title_modal: '',
      isFound: false,
      pindah: [],
      selected: [],
      singleSelect: true,
      resp_id: '',
      active_flag1: '',
      resp_desc: '',
      resp_name: '',
      menu: '',
      branch: '',
      role: '',
      company: '',
      active_flag: true,
      dialog: false,
      action_edit: false,
      showResponsibilityModal: false,
      editResponsibilityModal: false,
    }
  },
  created () {
    this.get_responsibility()
    this.get_role()
    this.get_menu()
    this.get_data_master_company()
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
    test: function (event)
    {
      this.company =event
      this.get_data_cbg_by_company()
      
    },
    close_modal () {

      this.editResponsibilityModal = false
      this.showResponsibilityModal = false
      this.active_flag = true
      this.active_flag1 = ''
      this.action_edit = false
      this.resp_id = ''
      this.menu = ''
      this.active_flag1 = ''
      this.resp_desc = ''
      this.resp_name = ''
    },
    get_menu: function () {
      axios({
        method: 'get',
        url: 'http://localhost:8000/get_data_menu/',
        data: {
        },
        headers: {
          Authorization: 'Bearer ' + this.$session.get('token'),
        },
      })
        .then(response => {
          this.listMenu = []
          this.data = response.data
          this.data.forEach(item => {
            this.listMenu.push({ text: item.MENU_NAME, value: item.MENU_ID })
          })
        })
        .catch(error => {
          console.log(error.response)
        })
    },
    addResp () {
      this.get_responsibility()
      this.get_responsibility()
      this.get_role()
      this.get_menu()
      this.get_data_master_company()
      this.action_edit = false
      this.showResponsibilityModal = true
      this.title_modal = 'Add New Responsibility'
      this.active_flag = true
      this.active_flag1 = ''
      this.action_edit = false
      this.resp_id = ''
      this.active_flag1 = ''
      this.resp_desc = ''
      this.resp_name = ''
      this.role = ''
      this.menu = ''
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
            this.listRole.push({ text: item.ROLE_NAME, value: item.ROLE_ID })
          })
        })
        .catch(error => {
          console.log(error.response)
        })
    },
    get_data_master_company () {
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
            this.listCompany.push({ text: item.COMPANY_NAME, value: item.COMPANY_ID })
          })
        })
        .catch(error => {
          console.log(error.response)
        })
    },
    submit () {
      if (this.resp_name !== '' && this.resp_desc !== '' && this.active_flag !== '') {
        if (this.active_flag === true) {
          this.active_flag1 = 'Y'
        } else {
          this.active_flag1 = 'N'
        }
        if (this.action_edit === false) {
             axios({
            method: 'post',
            url: 'http://localhost:8000/compare_data_resp/',
            data: {
              resp_id: this.resp_id,
              resp_name: this.resp_name,
              resp_desc: this.resp_desc,
              user_id: this.$session.get('id'),

            },
            headers: {
              Authorization: 'Bearer ' + this.$session.get('token'),
            },
          }).then((response) => {
            if (response.data === 1) {
              Swal.fire({
                title: 'Error!',
                text: 'Branch gagal ditambahkan.',
                icon: 'error',
              })
              this.showBranchModal = true
              this.action_edit = false
            } else {
           axios({
            method: 'post',
            url: 'http://localhost:8000/insert_data_resp/',
            data: {
              company: this.company,
              branch: this.branch,
              role: this.role,
              menu: this.menu,
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
              Swal.fire({
                title: 'Success!',
                text: 'Responsibility berhasil didaftarkan.',
                icon: 'success',
              })
              this.showResponsibilityModal = false
              this.get_responsibility()
            //  console.log(response.data)
            })
            .catch(error => {
              console.log(error.response)
            })

            }
          })
        } else {
          axios({
            method: 'post',
            url: 'http://localhost:8000/compare_data_resp/',
            data: {
              resp_id: this.resp_id,
              resp_name: this.resp_name,
              resp_desc: this.resp_desc,
              user_id: this.$session.get('id'),

            },
            headers: {
              Authorization: 'Bearer ' + this.$session.get('token'),
            },
          }).then((response) => {
            if (response.data === 1) {
              Swal.fire({
                title: 'Error!',
                text: 'Branch gagal diupdate.',
                icon: 'error',
              })
              this.showBranchModal = true
              this.action_edit = true
            } else {
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
              this.get_responsibility()
              console.log(response.data)
            })
            .catch(error => {
              console.log(error.response)
            })


            }
          })
          
        }
      } else {
        Swal.fire({
          title: 'Error!',
          text: 'Harap lengkapi datanya .',
          icon: 'error',
        })
      }
    },
    edit (data) {
      this.title_modal = 'Edit Master Responsibility'
      this.action_edit = true
      this.editResponsibilityModal = true
      if (data.ACTIVE_FLAG === 'Y') {
        this.active_flag = true
      } else {
        this.active_flag = false
      }

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
    },
    get_data_cbg_by_company () {

      axios({
        method: 'post',
        url: 'http://localhost:8000/get_data_cbg_by_company/',
        data: {
          company_id: this.company,
        },
        headers: {
          Authorization: 'Bearer ' + this.$session.get('token'),
        },
      })
        .then(response => {
          this.listBranch = []
          this.data = response.data

          this.data.forEach(item => {
            this.listBranch.push({ text: item.BRANCH_NAME, value: item.BRANCH_ID })
          })
        })
        .catch(error => {
          console.log(error.response)
        })
    },
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

<style lang="scss">
</style>
