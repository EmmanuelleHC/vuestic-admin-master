<template>
  <va-card>
    <va-data-table
      :fields="fields"
      :data="data_user"
      :per-page="5"
      clickable
      

    >
      <template slot="marker" slot-scope="props">
        <va-icon name="fa fa-circle" :color="props.rowData.color" size="8px" />
      </template>
       <template slot="actions" slot-scope="props">
        <va-button flat small color="gray" @click="select(props.rowData)" class="ma-0">
          {{ $t('choose') }}
        </va-button>

       
          

      </template>



    </va-data-table>
  </va-card>
</template>

<script>
import {
        serverBus
    } from '../../../router/index.js';
import axios from "axios";
export default {
  data () {
    return {
      data_user:[],
      pindah:[],
      role:[]
    }
  },
  created () {
  this.get_username()
  },
  computed: {
    fields () {
      return [
     
       {
        name: '__slot:actions',
        dataClass: 'text-right',
      },
      {
        name: 'USERNAME',
        title: 'Username',
      },{
        name: 'ROLE_NAME',
        title: 'Role',
      },
      {
        name: 'EMAIL',
        title: 'Email',
      },
      {
        name: 'ACTIVE_FLAG',
        title: 'Active Status',
      },
      {
        name: 'ACTIVE_DATE',
        title: 'Effective Date',
      },
      {
        name: 'USER_EXPR',
        title: 'Period Access',
      }]
 
     
    },
  },
  methods: {
  onChildClick(value){
        this.pindah=value;
     },
     select:function(test){
        if(test.ACTIVE_FLAG=='Y'){
          test.active_flag=true;
        }else{
          test.active_flag=false;
        }
        this.pindah.push({ showUserModal: false,username:test.USERNAME,role:test.ROLE_NAME,active_flag:test.active_flag,email:test.EMAIL,active_date:test.ACTIVE_DATE });
     



        serverBus.$emit('onChildClick',this.pindah);
     },
     
     get_username:function(){
       axios({
            method: "post",
            url: "http://localhost:8000/get_list_username/",
            data: {
             
              token: this.$session.get("token")
            },
            headers: {
              Authorization: "Bearer " + this.$session.get("token")
            }
          })
            .then(response => {
              this.data_user = [];
              this.data = response.data;
              this.data.forEach(item => {
              this.data_user.push({
                USERNAME: item.USERNAME,
                ROLE_NAME: item.ROLE_NAME,
                ROLE_ID:item.ROLE_ID,
                USER_EXPR: item.USER_EXPR,
                USER_EXPR_COUNTER: item.USER_EXPR_COUNTER,
                ACTIVE_FLAG:item.ACTIVE_FLAG,
                ACTIVE_DATE:item.ACTIVE_DATE,
                EMAIL:item.EMAIL
              });
            });


             
            })
            .catch(error => {
              console.log(error.response);
            });

      
       
    },
  },
}
</script>

<style lang="scss">
</style>
