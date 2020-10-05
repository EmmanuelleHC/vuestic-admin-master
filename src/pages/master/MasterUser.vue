<template>
  <div class="form-elements">
  <div class="cards-container row d-flex wrap align--start">
    <va-card :title="'List User'">
  
    <v-form>
         <va-input v-model="username" placeholder="Username">
                  </va-input>
         <va-input v-model="email" type="email" placeholder="Email">
                </va-input>
        <va-select
        v-model="role"
        :options="listRole"
        @input="setSelected" 
        textBy="description"
        placeholder="Role"
      />
       <va-date-picker placeholder="Active Date" v-model="active_date" />
         <va-checkbox v-model="active_flag" label="Active Flag" />   
   
    </v-form>
    <div class="row">
 <va-button  type="button" color="success" @click="add()" :disabled="!isFormValid"> Submit</va-button>
                        <va-button  type="button" color="danger" @click="reset()"> Cancel</va-button>
                         <va-button  type="button" color="info" @click="get_username()"> Show Username</va-button>
                          <va-button  type="button" color="gray" @click="addResp()">Add Responsibility</va-button>
</div>
 
<div class="row">
<v-spacer></v-spacer>
            <data-table-actions :data_list_user_resp_temp="data_list_user_resp_temp"
            class="mb-4"/>
          </div>
 <div>
      <va-modal
      v-model="showUserModal"
      size="large"
      :title="'List Username'">
         <data-table-actions2 class="sm-4"/>
      </va-modal>
      </div>
      <va-modal
      v-model="isListResp"
      size="large"
      :title="'List Responsibility'">
         <data-table-actions3 :data_list_user_resp="data_list_user_resp" :data_list_user_resp_temp="data_list_user_resp_temp" class="sm-4"/>
      </va-modal>
    </va-card>
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
import DataTableActions from '../../components/admin/master/DataTableActions.vue'
import DataTableActions2 from '../../components/admin/master/DataTableActions2.vue'
import DataTableActions3 from '../../components/admin/master/DataTableActions3.vue'
export default {
  name: "form-elements",
  components: {
    DataTableActions,
    DataTableActions2,
     DataTableActions3
  },
  data() {
    return {
      withButton: "",
      username:"",
      showUserModal:false,
      email: "",
      isFormValid:true,
      selected:[],
      isListResp:false,
      errorMessages: ["Field should contain a valid email"],
      listRole: [],
      role: [],
      data_list_user_resp:[],
      data_list_user_resp_temp:[],
      active_date: "",
      user:[],
      active_flag: true
    };
  },
  mounted() {
    this.get_role();
  },
  created:function(){
    
    serverBus.$on('onChildClick',(onChildClick)=>{
      this.username=onChildClick[0].username;
      this.role=onChildClick[0].role;
      this.active_flag=onChildClick[0].active_flag;
      this.email=onChildClick[0].email;
      this.active_date=onChildClick[0].active_date;
      this.showUserModal=onChildClick[0].showUserModal;
      
       this.get_resp(this.username);
    });
    serverBus.$on('onChildClick3',(onChildClick3)=>{
      this.isListResp=onChildClick3[0].isListResp;
    

    });
   
  },
  methods: {
    reset() {
      this.username="";
      this.email= "";
      this.role= "";
      this.data_list_user_resp_temp=[];
      this.active_date= "";
      this.active_flag= true;
      this.isFormValid=true;
    },
    setSelected(value){
    this.role=value.description;
    },
    addResp(){
    if(this.role!=''){
      this.isListResp=true;
      this.get_list_user_resp();
    }else{

          Swal.fire({
          title: 'Warning!',
          text: 'Harap pilih role terlebih dahulu.',
          icon: 'warning',
          confirmButtonText: 'OK'
        })
    }
  },
     get_resp:function(username){
  

      axios({
            method: "post",
            url: "http://localhost:8000/get_resp_user/",
            data: {
              username:username,
              token: this.$session.get("token")
            },
            headers: {
              Authorization: "Bearer " + this.$session.get("token")
            }
          })
            .then(response => {
              this.data_list_user_resp_temp = [];
              this.data = response.data;

              this.data.forEach(item => {
              this.data_list_user_resp_temp.push({
                  RESPONSIBILITY_NAME:item.RESPONSIBILITY_NAME,
                  BRANCH_NAME:item.BRANCH_NAME,
                  COMPANY_NAME:item.COMPANY_NAME,
                  ACTIVE_FLAG:item.ACTIVE_FLAG,
                  ACTIVE_DATE:item.ACTIVE_DATE,
                  INACTIVE_DATE:item.INACTIVE_DATE
              });
            });
        


            })
            .catch(error => {
              console.log(error.response);
            });
     
  },
    get_username:function(){
     

      this.showUserModal=true;
       
    },
    add:function(){
    this.isFormValid=false;
      if(this.username!=''){
            axios({
              method: "post",
              url: "http://localhost:8000/search_user_specific/",
              data: {
                username:this.username,
                token: this.$session.get("token")
              },
              headers: {
                Authorization: "Bearer " + this.$session.get("token")
              }
            })
              .then(response => {
                  if(response.data[0].cek==0){
                     if(this.data_list_user_resp_temp!=[]){
                          axios({
                              method: "post",
                              url: "http://localhost:8000/insert_user/",
                              data: {
                                username:this.username,
                                role:this.role,
                                active_flag:this.active_flag,
                                active_date:this.active_date,
                                email:this.email,
                                token: this.$session.get("token"),
                                user_id:this.$session.get("id"),
                                resp:this.data_list_user_resp_temp
                              },
                              headers: {
                                Authorization: "Bearer " + this.$session.get("token")
                              }
                            })
                              .then(response =>{
                       
                                   
                                    this.reset();
                                   this.isFormValid=true;
                                   Swal.fire({
                                      title: 'Success!',
                                      text: 'User berhasil didaftarkan.',
                                      icon: 'success',
                                    });
                                   console.log(response.data);
                              })
                              .catch(error => {
                                console.log(error.response);
                              });
                     }else{
                          Swal.fire({
                            title: 'Warning!',
                            text: 'Harap mengisi responsibility nya.',
                            icon: 'warning',
                            confirmButtonText: 'OK'
                          });
                     }
                     
                  }else{
                     if(this.data_list_user_resp_temp!=[]){
                          Swal.fire({
                        title: 'Confirm to Update',
                        icon: 'info',
                        html:
                         'User sudah terdaftar, yakin untuk update data ?',
                        showCancelButton: true,
                        focusConfirm: false,
                        confirmButtonText:
                          'Yes',
                        cancelButtonText:
                          'No'
                      }).then((result) => {
                        if (result.isConfirmed) {
                            axios({
                              method: "post",
                              url: "http://localhost:8000/update_user/",
                              data: {
                                username:this.username,
                                role:this.role,
                                active_flag:this.active_flag,
                                active_date:this.active_date,
                                email:this.email,
                                token: this.$session.get("token"),
                                user_id:this.$session.get("id"),
                                resp:this.data_list_user_resp_temp
                              },
                              headers: {
                                Authorization: "Bearer " + this.$session.get("token")
                              }
                            })
                              .then(response =>{
                                   this.reset();
                                   this.isFormValid=true;
                                   Swal.fire({
                                      title: 'Success!',
                                      text: 'User berhasil diupdate.',
                                      icon: 'success',
                                    });
                                   console.log(response.data);
                              })
                              .catch(error => {
                                console.log(error.response);
                              });
                         
                        }
                      });
                     }else{
                       Swal.fire({
                            title: 'Warning!',
                            text: 'Harap mengisi responsibility nya.',
                            icon: 'warning',
                            confirmButtonText: 'OK'
                          });

                     }
                  

                     
                  }
              })
              .catch(error => {
                console.log(error.response);
              });

        }else{
             Swal.fire({
              title: 'Warning!',
              text: 'Harap mengisi username nya.',
              icon: 'warning',
              confirmButtonText: 'OK'
            })
        }
       
    },
     get_list_user_resp: function() {
          
          axios({
            method: "post",
            url: "http://localhost:8000/get_list_user_resp_by_role/",
            data: {
              role_id:this.role,
              token: this.$session.get("token")
            },
            headers: {
              Authorization: "Bearer " + this.$session.get("token")
            }
          })
            .then(response => {
              this.data_list_user_resp = [];
              this.data = response.data;
              this.data.forEach(item => {
              this.data_list_user_resp.push({
                  RESPONSIBILITY_NAME:item.RESPONSIBILITY_NAME,
                  BRANCH_NAME:item.BRANCH_NAME,
                  COMPANY_NAME:item.COMPANY_NAME,
                  ACTIVE_FLAG:item.ACTIVE_FLAG,
                  ACTIVE_DATE:item.ACTIVE_DATE,
                  INACTIVE_DATE:item.INACTIVE_DATE
              });
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
    }
  }
};
</script>

<style>
.row.row-inside {
  max-width: none;
}
</style>
