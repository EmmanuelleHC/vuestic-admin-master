<template>
  <div class="master-menu">
    <va-card>
      <va-button  type="button" color="success" @click="addMenu()">Add </va-button>

      <div class="row">

        <data-table-menu :listMenu="listMenu"
          class="mb-4"/>
      </div>

    </va-card>
    <div>
      <va-modal
        v-model="showMenuModal"
        size="large"
        :title="'Add Menu'"
        :hideDefaultActions=true>
        <form>

          <div>
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
            <va-button  type="button" color="success" @click="submit()"> Submit</va-button>

          </div>

        </form>
      </va-modal>
    </div>
  </div>

</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2/dist/sweetalert2.js'

import 'sweetalert2/src/sweetalert2.scss'
import DataTableMenu from '../../components/admin/master/DataTableMenu.vue'
export default {
  name: 'master-menu',
  components: {
    DataTableMenu,
  },
  data () {
    return {
      listMenu: [],
      listDetail: [{
        id: 1,
        description: 'Yes',
      },
      {
        id: 2,
        description: 'No',
      }],
      detail: '',
      seq: '',
      menu_name: '',
      menu_desc: '',
      active_flag1: '',
      active_flag: true,
      showMenuModal: false,
    }
  },
  mounted () {
    this.get_menu()
  },
  created: function () {

  },
  methods: {
    addMenu () {
      this.showMenuModal = true
    },
    submit () {
      if (this.active_flag === true) {
        this.active_flag1 = 'Y'
      } else {
        this.active_flag1 = 'N'
      }
      if (this.menu_name !== '' && this.menu_desc !== '' && this.active_flag1 !== '' && this.seq !== '' && this.detail !== '') {
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
            this.get_company()
            console.log(response.data)
          })
          .catch(error => {
            console.log(error.response)
          })
      } else {
        Swal.fire({
          title: 'Error!',
          text: 'Harap Lengkapi data.',
          icon: 'error',
        })
      }
    },
    close_modal () {
      this.showMenuModal = false
    },
    setSelectedDetail (value) {
      this.detail = value.description
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
          this.data = response.data
          this.data.forEach(item => {
            this.listMenu.push({ MENU_ID: item.MENU_ID, MENU_NAME: item.MENU_NAME, MENU_DESC: item.MENU_DESC, SEQ: item.SEQ, ACTIVE_FLAG: item.ACTIVE_FLAG, ACTIVE_DATE: item.ACTIVE_DATE, INACTIVE_DATE: item.INACTIVE_DATE, IS_DETAIL: item.IS_DETAIL })
          })
        })
        .catch(error => {
          console.log(error.response)
        })
    },
  },
}
</script>

<style>
.row.row-inside {
  max-width: none;
}
</style>
