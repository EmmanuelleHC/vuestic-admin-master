<template>
  <va-card :title="'List Menu'">
   <v-data-table
    v-model="selected"
    :headers="fields"
    :items="listMenu"
    :single-select="singleSelect"
    item-key="MENU_NAME"
    show-select
    @click:row="edit"
    class="elevation-1"
  >
  
  </v-data-table>
      <va-modal
      v-model="editMenuModal"
      size="large"
      :title="'Edit Menu'"
      :hideDefaultActions=true>
          

 
<form>
  <va-input v-model="menu_name" placeholder="Menu Name">
                  </va-input>
                   <va-input v-model="menu_desc" placeholder="Menu Description">
                  </va-input>
                
                   <va-select
        v-model="detail"
        :options="listDetail"
        @input="setSelectedDetail" 
        textBy="description"
        placeholder="Detail"
      />
      <va-input v-model="seq" placeholder="Sequence">
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
    editMenuModal:false,
    pindah:[],
    selected:[],
     listDetail:[{
        id:1,
        description:'Yes'
      },
      {
        id:2,
        description:'No'
      }],
      detail:'',
      seq:'',
      menu_name:'',
      menu_desc:'',
      menu_id:'',
      seq:'',
    active_flag:true,
    active_flag1:''
    }
  },
  created () {
  },  
  props:{
  listMenu:Array,
 
  },
  computed: {
    fields () {
      return [
    
       {
        value: 'MENU_NAME',
        text: 'Nama Menu',
      },{
        value: 'MENU_DESC',
        text: 'Deskripsi',
      },{
        value: 'SEQ',
        text: 'Seq',
      },{
        value: 'ACTIVE_FLAG',
        text: 'Active',
      },{
        value: 'ACTIVE_DATE',
        text: 'Active Date',
      },{
        value: 'INACTIVE_DATE',
        text: 'Inactive Date',
      },{
        value: 'IS_DETAIL',
        text: 'Detail',
      }]
 
     
    },
  },
  methods: {
    setSelectedDetail(value){
    this.detail=value;
    
    },
     edit (data) {
        if(data.ACTIVE_FLAG=='Y'){
            this.active_flag=true;
            this.active_flag1='Y';
        }else{
            this.active_flag=false;
            this.active_flag1='Y';
        }
        this.editMenuModal=true;
        this.menu_name=data.MENU_NAME;
        this.menu_desc=data.MENU_DESC;
        this.menu_id=data.MENU_ID;
        if(data.IS_DETAIL=='Y'){
          this.detail='Yes';
        }else{
          this.detail='No';
        }
       
        this.seq=data.SEQ;
      
      
    },
    close_modal(){
        this.editMenuModal=false;
        this.company_id='';
        this.company_code='';
        this.company_desc='';
        this.active_flag=true;
        this.active_flag1='';
    },
    update(){
      if(this.active_flag==true){
          this.active_flag1='Y';
      }else{
          this.active_flag1='N';
      }
      if(this.detail.description=='Yes'){
          this.detail='Y';
      }else{
          this.detail='N';
      }
      if(this.menu_name!='' && this.menu_desc!='' && this.active_flag1!='' && this.seq!='' ){
          axios({
                              method: "post",
                              url: "http://localhost:8000/update_data_menu/",
                              data: {
                                menu_id:this.menu_id,
                                menu_name:this.menu_name,
                                menu_desc:this.menu_desc,
                                detail:this.detail,
                                active_flag:this.active_flag1,
                                seq:this.seq,
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
                                      text: 'Menu berhasil diupdate.',
                                      icon: 'success',
                                    });
                                    this.get_company();
                                   console.log(response.data);
                              })
                              .catch(error => {
                                console.log(error.response);
                              });

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
