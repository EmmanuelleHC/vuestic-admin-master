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
      :items="listBranch"
      :single-select="singleSelect"
      @click:row="edit"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar
          flat
        >
          <v-toolbar-title>Master Branch</v-toolbar-title>
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
            @click="addBranch()"
          >
            New Branch
          </v-btn>

        </v-toolbar>
      </template>

    </v-data-table>
    <div>
      <va-modal
        v-model="showBranchModal"
        size="large"
        :title="title_modal"
        :hideDefaultActions="true"
      >
        <form>
          <div>
            <v-row justify="center">
              <v-col col-md-6>

                <v-select  v-model="company"
                  :items="listCompany" item-text="text" item-value="value" single-line  label="Company"></v-select>

                <v-text-field
                  v-model="branch_code"
                  :counter="3"
                  label="Branch Code"
                  required
                ></v-text-field>
                <v-text-field
                  v-model="branch_name"
                  label="Branch Name"
                  required
                ></v-text-field>
                <v-text-field
                  v-model="alt_name"
                  label="Alternate Name"
                  required
                ></v-text-field>
                <v-text-field
                  v-model="org_id"
                  label="ORG ID"
                  required
                ></v-text-field>

              </v-col>
              <v-col  col-md-6>
                <v-select :items="listOrgType"
                  v-model="org_type" item-text="name" item-value="value" single-line  label="ORG Type"></v-select>

                <v-text-field
                  v-model="sob"
                  label="Set of Books"
                  required
                ></v-text-field>
                <v-text-field
                  v-model="address1"
                  label="Address 1"

                ></v-text-field>
                <v-text-field
                  v-model="address2"
                  label="Address 2"

                ></v-text-field>
                <v-text-field
                  v-model="address3"
                  label="Address 3"

                ></v-text-field>

              </v-col>
              <v-col  col-md-6>
                <v-text-field
                  v-model="city"
                  label="City"

                ></v-text-field>
                <v-text-field
                  v-model="province"
                  label="Province"

                ></v-text-field>
                <v-text-field
                  v-model="vat_num_npwp"
                  label="Num NPWP"

                ></v-text-field>
                <v-text-field
                  v-model="address_pkp"
                  label="Address PKP"

                ></v-text-field>
                <va-date-picker placeholder="Tanggal NPWP" v-model="tgl_npwp" />
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
      listBranch: [],
      listCompany: [],
      title_modal: '',
      loading:false,
      listOrgType: [{
        name: 'HO',
        id: 1,
      },
      {
        name: 'CBG',
        id: 2,
      }, {
        name: 'FRC',
        id: 3,
      },
      ],
      pindah: [],
      formTitle: 'Add New Branch',
      branch_code: '',
      branch_id: '',
      org_id: '',
      loading:false,
      company: '',
      sob: '',
      org_type: '',
      vat_num_npwp: '',
      address_pkp: '',
      branch_name: '',
      address1: '',
      address2: '',
      address3: '',
      city: '',
      province: '',
      tgl_npwp: '',
      alt_name: '',
      dialog: false,
      action_edit: false,
      showBranchModal: false,
      singleSelect: true,
      selected: [],
      select: true,
    }
  },
  created () {
    this.get_branch()
    this.get_company()
  },
  components: {
    Loader,
   
  },
  computed: {
    fields () {
      return [

        {
          value: 'BRANCH_CODE',
          text: 'Branch Code',
        }, {
          value: 'BRANCH_NAME',
          text: 'Branch Name',
        },
        {
          value: 'ORG_ID',
          text: 'ORG ID',
        },
        {
          value: 'SOB_ID',
          text: 'Set of Books ID',
        },
        {
          value: 'COMPANY',
          text: 'Company',
        }]
    },
  },
  methods: {
    close_modal () {
      this.showBranchModal = false
    },
   
    addBranch () {
      this.action_edit = false
      this.showBranchModal = true
      this.title_modal = 'Add New Branch'
      this.branch_code = ''
      this.branch_id = ''
      this.org_id = ''
      this.company = ''
      this.sob = ''
      this.org_type = ''
      this.vat_num_npwp = ''
      this.address_pkp = ''
      this.branch_name = ''
      this.address1 = ''
      this.address2 = ''
      this.address3 = ''
      this.city = ''
      this.province = ''
      this.tgl_npwp = ''
      this.alt_name = ''
    },
    get_company () {
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
            this.listCompany.push({
              value: item.COMPANY_ID,
              text: item.COMPANY_NAME,
            })
          })
          this.loading=false
        })
        .catch(error => {
          console.log(error.response)
        })
    },
    submit () {
      this.loading=true
      if (this.branch_code !== '' && this.branch_name !== '' && this.alt_name !== '' && this.org_id !== '' && this.org_type !== '' && this.sob !== '' && this.company !== ''){
        if (this.action_edit === false) {
          axios({
            method: 'post',
            url: 'http://sd6webdev.indomaret.lan:8000/insert_data_cbg/',
            data: {
              branch_code: this.branch_code,
              branch_name: this.branch_name,
              alt_name: this.alt_name,
              org_id: this.org_id,
              sob_id: this.sob,
              org_type: this.org_type,
              company_id: this.company,
              addr1: this.address1,
              addr2: this.address2,
              addr3: this.address3,
              city: this.city,
              province: this.province,
              vat_num_npwp: this.vat_num_npwp,
              address_pkp: this.address_pkp,
              tgl_npwp: this.tgl_npwp,
              user_id: this.$session.get('id'),

            },
            headers: {
              Authorization: 'Bearer ' + this.$session.get('token'),
            },
          }).then((response) => {
            if (response.data === 1) {
              Swal.fire({
                title: 'Success!',
                text: 'Branch berhasil didaftarkan.',
                icon: 'success',
              })

              this.showBranchModal = false
              this.get_branch()
              this.loading=false
            }
          })
        } else {
          axios({
            method: 'post',
            url: 'http://sd6webdev.indomaret.lan:8000/compare_data_branch/',
            data: {
              branch_id: this.branch_id,
              branch_code: this.branch_code,
              branch_name: this.branch_name,
              alt_name: this.alt_name,
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
              this.loading=false
            } else {
              axios({
                method: 'post',
                url: 'http://sd6webdev.indomaret.lan:8000/update_data_cbg/',
                data: {
                  branch_id: this.branch_id,
                  branch_code: this.branch_code,
                  branch_name: this.branch_name,
                  alt_name: this.alt_name,
                  org_id: this.org_id,
                  sob_id: this.sob,
                  org_type: this.org_type,
                  company_id: this.company,
                  addr1: this.address1,
                  addr2: this.address2,
                  addr3: this.address3,
                  city: this.city,
                  province: this.province,
                  vat_num_npwp: this.vat_num_npwp,
                  address_pkp: this.address_pkp,
                  tgl_npwp: this.tgl_npwp,
                  user_id: this.$session.get('id'),

                },
                headers: {
                  Authorization: 'Bearer ' + this.$session.get('token'),
                },
              }).then((response) => {
                if (response.data === 1) {
                  Swal.fire({
                    title: 'Success!',
                    text: 'Branch berhasil diupdate.',
                    icon: 'success',
                  })
                  this.showBranchModal = false
                  this.get_branch()
                  this.action_edit = false

                } else {
                  Swal.fire({
                    title: 'Error!',
                    text: 'Branch gagal diupdate.',
                    icon: 'error',
                  })
                  this.showBranchModal = true
                  this.action_edit = true
                }
                this.loading=false
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
        this.loading=false
      }

    },
    edit (data) {
      this.loading=true
      this.action_edit = true
      axios({
        method: 'post',
        url: 'http://sd6webdev.indomaret.lan:8000/get_data_cbg_by_id/',
        data: {
          branch_id: data.BRANCH_ID,
        },
        headers: {
          Authorization: 'Bearer ' + this.$session.get('token'),
        },
      })
        .then(response => {
          this.branch_id = response.data[0].BRANCH_ID
          this.branch_code = response.data[0].BRANCH_CODE
          this.branch_name = response.data[0].BRANCH_NAME
          this.alt_name = response.data[0].ALTERNATE_NAME
          this.org_id = response.data[0].ORG_ID
          this.sob = response.data[0].SOB_ID
          this.org_type = response.data[0].ORG_TYPE
          this.company = response.data[0].COMPANY_ID
          this.address1 = response.data[0].ADDRESS1
          this.address2 = response.data[0].ADDRESS2
          this.address3 = response.data[0].ADDRESS3
          this.city = response.data[0].CITY
          this.province = response.data[0].PROVINCE
          this.tgl_npwp = response.data[0].TGL_NPWP
          this.branch_id = response.data[0].BRANCH_ID
          this.vat_num_npwp = response.data[0].VAT_REGISTRATION_NUM
          this.showBranchModal = true
          this.title_modal = 'Edit New Branch'
          this.action_edit = true
          this.loading=false
        })
        .catch(error => {
          console.log(error.response)
        })
    },
    get_branch: function () {
      this.loading=true
      axios({
        method: 'get',
        url: 'http://sd6webdev.indomaret.lan:8000/get_data_cbg/',
        data: {

        },
        headers: {
          Authorization: 'Bearer ' + this.$session.get('token'),
        },
      })
        .then(response => {
          this.listBranch = []
          this.data = response.data
          this.data.forEach(item => {
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
