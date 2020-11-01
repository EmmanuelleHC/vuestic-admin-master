<template>
  <va-card>
    <v-data-table
      v-model="selected"
      :headers="fields"
      :items="listMenu"
      :single-select="singleSelect"
      @click:row="get_data_menu_detail"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar
          flat
        >
          <v-toolbar-title>Master Menu</v-toolbar-title>
          <v-divider
            class="mx-4"
            inset
            vertical
          ></v-divider>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            dark
            class="mb-2"
            @click="addMenu()"
          >
            New Menu
          </v-btn>

        </v-toolbar>
      </template>
      <template v-slot:item.actions="{ item }">
     <v-icon
        small
        class="mr-2"
        @click="edit(item)"
      >
        mdi-pencil
      </v-icon>
    
    </template>

    </v-data-table>
    <div>
      <va-modal
        v-model="showMenuModal"
        size="large"
        :title="title_modal"
        :hideDefaultActions="true"
      >
        <form>
          <div>
            <v-row justify="center">
              <v-col col-md-6>

                <v-text-field
                  v-model="menu_name"
                  label="Menu Name"
                  required
                ></v-text-field>
                <v-text-field
                  v-model="menu_desc"
                  label="Menu Description"
                  required
                ></v-text-field>
                <v-select :items="listDetail"
                  v-model="detail" item-text="name" item-value="value" single-line  label="Detail"></v-select>
                <v-text-field
                  v-model="seq"
                  label="Sequence"
                  required
                ></v-text-field>
                <va-checkbox v-model="active_flag" label="Active Flag" />

              </v-col>

            </v-row>

            <va-button type="button" color="danger" @click="close_modal()">
              Cancel</va-button
            >
            <va-button type="button" color="success" @click="submit()">
              Submit</va-button
            >
          </div>
        </form>
      </va-modal>
    </div>
    <div style="margin-top: 100px;">
     <v-spacer></v-spacer>
                      <v-spacer></v-spacer>
                    </div>
  <div>
    
     <v-data-table
      v-model="selected"
      :headers="fields_menu_detail"
      :items="listMenuDetail"
      :single-select="singleSelect"
      @click:row="edit_submenu"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar
          flat
        >
          <v-toolbar-title>Master Menu Detail</v-toolbar-title>
          <v-divider
            class="mx-4"
            inset
            vertical
          ></v-divider>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            dark
            class="mb-2"
            @click="addMenuDetail()"
          >
            New Menu Detail
          </v-btn>

        </v-toolbar>
      </template>
        
    </v-data-table>
    <div>
      <va-modal
        v-model="showMenuModal"
        size="large"
        :title="title_modal"
        :hideDefaultActions="true"
      >
        <form>
          <div>
            <v-row justify="center">
              <v-col col-md-6>

                <v-text-field
                  v-model="menu_name"
                  label="Menu Name"
                  required
                ></v-text-field>
                <v-text-field
                  v-model="menu_desc"
                  label="Menu Description"
                  required
                ></v-text-field>
                <v-select :items="listDetail"
                  v-model="detail" item-text="name" item-value="value" single-line  label="Detail"></v-select>
                <v-text-field
                  v-model="seq"
                  label="Sequence"
                  required
                ></v-text-field>
                <va-checkbox v-model="active_flag" label="Active Flag" />

              </v-col>

            </v-row>

            <va-button type="button" color="danger" @click="close_modal()">
              Cancel</va-button
            >
            <va-button type="button" color="success" @click="submit()">
              Submit</va-button
            >
          </div>
        </form>
      </va-modal>
       <va-modal
        v-model="showMenuDetailModal"
        size="large"
        :title="title_modal_detail"
        :hideDefaultActions="true"
      >
        <form>
          <div>
            <v-row justify="center">
              <v-col col-md-6>
                <v-select :items="listMenuOption"
                  v-model="menu_detail_menu" item-text="name" item-value="id"  v-on:input='get_data_submenu' single-line  label="Menu"></v-select>
                <v-text-field
                  v-model="menu_detail_name"
                  label="Nama Menu Detail"
                  required
                ></v-text-field>
                <v-text-field
                  v-model="menu_detail_desc"
                  label="Menu Detail Description"
                  required
                ></v-text-field>
                <v-select :items="listSubMenuOption"
                  v-model="sub_menu_id" item-text="name" item-value="value" single-line  label="Sub Menu"></v-select>
                
                <v-text-field
                  v-model="seq_menu_detail"
                  label="Sequence"
                  required
                ></v-text-field>
                <va-checkbox v-model="active_flag" label="Active Flag" />
              </v-col>

            </v-row>

            <va-button type="button" color="danger" @click="close_modal()">
              Cancel</va-button
            >
            <va-button type="button" color="success" @click="submit_submenu()">
              Submit</va-button
            >
          </div>
        </form>
      </va-modal>
    </div>
  </div>
   

  </va-card>
 </template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2/dist/sweetalert2.js'

