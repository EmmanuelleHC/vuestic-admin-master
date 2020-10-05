<template>
  <div class="master-role">
  <va-card>
 <va-button  type="button" color="success" @click="addResponsibility()">Add </va-button>

          <div class="row">
          
            <data-table-responsibility :listResponsibility="listResponsibility"
            class="mb-4"/>
          </div>
     
  </va-card>
     <div>
      <va-modal
      v-model="showResponsibilityModal"
      size="large"
      :title="'Add Responsibility'"
      :hideDefaultActions=true>
          <form>

 <div>
  <va-select
        v-model="company"
        :options="listCompany"
        @input="setSelected" 
        textBy="description"
        placeholder="Company"
      />

  <va-select
        v-model="branch"
        :options="listBranch"
        @input="setSelectedBranch" 
        textBy="description"
        placeholder="Branch"
      />

        <va-select
        v-model="role"
        :options="listRole"
        @input="setSelectedRole" 
        textBy="description"
        placeholder="Role"
      />
        <va-select
        v-model="menu"
        :options="listMenu"
        @input="setSelectedMenu" 
        textBy="description"
        placeholder="Menu"
      />
        <va-input v-model="resp_name" placeholder="Responsibility Name">
                  </va-input>
         <va-input v-model="resp_desc" placeholder="Responsibility Description">
                  </va-input>
        <va-checkbox v-model="active_flag" label="Active Flag" />          
                   <va-button  type="button" color="danger" @click="close_modal()"> Cancel</va-button>
                         <va-button  type="button" color="success" @click="submit()"> Submit</va-button>
                        
                 
            
      </div>

    </form>
      </va-modal>
      </div>
  </div>
 
</template>

<script>
import {
        serverBus
    } from '../../router/index.js';
import axios from "axios";
import Swal from 'sweetalert2/dist/sweetalert2.js'

import 'sweetalert2/src/sweetalert2.scss'
import DataTableResponsibility from '../../components/admin/master/DataTableResponsibility.vue'
export default {
  name: "master-role",
  components: {
    DataTableResponsibility,
  },
  data() {
    return {
      listResponsibility:[],
      listMenu:[],
      resp_name:'',
      resp_desc:'',
      active_flag:false,
      role_desc:'',
      company:'',
      branch:'',
      menu:'',
      role:'',
      listRole:[],
      listBranch:[],
      listCompany:[],
      showResponsibilityModal:false
    };
  },
  mounted() {
  this.get_responsibility();
  this.get_role();
  this.get_menu();
    
  },
  created:function(){
    
    this.get_data_master_company();
   
   
  },
  methods: {
   addResponsibility(){
    this.showResponsibilityModal=true;
   },
   get_menu:function(){
      axios({
        method: "post",
        url: "http://localhost:8000/get_data_menu/",
        data: {
          token: this.$session.get("token"),

        },
        headers: {
          Authorization: "Bearer " + this.$session.get("token")
        }
      })
        .then(response => {
          this.listMenu = [];
          this.data = response.data;
          this.data.forEach(item => {
            this.listMenu.push({ description: item.MENU_NAME, id: item.MENU_ID });
          });
        })
        .catch(error => {
          console.log(error.response);
        });
   },
   get_role: function() {
      axios({
        method: "post",
        url: "http://localhost:8000/get_list_role/",
        data: {
          token: this.$session.get("token")
        },
        headers: {
          Authorization: "Bearer " + this.$session.get("token")
        }
      })
        .then(response => {
          this.listRole = [];
          this.data = response.data;
          this.data.forEach(item => {
            this.listRole.push({ description: item.ROLE_NAME, id: item.ROLE_ID });
          });
        })
        .catch(error => {
          console.log(error.response);
        });
    },
   get_data_master_company(){
      axios({
                              method: "post",
                              url: "http://localhost:8000/get_data_master_company/",
                              data: {
                               token:this.$session.get("token")
                              },
                              headers: {
                                Authorization: "Bearer " + this.$session.get("token")
                              }
                            })
                              .then(response =>{
                       
                                   this.listCompany = [];
          this.data = response.data;
          this.data.forEach(item => {
            this.listCompany.push({ description: item.COMPANY_NAME, id: item.COMPANY_ID });
          });
                              })
                              .catch(error => {
                                console.log(error.response);
                              });
   },
    setSelected(value){
    this.company=value.description;
    this.get_data_cbg_by_company(value.description);
    },
    setSelectedBranch(value){
    this.branch=value.description;
    
    },
    setSelectedRole(value){
    this.role=value.description;
    
    },
    setSelectedMenu(value){
    this.menu=value.description;
    
    },
    get_data_cbg_by_company(company_name){
      axios({
                              method: "post",
                              url: "http://localhost:8000/get_data_cbg_by_company/",
                              data: {
                               token:this.$session.get("token"),
                               company_name:company_name
                              },
                              headers: {
                                Authorization: "Bearer " + this.$session.get("token")
                              }
                            })
                              .then(response =>{
                       
                                   this.listCompany = [];
          this.data = response.data;
          this.data.forEach(item => {
            this.listBranch.push({ description: item.BRANCH_NAME, id: item.BRANCH_ID });
          });
                              })
                              .catch(error => {
                                console.log(error.response);
                              });
    },
   submit(){
     axios({
                              method: "post",
                              url: "http://localhost:8000/insert_data_resp/",
                              data: {
                                role_name:this.role_name,
                                role_desc:this.role_desc,
                                token:this.$session.get("token"),
                                user_id:this.$session.get("id")
                              },
                              headers: {
                                Authorization: "Bearer " + this.$session.get("token")
                              }
                            })
                              .then(response =>{
                       
                                   
                                    
                                   Swal.fire({
                                      title: 'Success!',
                                      text: 'User berhasil didaftarkan.',
                                      icon: 'success',
                                    });
                                    this.showRoleModal=false;
                                    this.get_responsibility();
                                   console.log(response.data);
                              })
                              .catch(error => {
                                console.log(error.response);
                              });
   },
   close_modal(){
    this.showResponsibilityModal=false;
   },
    get_responsibility: function() {
      axios({
        method: "post",
        url: "http://localhost:8000/get_data_master_resp/",
        data: {
          token: this.$session.get("token")
        },
        headers: {
          Authorization: "Bearer " + this.$session.get("token")
        }
      })
        .then(response => {
          this.listRole = [];
          this.data = response.data;
          this.data.forEach(item => {
            this.listResponsibility.push({ RESPONSIBILITY_ID: item.RESPONSIBILITY_ID, COMPANY: item.COMPANY_NAME ,CABANG:item.BRANCH_NAME,ROLE:item.ROLE,MENU:item.MENU,RESP:item.RESPONSIBILITY_NAME,RESP_DESC:item.RESPONSIBILITY_DESC,ACTIVE:item.ACTIVE_FLAG,ACTIVE_DATE:item.ACTIVE_DATE,INACTIVE_DATE:item.INACTIVE_DATE});
          });
        })
        .catch(error => {
          console.log(error.response);
        });
    }
  }
};
</script>

<style>
.row.row-inside {
  max-width: none;
}
</style>
