<template>
  <va-card :title="'List User Responsibility'">
    <va-data-table
      :fields="fields"
      :data="data_list_user_resp_temp"
      :per-page="5"
    >
      <template slot="marker" slot-scope="props">
        <va-icon name="fa fa-circle" :color="props.rowData.color" size="8px" />
      </template>

      <template slot="actions" slot-scope="props">
       

        <va-button flat small color="danger" type="button" @click="remove(props.rowData)" class="ma-0">
          {{ $t('tables.delete') }}
        </va-button>
          

      </template>


    </va-data-table>
  </va-card>
</template>

<script>

export default {
  data () {
    return {
    }
  },
  created () {
  },  
  props:{
  data_list_user_resp_temp:Array
  },
  computed: {
    fields () {
      return [{
        name: '__slot:marker',
        width: '30px',
        dataClass: 'text-center',
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
      },
       {
        name: '__slot:actions',
        dataClass: 'text-right',
      }]
 
     
    },
  },
  methods: {
   
     
    remove (resp_user) {
    
      var index=this.data_list_user_resp_temp.indexOf(resp_user);
      this.data_list_user_resp_temp.splice(index, 1);
  
    },
  },
}
</script>

<style lang="scss">
</style>
