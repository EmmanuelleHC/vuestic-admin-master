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
      :items="listApproval"
      :single-select="singleSelect"
      @click:row="detail"
      class="elevation-1"
    > 
       <template v-slot:item.actions="{ item }">
     <v-icon
        small
        class="mr-2"
        @click="edit(item)"
      >
        mdi-pencil
      </v-icon>
    
    </template>
      <template v-slot:top>
        <v-toolbar
          flat
        >
          <v-toolbar-title>Master Approval</v-toolbar-title>
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
            @click="addApproval()"
          >
            New Approval
          </v-btn>
         
        
        </v-toolbar>
      </template>
    

    </v-data-table>
      <div style="margin-top: 100px;">
     <v-spacer></v-spacer>
                      <v-spacer></v-spacer>
                    </div>

      <div>
          <v-data-table
      v-model="selected"
      :headers="fields_approval_detail"
      :items="listApprovalDetail"
      :single-select="singleSelect"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar
          flat
        >
          <v-toolbar-title>Approval Detail</v-toolbar-title>
          <v-divider
            class="mx-4"
            inset
            vertical
          ></v-divider>
          <v-spacer></v-spacer>
        

        </v-toolbar>
      </template>
        
    </v-data-table>
      </div>
   
    <div>
      <va-modal
        v-model="showApprovalModal"
        size="large"
        :title="title_modal"
        :hideDefaultActions="true"
      >
        <form>
          <div>
            <v-row justify="center">
               <v-col col-md-6>
                <v-select  v-model="app"
                  :items="listApp" item-text="text" item-value="value" single-line  label="Approval Type"></v-select>
                 <v-select  v-model="branch"
                  :items="listBranch" item-text="text" item-value="value" single-line  label="Branch" ></v-select>
                   <v-text-field
                      v-model="amount_from"
                      :rules="numberRules"
                      label="Amount From"
                    ></v-text-field>
                   <v-text-field
                      v-model="amount_to"
                      :rules="numberRules"
                      label="Amount To"
                    ></v-text-field>
                    <va-checkbox v-model="active_flag" label="Active Flag" />
               </v-col>
              <v-col col-md-6>
                 
                  <v-autocomplete
                  v-model="appr1"
                  :items="listAppr"
                  :filter="customFilter"
                  item-text="text"
                  item-value="value"
                  label="Approval 1"
                ></v-autocomplete>
                 <v-autocomplete
                  v-model="appr2"
                  :items="listAppr"
                  :filter="customFilter"
                  item-text="text"
                  item-value="value"
                  label="Approval 2"
                ></v-autocomplete>
                  <v-autocomplete
                  v-model="appr3"
                  :items="listAppr"
                  :filter="customFilter"
                  item-text="text"
                  item-value="value"
                  label="Approval 3"
                ></v-autocomplete>
                 <v-autocomplete
                  v-model="appr4"
                  :items="listAppr"
                  :filter="customFilter"
                  item-text="text"
                  item-value="value"
                  label="Approval 4"
                ></v-autocomplete>
                 <v-autocomplete
                  v-model="appr5"
                  :items="listAppr"
                  :filter="customFilter"
                  item-text="text"
                  item-value="value"
                  label="Approval 5"
                ></v-autocomplete>
              </v-col>
               <v-col col-md-6>
               
                <v-autocomplete
                  v-model="appr6"
                  :items="listAppr"
                  :filter="customFilter"
                  item-text="text"
                  item-value="value"
                  label="Approval 6"
                ></v-autocomplete>
                 <v-autocomplete
                  v-model="appr7"
                  :items="listAppr"
                  :filter="customFilter"
                  item-text="text"
                  item-value="value"
                  label="Approval 7"
                ></v-autocomplete>
                  <v-autocomplete
                  v-model="appr8"
                  :items="listAppr"
                  :filter="customFilter"
                  item-text="text"
                  item-value="value"
                  label="Approval 8"
                ></v-autocomplete>
                 <v-autocomplete
                  v-model="appr9"
                  :items="listAppr"
                  :filter="customFilter"
                  item-text="text"
                  item-value="value"
                  label="Approval 9"
                ></v-autocomplete>
                 <v-autocomplete
                  v-model="appr10"
                  :items="listAppr"
                  :filter="customFilter"
                  item-text="text"
                  item-value="value"
                  label="Approval 10"
                ></v-autocomplete>

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
        v-model="editApprovalModal"
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
import Loader from '../../../components/statistics/progress-bars/Widgets/Loading.vue'
import 'sweetalert2/src/sweetalert2.scss'
export default {
  data () {
    return {
      listApproval: [],
      listAppr:[],
      listApp:[],
      amount_from:0,
      amount_to:0,
      listBranch:[],
      listApprovalDetail:[],
      title_modal: '',
      active_flag1: '',
      active_flag: true,
      used: [],
      id:'',
      app:'',
      branch:'',
      selected: [],
      appr1:'',
      appr2:'',
      appr3:'',
      appr4:'',
      appr5:'',
      appr6:'',
      appr7:'',
      appr8:'',
      appr9:'',
      appr10:'',
      singleSelect: true,
      active_flag: true,
      dialog: false,
      numberRules: [
        v => v >= 0 ,
        v => v <= 99999999999999999999999999  ,
      ],
      action_edit: false,
      loading:false,
      showApprovalModal: false,
      editApprovalModal:false
    }
  },
  created () {
    this.get_data_master_approval()
   
  },
  components: {
    Loader,
   
  },
  computed: {
    fields () {
      return [

        {
          value: 'APP',
          text: 'Approval Type',
        }, {
          value: 'BRANCH',
          text: 'Branch',
        },
        {
          value: 'AMOUNT_FROM',
          text: 'Start Amount (from)',
          align: 'right',
          formatter: 'formatPrice',
        },
        {
          value: 'AMOUNT_TO',
          text: 'Amount (to)',
          align: 'right',
          formatter: 'formatPrice',
        
        },
        {
          value: 'ACTIVE_FLAG',
          text: 'Active Flag',
          align: 'centers',
        },
        { text: 'Actions', value: 'actions', sortable: false }
        
      ]
    },
    fields_approval_detail(){
      return [

        {
          value: 'APPR_1',
          text: 'Approval 1',
        },
        {
          value: 'APPR_2',
          text: 'Approval 2',
        },
        {
          value: 'APPR_3',
          text: 'Approval 3',
        },
        {
          value: 'APPR_4',
          text: 'Approval 4',
        },
        {
          value: 'APPR_5',
          text: 'Approval 5',
        },
        {
          value: 'APPR_6',
          text: 'Approval 6',
        },
        {
          value: 'APPR_7',
          text: 'Approval 7',
        },
        {
          value: 'APPR_8',
          text: 'Approval 8',
        },
        {
          value: 'APPR_9',
          text: 'Approval 9',
        },
        {
          value: 'APPR_10',
          text: 'Approval 10',
        },
      ]
    }
  },
  methods: {
    close_modal () {
      this.showApprovalModal=false
    },
    get_data_master_approval(){
        this.loading=true
        axios({
        method: 'get',
        url: 'http://sd6webdev.indomaret.lan:8000/get_data_master_approval/',
        data: {
        },
        headers: {
          Authorization: 'Bearer ' + this.$session.get('token'),
        },
      })
        .then(response => {
          this.listApproval = []
          this.data = response.data
          this.data.forEach(item => {
            this.listApproval.push({ ID: item.ID, ID_APP: item.ID_APP,APP: item.APP, ORG_ID: item.ORG_ID,BRANCH: item.BRANCH,AMOUNT_FROM: item.AMOUNT_FROM, AMOUNT_TO: item.AMOUNT_TO, ACTIVE_FLAG: item.ACTIVE_FLAG })
          })
          this.loading=false
        })
        .catch(error => {
          console.log(error.response)
        })
    },
    customFilter (item, queryText, itemText) {
        const textOne = ''+item.text
        const searchText = ''+queryText
        return textOne.indexOf(searchText) > -1
    },
    addApproval () {
      this.showApprovalModal=true
      this.action_edit=false
      this.get_approval_type()
      this.get_approval_branch()
      this.get_approval_avail()
      
    },
    submit () {
      if(this.app!=='' && this.branch!=='' && this.active_flag!=='' && this.amount_from!=='' && this.amount_to!=='' && this.appr1!=='')
      {
        if (this.active_flag === true) {
          this.active_flag1 = 'Y'
        } else {
          this.active_flag1 = 'N'
        }
          if(this.action_edit==false){
               axios({
                method: 'post',
                url: 'http://sd6webdev.indomaret.lan:8000/validate_approval/',
                data: {
                    appr1:this.appr1,
                    appr2:this.appr2,
                    appr3:this.appr3,
                    appr4:this.appr4,
                    appr5:this.appr5,
                    appr6:this.appr6,
                    appr7:this.appr7,
                    appr8:this.appr8,
                    appr9:this.appr9,
                    appr10:this.appr10
                },
                headers: {
                  Authorization: 'Bearer ' + this.$session.get('token'),
                },
              })
                .then(response => {
                  if(response.data===true){
                       axios({
                          method: 'post',
                          url: 'http://sd6webdev.indomaret.lan:8000/compare_data_approval/',
                          data: {
                            app: this.app,
                            branch: this.branch,
                            amount_from: this.amount_from,
                            amount_to:this.amount_to
                          },
                        headers: {
                          Authorization: 'Bearer ' + this.$session.get('token'),
                        },
                      })
                      .then(response => {
                        if (response.data === 0) {
                          axios({
                            method: 'post',
                            url: 'http://sd6webdev.indomaret.lan:8000/insert_data_approval/',
                            data: {
                              app: this.app,
                              branch: this.branch,
                              active_flag: this.active_flag1,
                              amount_from:this.amount_from,
                              amount_to:this.amount_to,
                              appr1:this.appr1,
                              appr2:this.appr2,
                              appr3:this.appr3,
                              appr4:this.appr4,
                              appr5:this.appr5,
                              appr6:this.appr6,
                              appr7:this.appr7,
                              appr8:this.appr8,
                              appr9:this.appr9,
                              appr10:this.appr10,
                              user_id: this.$session.get('id'),
                            },
                            headers: {
                              Authorization: 'Bearer ' + this.$session.get('token'),
                            },
                          })
                        .then(response => {
                          Swal.fire({
                            title: 'Success!',
                            text: 'Data Approval berhasil ditambahkan.',
                            icon: 'success',
                          })
                        this.showApprovalModal = false
                        this.get_data_master_approval()
                        this.loading=false
                      })
                      .catch(error => {
                        console.log(error.response)
                      })
                        } else {
                          Swal.fire({
                          title: 'Error!',
                          text: 'Data Approval gagal ditambahkan .',
                          icon: 'error',
                        })
                          this.loading=false
                        }
                      })

                  }else{
                      Swal.fire({
                          title: 'Error!',
                          text: 'Data Approval harus terisi berurut dan unik.',
                          icon: 'error',
                        })
                      this.loading=false
                  }
                })
                .catch(error => {
                  console.log(error.response)
                })
              
          }else{
               axios({
                method: 'post',
                url: 'http://sd6webdev.indomaret.lan:8000/validate_approval/',
                data: {
                    appr1:this.appr1,
                    appr2:this.appr2,
                    appr3:this.appr3,
                    appr4:this.appr4,
                    appr5:this.appr5,
                    appr6:this.appr6,
                    appr7:this.appr7,
                    appr8:this.appr8,
                    appr9:this.appr9,
                    appr10:this.appr10
                },
                headers: {
                  Authorization: 'Bearer ' + this.$session.get('token'),
                },
              }).then(response => {
                  if(response.data===true){
                        axios({
                        method: 'post',
                        url: 'http://sd6webdev.indomaret.lan:8000/compare_data_approval/',
                        data: {
                          app: this.app,
                          branch: this.branch,
                          amount_from: this.amount_from,
                          amount_to:this.amount_to,
                          id:this.id
                        },
                    headers: {
                      Authorization: 'Bearer ' + this.$session.get('token'),
                    },
                  }).then(response => {
              if (response.data === 0) {
                      axios({
                        method: 'post',
                        url: 'http://sd6webdev.indomaret.lan:8000/update_data_approval/',
                        data: {
                          id:this.id,
                          app: this.app,
                          branch: this.branch,
                          active_flag: this.active_flag1,
                          amount_from:this.amount_from,
                          amount_to:this.amount_to,
                          appr1:this.appr1,
                          appr2:this.appr2,
                          appr3:this.appr3,
                          appr4:this.appr4,
                          appr5:this.appr5,
                          appr6:this.appr6,
                          appr7:this.appr7,
                          appr8:this.appr8,
                          appr9:this.appr9,
                          appr10:this.appr10,
                          user_id: this.$session.get('id'),
                        },
                        headers: {
                          Authorization: 'Bearer ' + this.$session.get('token'),
                        },
                      })
                    .then(response => {
                      if (response.data === 0) {
                      Swal.fire({
                        title: 'Error!',
                        text: 'Approval gagal diupdate.',
                        icon: 'error',
                      })
                    } else {
                      Swal.fire({
                        title: 'Success!',
                        text: 'Approval berhasil diupdate.',
                        icon: 'success',
                      })
                      
                    }

                    this.showApprovalModal = false
                    this.get_data_master_approval()
                    this.loading=false
                  })
                  .catch(error => {
                    console.log(error.response)
                  })
                    } else {
                      Swal.fire({
                      title: 'Error!',
                      text: 'Data Approval gagal ditambahkan .',
                      icon: 'error',
                    })
                      this.loading=false
                    }
                  })
                  }else{
                      Swal.fire({
                          title: 'Error!',
                          text: 'Data Approval harus terisi berurut dan unik.',
                          icon: 'error',
                        })
                      this.loading=false
                  }
                 
                })
                .catch(error => {
                  console.log(error.response)
                })
            
          }
      }else{
        Swal.fire({
          title: 'Error!',
          text: 'Harap lengkapi datanya .',
          icon: 'error',
        })
        this.loading=false
      }
    },
    get_approval_type () {
       axios({
        method: 'get',
        url: 'http://sd6webdev.indomaret.lan:8000/get_approval_type/',
        data: {
        },
        headers: {
          Authorization: 'Bearer ' + this.$session.get('token'),
        },
      }).then(response => {
          this.listApp = []
          this.data = response.data

          this.data.forEach(item => {
             
            this.listApp.push({
              value: item.ID,
              text: item.APP_NAME,
            })
          })
         
        })
        .catch(error => {
          console.log(error.response)
        })
    },
     get_approval_branch () {
       axios({
        method: 'get',
        url: 'http://sd6webdev.indomaret.lan:8000/get_approval_branch/',
        data: {
        },
        headers: {
          Authorization: 'Bearer ' + this.$session.get('token'),
        },
      }).then(response => {
          this.listBranch = []
          this.data = response.data

          this.data.forEach(item => {
             
            this.listBranch.push({
              value: item.ORG_ID,
              text: item.BRANCH_NAME,
            })
          })
         
        })
        .catch(error => {
          console.log(error.response)
        })
    },
    get_approval_avail (){
      axios({
        method: 'post',
        url: 'http://sd6webdev.indomaret.lan:8000/get_approval_avail/',
        data: {
         branch_org:this.branch
        },
        headers: {
          Authorization: 'Bearer ' + this.$session.get('token'),
        },
      }).then(response => {
          this.listAppr = []
          this.data = response.data
          this.data.forEach(item => {
            this.listAppr.push({
              value: item.ID,
              text: item.EMP_NUMBER,
            })
          })
         
        })
        .catch(error => {
          console.log(error.response)
        })

    },
    get_data_master_approval(){
      axios({
        method: 'get',
        url: 'http://sd6webdev.indomaret.lan:8000/get_data_master_approval/',
        data: {
        },
        headers: {
          Authorization: 'Bearer ' + this.$session.get('token'),
        },
      }).then(response => {
          this.listApproval = []
          this.data = response.data
          this.data.forEach(item => {
            this.listApproval.push({ ID: item.ID, ID_APP: item.ID_APP,APP: item.APP, ORG_ID: item.ORG_ID,BRANCH: item.BRANCH,AMOUNT_FROM: item.AMOUNT_FROM, AMOUNT_TO: item.AMOUNT_TO, ACTIVE_FLAG: item.ACTIVE_FLAG })
          })
         
        })
        .catch(error => {
          console.log(error.response)
        })
    },
    edit (data) {
      this.title_modal = 'Edit Master Employee'
      this.action_edit = true
      this.showApprovalModal=true
      this.get_approval_type()
      this.get_approval_branch()
      this.get_approval_avail()
      this.id=data.ID

      axios({
            method: 'post',
            url: 'http://sd6webdev.indomaret.lan:8000/get_data_approval_detail/',
            data: {
              ID: data.ID,
              user_id: this.$session.get('id'),
            },
            headers: {
              Authorization: 'Bearer ' + this.$session.get('token'),
            },
          })
            .then(response => {
              this.data = response.data
              this.data.forEach(item => {
                this.appr1=item.ID_APPR_1
                this.appr2=item.ID_APPR_2
                this.appr3=item.ID_APPR_3
                this.appr4=item.ID_APPR_4
                this.appr5=item.ID_APPR_5
                this.appr6=item.ID_APPR_6
                this.appr7=item.ID_APPR_7
                this.appr8=item.ID_APPR_8
                this.appr9=item.ID_APPR_9
                this.appr10=item.ID_APPR_10
                this.branch=item.ORG_ID
                this.amount_to=item.AMOUNT_TO
                this.amount_from=item.AMOUNT_FROM
                this.app=item.APP
              })
            })
            .catch(error => {
              console.log(error.response)
            })
 
    },
    detail(data){

       axios({
            method: 'post',
            url: 'http://sd6webdev.indomaret.lan:8000/get_data_approval_detail/',
            data: {
              ID: data.ID,
              user_id: this.$session.get('id'),
            },
            headers: {
              Authorization: 'Bearer ' + this.$session.get('token'),
            },
          })
            .then(response => {
             
              this.listApprovalDetail = []
              this.data = response.data
              this.data.forEach(item => {
                this.listApprovalDetail.push({ ID_APPR_1: item.ID_APPR_1, ID_APPR_2: item.ID_APPR_2, ID_APPR_3:item.ID_APPR_3,ID_APPR_4: item.ID_APPR_4, ID_APPR_5: item.ID_APPR_5,ID_APPR_6: item.ID_APPR_6, ID_APPR_7: item.ID_APPR_7, ID_APPR_8: item.ID_APPR_8,ID_APPR_9: item.ID_APPR_9,ID_APPR_10: item.ID_APPR_10, APPR_1: item.APPR_1, APPR_2: item.APPR_2, APPR_3:item.APPR_3,APPR_4: item.APPR_4, APPR_5: item.APPR_5,APPR_6: item.APPR_6, APPR_7: item.APPR_7, APPR_8: item.APPR_8,APPR_9: item.APPR_9,APPR_10: item.APPR_10})
              })
            })
            .catch(error => {
              console.log(error.response)
            })
    },
    formatPrice (value) {
      const val = (value / 1).toFixed(2).replace('.', ',')
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
    },
    
  },
}
</script>

<style lang="scss">
</style>
