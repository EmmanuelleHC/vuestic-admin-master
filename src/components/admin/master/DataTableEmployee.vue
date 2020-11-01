<template>
  <va-card>
    <v-data-table
      v-model="selected"
      :headers="fields"
      :items="listEmployee"
      :single-select="singleSelect"
      @click:row="edit"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar
          flat
        >
          <v-toolbar-title>Master Employee</v-toolbar-title>
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
            @click="addNewEmployee()"
          >
            New Employee
          </v-btn>

        </v-toolbar>
      </template>

    </v-data-table>
    <div>
      <va-modal
        v-model="showEmployeeModal"
        size="large"
        :title="title_modal"
        :hideDefaultActions="true"
      >
        <form>
          <div>
            <v-row justify="center">
              <v-col col-md-6>
                 <v-text-field
                  v-model="emp_num"
                  label="Employee Number"
                  required
                ></v-text-field>
                <v-text-field
                  v-model="emp_name"
                  label="Employee Name"
                  required
                ></v-text-field>
                <v-select  v-model="username"
                  :items="listUsername" item-text="text" item-value="value" single-line  label="Username"></v-select>
                 <v-text-field
                  v-model="emp_desc"
                  label="Employee Description"
                  required
                ></v-text-field>
                <v-text-field
                  v-model="email_user"
                  :rules="emailRules"
                  label="E-mail User"
                  required
                ></v-text-field>
                 <v-text-field
                  v-model="email_otp"
                  :rules="emailRules"
                  label="E-mail OTP"
                  required
                ></v-text-field>
                 <v-select  v-model="company"
                  :items="listCompany" item-text="text" item-value="value" single-line  label="Company"></v-select>
                     <v-select  v-model="branch"
                  :items="listBranch" item-text="text" item-value="value" single-line  label="Branch"></v-select>
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
      listEmployee: [],
      listUsername: [],
      listBranch: [],
      listRole: [],
      listCompany: [],
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
      title_modal: '',
      isFound: false,
      pindah: [],
      selected: [],
      singleSelect: true,
      emp_name:'',
      email_user:'',
      emp_num:'',
      emp_id:'',
      emp_desc:'',
      email_otp:'',
      username:'',
      company:'',
      branch:'',
      active_flag: true,
      dialog: false,
      action_edit: false,
      showEmployeeModal: false,
      editResponsibilityModal: false,
    }
  },
  created () {
    this.get_employee()
   
  },
  computed: {
    fields () {
      return [

        {
          value: 'EMP_NUMBER',
          text: 'Employee Number',
        }, {
          value: 'EMP_NAME',
          text: 'Employee Name',
        },
        {
          value: 'USERNAME',
          text: 'Username',
        },
        {
          value: 'DESCRIPTION',
          text: 'Description',
        },
        {
          value: 'EMAIL_USER',
          text: 'Email User',
        },
        {
          value: 'EMAIL_OTP',
          text: 'Email OTP',
        },
        {
          value: 'COMPANY',
          text: 'Company',
        },
        {
          value: 'BRANCH',
          text: 'Branch',
        },
        {
          value: 'ACTIVE_FLAG',
          text: 'Active Flag',
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

      this.showEmployeeModal = false
      this.active_flag = true
      this.active_flag1 = ''
    
    },
    addNewEmployee () {
      
      this.action_edit = false
      this.showEmployeeModal = true
      this.title_modal = 'Add New Employee'
      this.emp_name=''
      this.email_user=''
      this.emp_num=''
      this.emp_id=''
      this.emp_desc=''
      this.email_otp=''
      this.username=''
      this.company=''
      this.branch=''
      this.get_username_existing()
      this.get_data_master_company()
      this.get_data_cbg_by_company()
    },
    submit () {
       if (this.emp_name!=='' && this.emp_num !== '' && this.emp_desc !== '' && this.email_user !== '' && this.username!=='' && this.company!=='' && this.branch!=='' && this.active_flag!=='') {
        if (this.active_flag === true) {
          this.active_flag1 = 'Y'
        } else {
          this.active_flag1 = 'N'
        }
        if (this.action_edit === false) {
          axios({
            method: 'post',
            url: 'http://localhost:8000/compare_data_emp/',
            data: {
            
              emp_name: this.emp_name,
              emp_desc: this.emp_desc,
              emp_num: this.emp_num,

            },
            headers: {
              Authorization: 'Bearer ' + this.$session.get('token'),
            },
          }).then((response) => {
            if (response.data === 1) {
              Swal.fire({
                title: 'Error!',
                text: 'Employee gagal ditambahkan.',
                icon: 'error',
              })
              this.showEmployeeModal = true
              this.action_edit = false
            } else {
             axios({
            method: 'post',
            url: 'http://localhost:8000/insert_data_emp/',
            data: {
              emp_num: this.emp_num,
              emp_name: this.emp_name,
              emp_desc: this.emp_desc,
              email_user: this.email_user,
              email_otp: this.email_otp,
              user_id: this.username,
              company:this.company,
              branch:this.branch,
              active_flag: this.active_flag1,
              session: this.$session.get('id'),
            },
            headers: {
              Authorization: 'Bearer ' + this.$session.get('token'),
            },
          })
            .then(response => {
              Swal.fire({
                title: 'Success!',
                text: 'Employee berhasil ditambahkan.',
                icon: 'success',
              })
              this.showEmployeeModal = false
              this.get_employee()
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
            url: 'http://localhost:8000/compare_data_emp/',
            data: {
              emp_id: this.emp_id,
              emp_name: this.emp_name,
              emp_desc: this.emp_desc,
              emp_num: this.emp_num,

            },
            headers: {
              Authorization: 'Bearer ' + this.$session.get('token'),
            },
          }).then((response) => {
            if (response.data === 1) {
              Swal.fire({
                title: 'Error!',
                text: 'Employee gagal diupdate.',
                icon: 'error',
              })
              this.showEmployeeModal = true
              this.action_edit = true
            } else {
             axios({
            method: 'post',
            url: 'http://localhost:8000/update_data_emp/',
            data: {
              emp_id:this.emp_id,
              emp_num: this.emp_num,
              emp_name: this.emp_name,
              emp_desc: this.emp_desc,
              email_user: this.email_user,
              email_otp: this.email_otp,
              user_id: this.username,
              company:this.company,
              branch:this.branch,
              active_flag: this.active_flag1,
              session: this.$session.get('id'),
            },
            headers: {
              Authorization: 'Bearer ' + this.$session.get('token'),
            },
          })
            .then(response => {
              this.close_modal()
              Swal.fire({
                title: 'Success!',
                text: 'Employee berhasil diupdate.',
                icon: 'success',
              })
              this.get_employee()
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
      this.title_modal = 'Edit Master Employee'
      this.action_edit = true
      console.log(data)
      this.get_data_master_company()
      this.get_data_cbg_by_company()
      this.emp_name=data.EMP_NAME
      this.email_user=data.EMAIL_USER
      this.emp_num=data.EMP_NUMBER
      this.emp_id=data.ID
      this.emp_desc=data.DESCRIPTION
      this.email_otp=data.EMAIL_OTP
      this.email_user=data.EMAIL_USER
      this.username=data.USER_ID
      this.update_username()
      this.company=data.COMPANY_ID
      this.branch=data.ORG_ID
      this.showEmployeeModal=true
    
    },
    get_employee: function () {
      axios({
        method: 'get',
        url: 'http://localhost:8000/get_data_master_employee/',
        data: {
        },
        headers: {
          Authorization: 'Bearer ' + this.$session.get('token'),
        },
      })
        .then(response => {
          this.listEmployee = []
          this.data = response.data
          this.data.forEach(item => {
            this.listEmployee.push({ ID: item.ID, EMP_NAME: item.EMP_NAME, EMP_NUMBER: item.EMP_NUMBER, EMP_DESCRIPTION: item.EMP_DESCRIPTION, EMAIL_USER: item.EMAIL_USER, EMAIL_OTP: item.EMAIL_OTP, COMPANY: item.COMPANY, COMPANY_ID: item.COMPANY_ID,ORG_ID:item.ORG_ID,BRANCH:item.BRANCH,ACTIVE_FLAG:item.ACTIVE_FLAG,USERNAME:item.USERNAME,USER_ID:item.USER_ID, ACTIVE_DATE: item.ACTIVE_DATE, INACTIVE_DATE: item.INACTIVE_DATE })
          })
        })
        .catch(error => {
          console.log(error.response)
        })
    },
    get_username_existing: function (){
       axios({
        method: 'get',
        url: 'http://localhost:8000/get_username_existing/',
        data: {
        },
        headers: {
          Authorization: 'Bearer ' + this.$session.get('token'),
        },
      })
        .then(response => {
          this.listUsername = []
          this.data = response.data
          this.data.forEach(item => {
            this.listUsername.push({ value: item.ID, text: item.USERNAME})
          })
        })
        .catch(error => {
          console.log(error.response)
        })
    },
    update_username: function (){
       axios({
        method: 'post',
        url: 'http://localhost:8000/get_username_existing2/',
        data: {
          user_id:this.username
        },
        headers: {
          Authorization: 'Bearer ' + this.$session.get('token'),
        },
      })
        .then(response => {
          this.listUsername = []
          this.data = response.data
          this.data.forEach(item => {
            this.listUsername.push({ value: item.ID, text: item.USERNAME})
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
            this.listBranch.push({ text: item.BRANCH_NAME, value: item.ORG_ID })
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
