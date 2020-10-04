<template>
  <va-card :title="'List Role'">
    <va-data-table
      :fields="fields"
      :data="listRole"
      :per-page="5"
    >
      <template slot="actions" slot-scope="props">
       

        <va-button flat small color="danger" type="button" @click="edit(props.rowData)" class="ma-0">
          Edit
        </va-button>
          

      </template>



    </va-data-table>

      <va-modal
      v-model="editRoleModal"
      size="large"
      :title="'Edit Role'"
      :hideDefaultActions=true>
          

 
<form>
  
        <va-input v-model="role_name" placeholder="Role Name">
                  </va-input>
                   <va-input v-model="role_desc" placeholder="Role Description">
                  </va-input>

                   <va-button  type="button" color="danger" @click="close_modal()"> Cancel</va-button>
                         <va-button  type="button" color="success" @click="update()"> Submit</va-button>
                        
        </form>         
            </va-modal>
  </va-card>
  
    

</template>

<script>
import {
        serverBus
    } from '../../../router/index.js';

    import axios from "axios"
import Swal from 'sweetalert2/dist/sweetalert2.js'

import 'sweetalert2/src/sweetalert2.scss'
export default {
  data () {
    return {
    isFound:false,
    editRoleModal:false,
    pindah:[],
    role_id:'',
    role_name:'',
    role_desc:''
    }
  },
  created () {
  },  
  props:{
  listRole:Array,
 
  },
  computed: {
    fields () {
      return [
    
       {
        name: 'ROLE_NAME',
        title: 'Role Name',
      },{
        name: 'ROLE_DESC',
        title: 'Role Desc',
      },
       {
        name: '__slot:actions',
        dataClass: 'text-right',
      }]
 
     
    },
  },
  methods: {
     edit (data) {
        this.editRoleModal=true;
        this.role_name=data.ROLE_NAME;
        this.role_desc=data.ROLE_DESC;
        this.role_id=data.ID;

      
    },
    close_modal(){
        this.editRoleModal=false;
        this.role_id='';
        this.role_name='';
        this.role_desc='';
    },
    update(){
    if(this.role_name!='' && this.role_desc!=''){
        axios({
              method: "post",
              url: "http://localhost:8000/compare_data_master_role/",
              data: {
                role_name:this.role_name,
                token: this.$session.get("token")
              },
              headers: {
                Authorization: "Bearer " + this.$session.get("token")
              }
            })
              .then(response => {
                  if(response.data==0){
                    
                          axios({
                              method: "post",
                              url: "http://localhost:8000/update_role/",
                              data: {
                                role_name:this.role_name,
                                role_desc:this.role_desc,
                                role_id:this.role_id,
                                token: this.$session.get("token"),
                                user_id:this.$session.get("id"),
                              },
                              headers: {
                                Authorization: "Bearer " + this.$session.get("token")
                              }
                            })
                              .then(response =>{
                                  this.close_modal();
                                   Swal.fire({
                                      title: 'Success!',
                                      text: 'Role berhasil diupdate.',
                                      icon: 'success',
                                    });
                                    this.get_role();
                                   console.log(response.data);
                              })
                              .catch(error => {
                                console.log(error.response);
                              });
                    }
            })
            }else{
            Swal.fire({
                            title: 'Warning!',
                            text: 'Harap mengisi data dengan lengkap.',
                            icon: 'warning',
                            confirmButtonText: 'OK'
                          });
            }
    
       
     
  
  }
  }
}
</script>

<style lang="scss">
</style>
