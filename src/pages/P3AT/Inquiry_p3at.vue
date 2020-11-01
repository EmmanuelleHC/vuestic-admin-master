<template>
  <div class="inq-p3at">
    <va-card class="justify-center">
      <v-card-title>
        <h2>Inquiry P3AT</h2>
      </v-card-title>
      <div class="row">
        <data-table-P3AT
          :data_list_inq_p3at="data_list_inq_p3at"
          class="mb-4"
        />
      </div>
    </va-card>
  </div>
</template>

<script>
import axios from 'axios'
import DataTableP3AT from '../../components/user/P3AT/DataTableP3AT.vue'
export default {
  name: 'inq_p3at',
  components: {
    DataTableP3AT,
  },
  data () {
    return {
      data_list_inq_p3at: [],
    }
  },
  mounted () {
    this.get_inq_p3at()
  },
  created: function () {},
  methods: {
    get_inq_p3at: function () {
      axios({
        method: 'post',
        url: 'http://localhost:8000/get_inq_p3at/',
        data: {
          user_id: this.$session.get('id'),
        },
        headers: {
          Authorization: 'Bearer ' + this.$session.get('token'),
        },
      })
        .then((response) => {
          this.data_list_inq_p3at = []
          this.data = response.data
          this.data.forEach((item) => {
            this.data_list_inq_p3at.push({
              ID: item.ID,
              P3AT_NUMBER: item.P3AT_NUMBER,
              P3AT_DATE: item.P3AT_DATE,
              TOTAL_ASSET_PRICE: item.TOTAL_ASSET_PRICE,
              TOTAL_BOOKS_PRICE: item.TOTAL_BOOKS_PRICE,
              TOTAL_COST_REMOVAL: item.TOTAL_COST_REMOVAL,
              TOTAL_QTY: item.TOTAL_QTY,
              STATUS: item.STATUS,
              EFFECTIVE_DATE: item.EFFECTIVE_DATE,
            })
          })
        })
        .catch((error) => {
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
