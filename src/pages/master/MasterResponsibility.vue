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
      role_name:'',
      role_desc:'',
      showResponsibilityModal:false
    };
  },
  mounted() {
  this.get_responsibility();
    
  },
  created:function(){
    
    
   
  },
  methods: {
   addResponsibility(){
    this.showResponsibilityModal=true;
   },
   submit(){
     axios({
                              method: "post",
                              url: "http://localhost:8000/insert_role/",
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
