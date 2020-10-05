<template>
  <v-data-table
    :headers="headers"
    :items="data_list_user_resp_temp"
    sort-by="RESPONSIBILITY_ID"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar
        flat
      >
      
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">
     
      <v-btn
        small
        @click="deleteItem(item)"
      >
       Delete
      </v-btn>
    </template>

  </v-data-table>
</template>
<script>
  export default {
    data: () => ({
      dialog: false,
      dialogDelete: false,
      editedIndex: -1,
      editedItem: {
        name: '',
        calories: 0,
        fat: 0,
        carbs: 0,
        protein: 0,
      },
      headers: [
        { text: 'Resp Name', value: 'RESPONSIBILITY_NAME' },
        { text: 'Resp Desc', value: 'RESPONSIBILITY_DESC' },
        { text: 'Branch', value: 'BRANCH_NAME' },
        { text: 'Company', value: 'COMPANY_NAME' },
        { text: 'Active Flag', value: 'ACTIVE_FLAG' },
        { text: 'Effective Date', value: 'ACTIVE_DATE' },
        { text: 'Ineffective Date', value: 'INACTIVE_DATE' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      defaultItem: {
        RESPONSIBILITY_NAME: '',
        RESPONSIBILITY_DESC: '',
        BRANCH_NAME:'',
        COMPANY_NAME:'',
        ACTIVE_FLAG: '',
        ACTIVE_DATE: '',
        INACTIVE_DATE: '',
      },
    }),
    props:{
        data_list_user_resp_temp:Array
    },
    computed: {
      formTitle () {
        return 'New Item' 
      },
    },

    watch: {
      dialog (val) {
        val || this.close()
      },
      dialogDelete (val) {
        val || this.closeDelete()
      },
    },

    created () {
      
    },

    methods: {
      deleteItem (item) {
        var index=this.data_list_user_resp_temp.indexOf(item);
        this.data_list_user_resp_temp.splice(index, 1);
  
      },
      close () {
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },
      save () {
        if (this.editedIndex > -1) {
          Object.assign(this.data_list_user_resp_temp[this.editedIndex], this.editedItem)
        } else {
          this.data_list_user_resp_temp.push(this.editedItem)
        }
        this.close()
      },
    },
  }
</script>
