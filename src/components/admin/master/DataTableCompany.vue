<template>
  <va-card :title="'List Company'">
   <v-data-table
    v-model="selected"
    :headers="fields"
    :items="listCompany"
    :single-select="singleSelect"
    item-key="COMPANY_NAME"
    show-select
    @click:row="edit"
    class="elevation-1"
  >
  
  </v-data-table>
      <va-modal
      v-model="editCompanyModal"
      size="large"
      :title="'Edit Company'"
      :hideDefaultActions=true>
          

 
<form>
  
        <va-input v-model="company_code" placeholder="Company Code">
                  </va-input>
                   <va-input v-model="company_name" placeholder="Company Name">
                  </va-input>
                   <va-checkbox v-model="active_flag" label="Active Flag" />
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
    singleSelect:true,
    editCompanyModal:false,
    pindah:[],
    selected:[],
    company_code:'',
    active_flag1:'',
    company_name:'',
    company_id:'',
    active_flag:true
    }
  },
  created () {
  },  
  props:{
  listCompany:Array,
 
  },
  computed: {
    fields () {
      return [
    
       {
        value: 'COMPANY_CODE',
        text: 'Company Code',
      },{
        value: 'COMPANY_NAME',
        text: 'Company Name',
      },{
        value: 'ACTIVE_FLAG',
        text: 'Active Flag',
      }]
 
     
    },
  },
  methods: {
     edit (data) {
        if(data.ACTIVE_FLAG=='Y'){
            this.active_flag=true;
        }else{
            this.active_flag=false;
        }
        this.editCompanyModal=true;
        this.company_code=data.COMPANY_CODE;
        this.company_name=data.COMPANY_NAME;
        this.company_id=data.ID;

      
    },
    close_modal(){
        this.editCompanyModal=false;
        this.company_id='';
        this.company_code='';
        this.company_desc='';
        this.active_flag=true;
        this.active_flag1='';
    },
    update(){
    if(this.company_code!='' && this.company_name!=''){
        if(this.active_flag==true){
            this.active_flag1='Y';
        }else{
            this.active_flag1='N';
        }
        axios({
              method: "post",
              url: "http://localhost:8000/compare_data_company/",
              data: {
                company_code:this.company_code,
                company_name:this.company_name,
                active_flag:this.active_flag,
              },
              headers: {
                Authorization: "Bearer " + this.$session.get("token")
              }
            })
              .then(response => {
                  if(response.data==1){
                      axios({
                              method: "post",
                              url: "http://localhost:8000/update_data_company/",
                              data: {
                                company_code:this.company_code,
                                company_name:this.company_name,
                                company_id:this.company_id,
                                active_flag:this.active_flag1,                                user_id:this.$session.get("id"),
                              },
                              headers: {
                                Authorization: "Bearer " + this.$session.get("token")
                              }
                            })
                              .then(response =>{
                                  this.close_modal();
                                   Swal.fire({
                                      title: 'Success!',
                                      text: 'Company berhasil diupdate.',
                                      icon: 'success',
                                    });
                                    this.get_company();
                                   console.log(response.data);
                              })
                              .catch(error => {
                                console.log(error.response);
                              });
                  }else{
                      alert('0');
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
