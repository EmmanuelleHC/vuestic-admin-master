<template>
  <va-card>
    <v-data-table
      v-model="selected"
      :headers="fields"
      :items="listApproval"
      :single-select="singleSelect"
      @click:row="detail"
      class="elevation-1"
    > 
    
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
                <v-select  v-model="appr1"
                  :items="listAppr" item-text="text" item-value="value" single-line  label="Approval 1"></v-select>

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

import 'sweetalert2/src/sweetalert2.scss'
export default {
  data () {
    return {
      listApproval: [],
      listAppr:[],
      listApprovalDetail:[],
      title_modal: '',
      used: [],
      selected: [],
      appr1:[],
      singleSelect: true,
      active_flag: true,
      dialog: false,
      action_edit: false,
      showApprovalModal: false,
      editApprovalModal:false
    }
  },
  created () {
    this.get_data_master_approval()
   
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
        }
        
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
   
    },
    get_data_master_approval(){
        axios({
        method: 'get',
        url: 'http://localhost:8000/get_data_master_approval/',
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
         
        })
        .catch(error => {
          console.log(error.response)
        })
    },
    addApproval () {
      this.showApprovalModal=true
      this.action_edit=false
      this.get_approval_avail()
      
    },
    submit () {
      
    },
    get_data_master_approval(){
        axios({
        method: 'get',
        url: 'http://localhost:8000/get_data_master_approval/',
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
         
        })
        .catch(error => {
          console.log(error.response)
        })
    },
    edit (data) {
      this.title_modal = 'Edit Master Employee'
      this.action_edit = true
     
    
    },
    detail(data){

       axios({
            method: 'post',
            url: 'http://localhost:8000/get_data_approval_detail/',
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
