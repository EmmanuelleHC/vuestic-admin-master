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
      :items="listCompany"
      :single-select="singleSelect"
      @click:row="edit"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar
          flat
        >
          <v-toolbar-title>Master Company</v-toolbar-title>
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
            @click="addCompany()"
          >
            New Company
          </v-btn>

        </v-toolbar>
      </template>
      
    </v-data-table>
    <div>
      <va-modal
        v-model="showCompanyModal"
        size="large"
        :title="title_modal"
        :hideDefaultActions="true"
      >
        <form>
          <div>
            <v-row justify="center">
              <v-col col-md-6>

                <v-text-field
                  v-model="company_code"
                  label="Company Code"
                  required
                ></v-text-field>

                <v-text-field
                  v-model="company_name"
                  label="Company Name"
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
import Loader from '../../../components/statistics/progress-bars/Widgets/Loading.vue'
import 'sweetalert2/src/sweetalert2.scss'
export default {
  data () {
    return {
      listCompany: [],
      title_modal: '',
      pindah: [],
      formTitle: 'Add New Company',
      isFound: false,
      loading:false,
      selected: [],
      company_code: '',
      active_flag1: '',
      company_name: '',
      company_id: '',
      active_flag: true,
      dialog: false,
      action_edit: false,
      showCompanyModal: false,
      singleSelect: true,
      select: true,
    }
  },
  created () {
    this.get_company()
  },
  components: {
    Loader,
   
  },
  computed: {
    fields () {
      return [

        {
          value: 'COMPANY_CODE',
          text: 'Company Code',
        }, {
          value: 'COMPANY_NAME',
          text: 'Company Name',
        }, {
          value: 'ACTIVE_FLAG',
          text: 'Active Flag',
        }]
    },
  },
  methods: {
    close_modal () {
      this.showCompanyModal = false
      this.company_id = ''
      this.company_code = ''
      this.company_name = ''
      this.active_flag = true
      this.active_flag1 = ''
      this.action_edit = false
    },
    addCompany () {
      this.action_edit = false
      this.showCompanyModal = true
      this.title_modal = 'Add New Company'
      this.company_id = ''
      this.company_code = ''
      this.company_name = ''
      this.active_flag = true
      this.active_flag1 = ''
    },
    submit () {
      this.loading=true
      if (this.company_code !== '' && this.company_name !== '') {
        if (this.active_flag === true) {
          this.active_flag1 = 'Y'
        } else {
          this.active_flag1 = 'N'
        }
        if (this.action_edit === false) {
           axios({
            method: 'post',
            url: 'http://sd6webdev.indomaret.lan:8000/compare_data_company/',
            data: {
              company_code: this.company_code,
              company_name: this.company_name,
               company_id: this.company_id,
            },
            headers: {
              Authorization: 'Bearer ' + this.$session.get('token'),
            },
          })
            .then(response => {
              if (response.data === 0) {
                axios({
                  method: 'post',
                  url: 'http://sd6webdev.indomaret.lan:8000/insert_data_company/',
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
                  text: 'Company berhasil ditambahkan.',
                  icon: 'success',
                })
              this.showCompanyModal = false
              this.get_company()
              console.log(response.data)
              this.loading=false
            })
            .catch(error => {
              console.log(error.response)
            })
              } else {
                Swal.fire({
                title: 'Error!',
                text: 'Data company gagal ditambahkan .',
                icon: 'error',
              })
                this.loading=false
              }
            })
        } else {
          axios({
            method: 'post',
            url: 'http://sd6webdev.indomaret.lan:8000/compare_data_company/',
            data: {
              company_code: this.company_code,
              company_name: this.company_name,
               company_id: this.company_id,
            },
            headers: {
              Authorization: 'Bearer ' + this.$session.get('token'),
            },
          })
            .then(response => {
              if (response.data === 0) {
                axios({
                  method: 'post',
                  url: 'http://sd6webdev.indomaret.lan:8000/update_data_company/',
                  data: {
                    company_code: this.company_code,
                    company_name: this.company_name,
                    company_id: this.company_id,
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
                      text: 'Company berhasil diupdate.',
                      icon: 'success',
                    })
                    this.get_company()
                    console.log(response.data)
                    this.loading=false
                  })
                  .catch(error => {
                    console.log(error.response)
                  })
              } else {
                Swal.fire({
                title: 'Error!',
                text: 'Data company gagal diupdate .',
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
      this.title_modal = 'Edit Master Company'
      this.action_edit = true
      this.showCompanyModal = true
      if (data.ACTIVE_FLAG === 'Y') {
        this.active_flag = true
      } else {
        this.active_flag = false
      }

      this.company_code = data.COMPANY_CODE
      this.company_name = data.COMPANY_NAME
      this.company_id = data.ID
    },
    get_company: function () {
      this.loading=true
      axios({
        method: 'get',
        url: 'http://sd6webdev.indomaret.lan:8000/get_data_master_company/',
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