import 'sweetalert2/src/sweetalert2.scss'
export default {
  data () {
    return {
      listMenu: [],
      listMenuDetail:[],
      listMenuOption:[],
      listSubMenuOption:[],
      title_modal: '',
      title_modal_detail:'',
      menu_detail_name:'',
      menu_detail_desc:'',
      menu_detail_menu:'',
      listDetail: [{
        id: 1,
        name: 'Yes',
      },
      {
        id: 2,
        name: 'No',
      }],
      detail: '',
      seq: '',
      seq_menu_detail:'',
      menu_name: '',
      menu_desc: '',
      menu_id: '',
      menu_detail_id:'',
      sub_menu_id:'',
      active_flag: true,
      active_flag1: '',
      pindah: [],
      formTitle: 'Add New Menu',
      dialog: false,
      action_edit: false,
      showMenuModal: false,
      showMenuDetailModal:false,
      singleSelect: true,
      selected: [],
      select: true,
    }
  },
  created () {
    this.get_menu()
  },
  computed: {
    fields () {
      return [

        {
          value: 'MENU_NAME',
          text: 'Nama Menu',
        }, {
          value: 'MENU_DESC',
          text: 'Deskripsi',
        }, {
          value: 'SEQ',
          text: 'Seq',
        }, {
          value: 'ACTIVE_FLAG',
          text: 'Active',
        }, {
          value: 'ACTIVE_DATE',
          text: 'Active Date',
        }, {
          value: 'INACTIVE_DATE',
          text: 'Inactive Date',
        }, {
          value: 'IS_DETAIL',
          text: 'Detail',
        }, { text: 'Actions', value: 'actions', sortable: false }]
    },
    fields_menu_detail () {
      return [

        {
          value: 'MENU_DETAIL_NAME',
          text: 'Nama Menu',
        }, {
          value: 'MENU_DETAIL_DESC',
          text: 'Deskripsi',
        }, {
          value: 'SEQ',
          text: 'Seq',
        }, {
          value: 'ACTIVE_FLAG',
          text: 'Active',
        }, {
          value: 'ACTIVE_DATE',
          text: 'Active Date',
        }, {
          value: 'INACTIVE_DATE',
          text: 'Inactive Date',
        }, {
          value: 'SUB_MENU_DETAIL',
          text: 'Sub Menu',
        }]
    },
  },
  methods: {
    close_modal () {
      this.showMenuModal = false
      this.showMenuDetailModal=false
      this.action_edit=false
    },
    addMenuDetail(){
      this.get_menu()
      this.showMenuDetailModal=true
      this.action_edit=false
      this.title_modal_detail='Add New Menu Detail'
    },
    addMenu () {
      this.action_edit = false
      this.showMenuModal = true
      this.title_modal = 'Add New Menu'
      this.detail = ''
      this.seq = ''
      this.menu_name = ''
      this.menu_desc = ''
      this.menu_id = ''
      this.active_flag = true
      this.active_flag1 = ''
    },
    get_data_menu_detail(data){

       axios({
            method: 'post',
            url: 'http://localhost:8000/get_data_menu_detail/',
            data: {
              menu_id: data.MENU_ID,
              user_id: this.$session.get('id'),
            },
            headers: {
              Authorization: 'Bearer ' + this.$session.get('token'),
            },
          })
            .then(response => {
             
             this.listMenuDetail = []
          this.data = response.data
          this.data.forEach(item => {
            this.listMenuDetail.push({ MENU_ID: item.MENU_ID, MENU_DETAIL_ID: item.MENU_DETAIL_ID, MENU_DETAIL_NAME:item.MENU_DETAIL_NAME,MENU_DETAIL_DESC: item.MENU_DETAIL_DESC, SUB_MENU_DETAIL: item.SUB_MENU_DETAIL, ACTIVE_FLAG: item.ACTIVE_FLAG, ACTIVE_DATE: item.ACTIVE_DATE, INACTIVE_DATE: item.INACTIVE_DATE, SEQ: item.SEQ })
          })
            })
            .catch(error => {
              console.log(error.response)
            })
    },
    submit () {
      if (this.menu_name !== '' && this.menu_desc !== '' && this.active_flag !== '' && this.seq !== '') {
        if (this.active_flag === true) {
          this.active_flag1 = 'Y'
        } else {
          this.active_flag1 = 'N'
        }
        if (this.detail.description === 'Yes') {
          this.detail = 'Y'
        } else {
          this.detail = 'N'
        }
        if (this.action_edit === false) {
            axios({
              method: 'post',
              url: 'http://localhost:8000/compare_data_menu/',
              data: {
                menu_name: this.menu_name,
                menu_desc: this.menu_desc,
              },
              headers: {
                Authorization: 'Bearer ' + this.$session.get('token'),
              },
            }).then((response) => {
              if (response.data > 0 ) {
                Swal.fire({
                  title: 'Error!',
                  text: 'Menu gagal ditambahkan.',
                  icon: 'error',
                })
                this.showMenuModal = true
                this.action_edit = false
              } else {
                 axios({
                    method: 'post',
                    url: 'http://localhost:8000/insert_data_menu/',
                    data: {
                      menu_name: this.menu_name,
                      menu_desc: this.menu_desc,
                      active_flag: this.active_flag1,
                      seq: this.seq,
                      detail: this.detail,
                      user_id: this.$session.get('id'),
                    },
                  headers: {
                    Authorization: 'Bearer ' + this.$session.get('token'),
                  },
                  })
                .then(response => {
                  Swal.fire({
                    title: 'Success!',
                    text: 'Menu berhasil didaftarkan.',
                    icon: 'success',
                  })
                  this.showMenuModal = false
                  this.get_menu()
                  console.log(response.data)
                })
                .catch(error => {
                  console.log(error.response)
                })


              }
          })
        } else {
          axios({
              method: 'post',
              url: 'http://localhost:8000/compare_data_menu/',
              data: {
                menu_name: this.menu_name,
                menu_desc: this.menu_desc,
                menu_id:this.menu_id
              },
              headers: {
                Authorization: 'Bearer ' + this.$session.get('token'),
              },
            }).then((response) => {
              if (response.data > 0) {
                Swal.fire({
                  title: 'Error!',
                  text: 'Menu gagal diupdate.',
                  icon: 'error',
                })
                this.showMenuModal = true
                this.action_edit = true
              } else {
                
                 axios({
            method: 'post',
            url: 'http://localhost:8000/update_data_menu/',
            data: {
              menu_id: this.menu_id,
              menu_name: this.menu_name,
              menu_desc: this.menu_desc,
              detail: this.detail,
              active_flag: this.active_flag1,
              seq: this.seq,
              user_id: this.$session.get('id'),
            },
            headers: {
              Authorization: 'Bearer ' + this.$session.get('token'),
            },
          })
            .then(response => {
              this.close_modal()
              if (response.data === 0) {
                Swal.fire({
                  title: 'Error!',
                  text: 'Menu gagal diupdate.',
                  icon: 'error',
                })
              } else {
                Swal.fire({
                  title: 'Success!',
                  text: 'Menu berhasil diupdate.',
                  icon: 'success',
                })
              }

              this.get_menu()
            })
            .catch(error => {
              console.log(error.response)
            })
              }
          })
        }
      } else {
        Swal.fire({
          title: 'Error!',
          text: 'Harap lengkapi datanya .',
          icon: 'error',
        })
      }
    },
    submit_submenu () {
      if (this.menu_detail_menu !== '' && this.menu_detail_name !== '' && this.menu_detail_desc !== '' && this.seq_menu_detail !== '') {
          if (this.active_flag === true) {
          this.active_flag1 = 'Y'
        } else {
          this.active_flag1 = 'N'
        }
        if (this.action_edit === false) {
        axios({
              method: 'post',
              url: 'http://localhost:8000/compare_data_menu_detail/',
              data: {
                menu_name:this.menu_detail_name,
                menu_desc:this.menu_detail_desc,
        
              },
              headers: {
                Authorization: 'Bearer ' + this.$session.get('token'),
              },
            }).then((response) => {
              if (response.data > 0) {
                Swal.fire({
                  title: 'Error!',
                  text: 'Menu Detail gagal ditambahkan.',
                  icon: 'error',
                })
                this.showMenuDetailModal = true
                this.action_edit = false
              } else {
                
                    axios({
            method: 'post',
            url: 'http://localhost:8000/insert_data_menu_detail/',
            data: {
              menu_id: this.menu_detail_menu,
              menu_name: this.menu_detail_name,
              menu_desc: this.menu_detail_desc,
              seq: this.seq_menu_detail,
              submenu_id: this.sub_menu_id,
              user_id: this.$session.get('id'),
            },
            headers: {
              Authorization: 'Bearer ' + this.$session.get('token'),
            },
          })
            .then(response => {
              Swal.fire({
                title: 'Success!',
                text: 'Menu Detail berhasil didaftarkan.',
                icon: 'success',
              })
              this.showMenuDetailModal = false
              this.get_data_menu_detail()
              console.log(response.data)
            })
            .catch(error => {
              console.log(error.response)
            })
              }
          })
        } else {
           axios({
              method: 'post',
              url: 'http://localhost:8000/compare_data_menu_detail/',
              data: {
                menu_name:this.menu_detail_name,
                menu_desc:this.menu_detail_desc,
                menu_detail_id: this.menu_detail_id,
              },
              headers: {
                Authorization: 'Bearer ' + this.$session.get('token'),
              },
            }).then((response) => {
              if (response.data > 0) {
                Swal.fire({
                  title: 'Error!',
                  text: 'Menu Detail gagal diupdate.',
                  icon: 'error',
                })
                this.showMenuDetailModal = true
                this.action_edit = true
              } else {
                
                  axios({
            method: 'post',
            url: 'http://localhost:8000/update_data_menu_detail/',
            data: {
              menu_detail_id: this.menu_detail_id,
              menu_id: this.menu_detail_menu,
              menu_name: this.menu_detail_name,
              menu_desc: this.menu_detail_desc,
              seq: this.seq_menu_detail,
              submenu_id: this.sub_menu_id,
              active_flag: this.active_flag1,
              user_id: this.$session.get('id'),
            },
            headers: {
              Authorization: 'Bearer ' + this.$session.get('token'),
            },
          })
            .then(response => {
              
              if (response.data === 0) {
                Swal.fire({
                  title: 'Error!',
                  text: 'Menu Detail gagal diupdate.',
                  icon: 'error',
                })
              } else {
                Swal.fire({
                  title: 'Success!',
                  text: 'Menu Detail berhasil diupdate.',
                  icon: 'success',
                })
              }
              this.close_modal()
              this.get_data_menu_detail()
            })
            .catch(error => {
              console.log(error.response)
            })
              }
          })
        }
      } else {
        Swal.fire({
          title: 'Error!',
          text: 'Harap lengkapi datanya .',
          icon: 'error',
        })
      }
    },
    edit (data) {
      this.action_edit = true
      if (data.ACTIVE_FLAG === 'Y') {
        this.active_flag = true
        this.active_flag1 = 'Y'
      } else {
        this.active_flag = false
        this.active_flag1 = 'Y'
      }
      this.showMenuModal = true
      this.menu_name = data.MENU_NAME
      this.menu_desc = data.MENU_DESC
      this.menu_id = data.MENU_ID
      if (data.IS_DETAIL === 'Y') {
        this.detail = 'Yes'
      } else {
        this.detail = 'No'
      }

      this.seq = data.SEQ
    },
    edit_submenu (data) {
      this.action_edit = true
      if (data.ACTIVE_FLAG === 'Y') {
        this.active_flag = true
        this.active_flag1 = 'Y'
      } else {
        this.active_flag = false
        this.active_flag1 = 'Y'
      }
      this.showMenuDetailModal = true
      this.menu_detail_id=data.MENU_DETAIL_ID
      this.sub_menu_id = data.SUB_MENU_DETAIL
      this.menu_detail_desc = data.MENU_DETAIL_DESC
      this.menu_detail_menu = data.MENU_ID
      this.get_data_submenu(data.MENU_ID)
      this.menu_detail_name=data.MENU_DETAIL_NAME
     
      this.seq_menu_detail = data.SEQ
    },
    get_menu: function () {
      axios({
        method: 'get',
        url: 'http://localhost:8000/get_data_menu/',
        data: {
        },
        headers: {
          Authorization: 'Bearer ' + this.$session.get('token'),
        },
      })
        .then(response => {
          this.listMenu = []
          this.listMenuOption=[]
          this.data = response.data
          this.data.forEach(item => {
            this.listMenu.push({ MENU_ID: item.MENU_ID, MENU_NAME: item.MENU_NAME, MENU_DESC: item.MENU_DESC, SEQ: item.SEQ, ACTIVE_FLAG: item.ACTIVE_FLAG, ACTIVE_DATE: item.ACTIVE_DATE, INACTIVE_DATE: item.INACTIVE_DATE, IS_DETAIL: item.IS_DETAIL })
             this.listMenuOption.push({ id: item.MENU_ID, name: item.MENU_NAME })
            
            })


        })
        .catch(error => {
          console.log(error.response)
        })
    },
    get_data_submenu: function (value) {
      this.menu_detail_menu=value
      axios({
        method: 'POST',
        url: 'http://localhost:8000/get_data_submenu/',
        data: {
          menu_id:this.menu_detail_menu
        },
        headers: {
          Authorization: 'Bearer ' + this.$session.get('token'),
        },
      })
        .then(response => {
          this.listSubMenuOption=[]
          this.data = response.data
          this.data.forEach(item => {
            this.listSubMenuOption.push({ id: item.MENU_ID, name: item.MENU_NAME })
            
            })


        })
        .catch(error => {
          console.log(error.response)
        })
    },

  },
}
</script>

