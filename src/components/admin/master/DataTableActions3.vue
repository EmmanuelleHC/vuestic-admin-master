<template>
  <va-card :title="'List Responsibility'">
    <va-data-table
      :fields="fields"
      :data="data_list_user_resp"
      :per-page="5"
    >
      <template slot="marker" slot-scope="props">
        <va-icon name="fa fa-circle" :color="props.rowData.color" size="8px" />
      </template>

      <template slot="actions" slot-scope="props">
       

        <va-button flat small color="danger" type="button" @click="choose(props.rowData)" class="ma-0">
        choose
        </va-button>
          

      </template>


    </va-data-table>
  </va-card>
</template>

<script>
import {
        serverBus
    } from '../../../router/index.js';
import Swal from 'sweetalert2/dist/sweetalert2.js'

import 'sweetalert2/src/sweetalert2.scss'
export default {
  data () {
    return {
    isFound:false,
    pindah:[],
    }
  },
  created () {
    
  },  
  props:{
  data_list_user_resp:Array,
  data_list_user_resp_temp:Array,
  },
  computed: {
    fields () {
      return [
       {
        name: '__slot:actions',
        dataClass: 'text-right',
      }, {
        name: 'RESPONSIBILITY_NAME',
        title: 'Resp Name',
      },{
        name: 'RESPONSIBILITY_DESC',
        title: 'Resp Desc',
      },
      {
        name: 'BRANCH_NAME',
        title: 'Branch',
      },
      {
        name: 'COMPANY_NAME',
        title: 'Company',
      },
      {
        name: 'ACTIVE_FLAG',
        title: 'Active Flag',
      },
      {
        name: 'ACTIVE_DATE',
        title: 'Effective Date',
      },
      {
        name: 'INACTIVE_DATE',
        title: 'Ineffective Date',
      }]
 
     
    },
  },
  methods: {
    choose:function(val){
       
        var length=this.data_list_user_resp_temp.length;
        this.isFound=false;
        for(var i = 0; i < length; i++) {
            if(this.data_list_user_resp_temp[i].RESPONSIBILITY_NAME==val.RESPONSIBILITY_NAME){
                this.isFound=true;
            }
        }
         if(this.isFound==false){
         this.data_list_user_resp_temp.push({
                  RESPONSIBILITY_NAME:val.RESPONSIBILITY_NAME,
                  BRANCH_NAME:val.BRANCH_NAME,
                  COMPANY_NAME:val.COMPANY_NAME,
                  ACTIVE_FLAG:val.ACTIVE_FLAG,
                  ACTIVE_DATE:val.ACTIVE_DATE,
                  INACTIVE_DATE:val.INACTIVE_DATE
              });
      }else{
         Swal.fire({
                  title: 'Warning!',
                  text: 'Anda sudah memilih responsibility tsb.',
                  icon: 'warning',
                  confirmButtonText: 'OK'
                });
        this.isFound=false;
      }

        this.pindah.push({ isListResp: false });
        serverBus.$emit('onChildClick3',this.pindah);
     },
       onChildClick3(value){
        this.pindah=value;
     },
     
  
  },
}
</script>

<style lang="scss">
</style>
