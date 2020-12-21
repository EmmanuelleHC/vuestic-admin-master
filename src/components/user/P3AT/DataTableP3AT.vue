<template>
  <v-app>
    <v-card class="justify-center">
      <v-card-title>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Filter"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
      <v-data-table
        id="mytable"
        :headers="headers"
        :items="data_list_inq_p3at"
        :search="search"
        sort-by="ID"
        class="elevation-1"
      >
        <template v-slot:item.STATUS="{ item }">
          <v-chip :color="getColor(item.STATUS)" dark>
            {{ item.STATUS }}
          </v-chip>
        </template>

        <template v-slot:item.TOTAL_COST_REMOVAL="{ item }">
          {{ formatPrice(item.TOTAL_COST_REMOVAL) }}
        </template>
        <template v-slot:item.TOTAL_ASSET_PRICE="{ item }">
          {{ formatPrice(item.TOTAL_ASSET_PRICE) }}
        </template>
        <template v-slot:item.TOTAL_BOOKS_PRICE="{ item }">
          {{ formatPrice(item.TOTAL_BOOKS_PRICE) }}
        </template>
        <template v-slot:item.P3AT_DATE="{ item }">
          {{ formatDate(item.P3AT_DATE) }}
        </template>

      
        <template v-slot:item.actions="{ item }">
          <v-btn color="primary" dark class="mb-2" @click="detail(item)">
            Detail
          </v-btn>
        </template>
      </v-data-table>
      <v-dialog
        v-model="dialog2"
     
        fullscreen
      >
      <div class="justify center">

       <div v-if="loading">
       
          <loader />
        </div>
      </div>

        <v-card>
         <v-toolbar>
                
                  <v-app-bar-nav-icon></v-app-bar-nav-icon>
                  <v-toolbar-title>Detail P3AT</v-toolbar-title>
                       <v-spacer></v-spacer>
                    <v-spacer></v-spacer>
                    <v-spacer></v-spacer>
                    <v-spacer></v-spacer>
                 <v-btn
                  color="blue darken-1"
                  text
                  @click="dialog2 = false"
                >
                  <v-icon>mdi-close</v-icon>
                </v-btn>

            
          </v-btn>
              </v-toolbar>
          
          <v-divider></v-divider>
          <v-row justify="center">
            <v-col col-md-6>
              <v-card>
                <v-card-text style="height: 200px;">
                  <table style="float: left; margin-right: 5%;" width="50%" >
                    <tr><td><b>P3AT Number</b></td>
                      <td><b>:</b></td>
                      <td><b>{{p3at_number}}</b></td>
                      <td><br>  <br></td>
                    </tr>

                    <tr><td><b>P3AT Date</b></td><td><b>:</b></td>
                      <td><b>{{ formatDate(p3at_date) }}</b></td>
                      <td><br>  <br></td>
                    </tr>
                    <tr><td><b>Status</b></td><td><b>:</b></td>
                      <td><b>{{status}}</b></td>
                      <td><br>  <br></td>
                    </tr>
                  </table>

                  <table style="display: inline-block;""  >
                    <tr><td><br>  <br></td>
                      <td><b>Total Asset Qty</b></td><td><b>:</b></td>
                      <td><b>{{total_qty}}</b></td>
                    </tr>
                    <tr><td><br>   <br></td>
                      <td><b>Total of Books Price</b></td><td>:</td>
                      <td><b>{{ formatPrice(total_asset_price) }}</b></td>
                    </tr>
                    <tr><td><br>  <br></td>
                      <td><b>Total of Cost Removal</b></td><td><b>:</b></td>
                      <td><b>{{ formatPrice(total_cost_removal) }}</b></td>
                    </tr>
                  </table>
                </v-card-text>
              </v-card>
              <v-card>
                <v-divider></v-divider>
                <v-card-text style="height: 250px;">
                  <v-row justify="center">
                    <v-col>
                      <v-spacer></v-spacer>
                      <v-spacer></v-spacer>
                      <v-card-title>List Asset</v-card-title>

                      <div style="height: 200px; overflow-y: scroll;">
                        <v-data-table
                          :headers="headers2"
                          :items="data_detail_inq_p3at"
                          :search="search_detail"
                          sort-by="ID"
                          class="elevation-1"
                        >
                         <template v-slot:item.ASSET_PRICE="{ item }">
          {{ formatPrice(item.ASSET_PRICE) }}
        </template>
                      <template v-slot:item.BOOKS_PRICE="{ item }">
          {{ formatPrice(item.BOOKS_PRICE) }}
        </template>
                       <template v-slot:item.COST_REMOVAL="{ item }">
          {{ formatPrice(item.COST_REMOVAL) }}
        </template>
                        </v-data-table>
                      </div>
                    </v-col>
                  </v-row >
                </v-card-text>


                <v-card-text style="height: 400px;">
                  <v-row>
                    <v-col>
                      <v-card-title>Info</v-card-title>
                       <div>
                        <v-btn
                          class="ma-2"
                          color="success"
                          @click="print_pdf()"
                        >
                          Print PDF
                        </v-btn>

                       </div>
                       
                      <div v-if="need_approve">

                        <v-btn
                          class="ma-2"
                          :loading="loadingApprove"
                          :disabled="disableApprove"
                          color="success"
                          @click="approve()"
                        >
                          Approve
                        </v-btn>

                        <v-btn
                          class="ma-2"
                          :loading="loadingReject"
                          :disabled="disableReject"
                          color="error"
                          @click="reject()"
                        >
                          Reject
                        </v-btn>
                        <v-btn
                          class="ma-2"
                          color="primary"
                          @click="cancel()"
                        >
                          Cancel
                        </v-btn>

                        <!-- here put a spinner or whatever you want to indicate that a request is in progress -->
                      </div>
                      <div v-if="showOTP">
                        <v-text-field
                          v-model="referenceNum"
                          label="No Referensi"
                        >
                          <template slot="append">
                            <v-btn
                              class="ma-2"
                              :loading="generateOtp"
                              :disabled="generateOtp"
                              color="warning"
                              @click="genNewOtp()">

                              New OTP
                            </v-btn>
                          </template>
                        </v-text-field>
                        <v-text-field
                          v-model="otp"
                          hint="Input Kode Verifikasi"
                          label="Input Kode Verifikasi"
                        >

                        </v-text-field>

                      </div>
                      <div v-if="action">
                        <v-text-field
                          v-model="alasan"
                          hint="Input Alasan"
                          label="Input Alasan"
                        >

                        </v-text-field>
                      </div>

                    </v-col>

                    <v-col>

                      <v-card-title>Log History</v-card-title>
                      <div style="height: 100px; overflow-y: scroll;">
                        <v-data-table
                          :headers="log_header"
                          :items="data_log_header"
                          sort-by="ID"
                          class="elevation-1"
                        >
                        </v-data-table>
                      </div>
                    </v-col>
                  </v-row>
                </v-card-text>
              </v-card>
              <v-spacer></v-spacer>
              <v-spacer></v-spacer>

             
            </v-col>
          </v-row >

        </v-card>

      </v-dialog>

    </v-card>
  </v-app>
</template>
<script>
import moment from 'moment'
import axios from 'axios'
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'
import Loader from '../../../components/statistics/progress-bars/Widgets/Loading.vue'
import jsPDF from 'jspdf'
export default {
  data: () => ({
    need_approve: false,
    showOTP: false,
    disableReject: false,
    disableApprove: false,
    search: '',
    p3at_number: '',
    alasan: '',
    referenceNum: '',
    loader: null,
    otp: '',
    loadingApprove: false,
    loading:false,
    generateOtp: false,
    loadingReject: false,
    p3at_date: '',
    status: '',
    total_qty: '',
    total_asset_price: '',
    total_cost_removal: '',
    dialog2: false,
    action: false,
    data_log_header: [],
    data_detail_inq_p3at: [],
    search_detail: '',
    log_header: [{ text: 'Tipe', value: 'APPROVAL_TYPE' },
      { text: 'Tanggal', value: 'CREATED_AT', formatter: 'formatDate' },
      { text: 'Oleh', value: 'EMP_NAME' },
      { text: 'Approval ke', value: 'APPROVAL_KE', width: '1%' },
      { text: 'Status', value: 'DESCRIPTION' },
      { text: 'Alasan', value: 'REASON_APPROVAL' },
    ],
    headers: [
      { text: 'No  P3AT', value: 'P3AT_NUMBER' },
      { text: 'Tanggal P3AT', value: 'P3AT_DATE', formatter: 'formatDate' },
      { text: 'Total Asset Qty', value: 'TOTAL_QTY' },
      { text: 'Total Nilai Perolehan', value: 'TOTAL_ASSET_PRICE', align: 'right', formatter: 'formatPrice' },
      {
        text: 'Total of Books Price',
        value: 'TOTAL_BOOKS_PRICE',
        align: 'right',
      },
      {
        text: 'Total Harga Jual Dasar',
        value: 'TOTAL_COST_REMOVAL',
        align: 'right',
        formatter: 'formatPrice',
      },
      { text: 'Status', value: 'STATUS' },
      { text: 'Actions', value: 'actions', sortable: false },
    ],
    headers2: [
      { text: 'Kode AT', value: 'ASSET_NUMBER' },
      { text: 'Nama Barang', value: 'ASSET_NAME' },
      { text: 'Qty', value: 'QTY_ASSET' },
      { text: 'Pemakai', value: 'PEMAKAI' },
      { text: 'Lokasi', value: 'ASSET_LOCATION' },
      { text: 'Tgl Perolehan', value: 'EFFECTIVE_DATE', formatter: 'formatDate' },
      { text: 'Nilai Perolehan', value: 'ASSET_PRICE', align: 'right',  formatter: 'formatPrice' },
      {
        text: 'Jumlah Tercatat',
        value: 'BOOKS_PRICE',
        align: 'right',
        formatter: 'formatPrice',
      },
      { text: 'Alasan P3AT', value: 'STATUS' },  
      {
        text: 'Harga Jual + Dasar',
        value: 'COST_OF_REMOVAL',
        align: 'right',
        formatter: 'formatPrice',
      },
      ],
  }),
  props: {
    data_list_inq_p3at: Array,
  },
  computed: {},
  components: {
    Loader,
   
  },
  created () {},
  watch: {
    loader () {
      const l = this.loader
      this[l] = !this[l]

      setTimeout(() => (this[l] = false), 3000)

      this.loader = null
    },
  },
  methods: {
    getColor (status) {
      if (status === 'New') return 'yellow'
      else if (status === 'REJECTED') return 'red'
      else return 'green'
    },
    print_pdf(){
      let pdfName='test';
      var doc=new jsPDF();
      doc.text('Hello World',10,10);
      doc.save(pdfName+'.pdf');
/*
 
        axios({
        method: 'post',
        url: 'http://sd6webdev.indomaret.lan:8000/print_report',
        data: {
          p3at_number: this.p3at_number,
        },
        headers: {
          Authorization: 'Bearer ' + this.$session.get('token'),


         
        },
      }).then((response) => {
                alert('MASUK');

             
               console.log(response);
                    //  const url = window.URL.createObjectURL(new Blob([response.data],{ type: 'application/pdf' }));
                      //window.open(url);
                     
            }).catch(function(error){
                  console.log(error);
                 Swal.fire({
                  title:'Peringatan',
                  icon :'warning',
                  text:'Report tidak bisa dicetak.'
              });
        });

*/

    },
    genNewOtp () {
   
      axios({
        method: 'post',
        url: 'http://sd6webdev.indomaret.lan:8000/generate_otp/',
        data: {
          user_id: this.$session.get('id'),
        },
        headers: {
          Authorization: 'Bearer ' + this.$session.get('token'),
         
        },
      })
        .then((response) => {
          this.referenceNum = response.data.message
          Swal.fire({
            title: 'Success!',
            text: 'Silahkan cek email anda.',
            icon: 'success',
          })
        })
    },
    approve () {
      this.loading=true
      if (this.action === false) {
        this.disableReject = true
        this.showOTP = true
        axios({
          method: 'post',
          url: 'http://sd6webdev.indomaret.lan:8000/cek_otp/',
          data: {
            user_id: this.$session.get('id'),

          },
          headers: {
            Authorization: 'Bearer ' + this.$session.get('token'),
          },
        })
          .then((response) => {
            if (response.data !== 0) {

              axios({
                method: 'post',
                url: 'http://sd6webdev.indomaret.lan:8000/get_last_otp/',
                data: {
                  user_id: this.$session.get('id'),

                },
                headers: {
                  Authorization: 'Bearer ' + this.$session.get('token'),
                },
              })
                .then((response) => {
                  this.referenceNum = response.data
                  this.action = true
                  this.loading=false
                })
            } else {

              this.action = true
              this.genNewOtp()
              this.loading=false
            }
          })
      } else {
        this.loadingApprove = true
        if(this.alasan.length >=2){
             axios({
          method: 'post',
          url: 'http://sd6webdev.indomaret.lan:8000/submit_otp/',
          data: {

            user_id: this.$session.get('id'),
            referenceNum: this.referenceNum,
            otp: this.otp,
          },
          headers: {
            Authorization: 'Bearer ' + this.$session.get('token'),
          },
        })
          .then((response) => {
            console.log(response.data)
            if (response.data.message === 'berhasil verifikasi') {
              axios({
                method: 'post',
                url: 'http://sd6webdev.indomaret.lan:8000/approve_p3at/',
                data: {
                  p3at_number: this.p3at_number,
                  user_id: this.$session.get('id'),
                  alasan: this.alasan,

                },
                headers: {
                  Authorization: 'Bearer ' + this.$session.get('token'),
                },
              })
                .then((response) => {
                  Swal.fire({
                    title: 'Success!',
                    text: 'Anda berhasil melakukan approve.',
                    icon: 'success',
                  })
                  this.loadingApprove = false
                  this.need_approve = false
                  this.showOTP = false
                  this.disableApprove = false
                  this.disableReject = false
                  this.action = false
                  this.loading=false
                })
                .catch((error) => {
                  console.log(error.response)
                })
            } else {
              Swal.fire({
                title: 'Error!',
                text: 'Verifikasi Gagal.',
                icon: 'error',
              })
              this.loadingApprove = false
              this.need_approve = true
              this.disableApprove = false
              this.disableReject = false
              this.action = true
              this.loading=false
            }
          })
          .catch((error) => {
            console.log(error.response)
          })
        }else{

          Swal.fire({
            title: 'Error!',
            text: 'Lengkapi alasan anda.',
            icon: 'error',
          })
          this.loadingApprove=false
          this.loading=false
        }
       
      }
    },
    cancel () {
      this.showOTP = false
      this.disableReject = false
      this.disableApprove = false
      this.action = false
    },
    reject () {
      this.loading=true
      if (this.action === false) {
        this.disableApprove = true
        this.showOTP = true
        axios({
          method: 'post',
          url: 'http://sd6webdev.indomaret.lan:8000/cek_otp/',
          data: {
            user_id: this.$session.get('id'),

          },
          headers: {
            Authorization: 'Bearer ' + this.$session.get('token'),
          },
        })
          .then((response) => {
            if (response.data !== 0) {
              axios({
                method: 'post',
                url: 'http://sd6webdev.indomaret.lan:8000/get_last_otp/',
                data: {
                  user_id: this.$session.get('id'),

                },
                headers: {
                  Authorization: 'Bearer ' + this.$session.get('token'),
                },
              })
                .then((response) => {
                  this.referenceNum = response.data
                  this.action = true
                  this.loading=false
                })
            } else {
              this.action = true
              this.genNewOtp()
              this.loading=false
            }
          })
      } else {
        if (this.alasan.length >=2) {
          this.loadingReject = true
          axios({
            method: 'post',
            url: 'http://sd6webdev.indomaret.lan:8000/submit_otp/',
            data: {

              user_id: this.$session.get('id'),
              referenceNum: this.referenceNum,
              otp: this.otp,
            },
            headers: {
              Authorization: 'Bearer ' + this.$session.get('token'),
            },
          })
            .then((response) => {
              console.log(response.data)
              if (response.data.message === 'berhasil verifikasi') {
                axios({
                  method: 'post',
                  url: 'http://sd6webdev.indomaret.lan:8000/reject_p3at/',
                  data: {
                    p3at_number: this.p3at_number,
                    user_id: this.$session.get('id'),
                    alasan: this.alasan,

                  },
                  headers: {
                    Authorization: 'Bearer ' + this.$session.get('token'),
                  },
                })
                  .then((response) => {
                    Swal.fire({
                      title: 'Success!',
                      text: 'Anda berhasil melakukan reject.',
                      icon: 'success',
                    })
                    this.loadingReject = false
                    this.need_approve = false
                    this.showOTP = false
                    this.disableApprove = false
                    this.disableReject = false
                    this.action = false
                    this.loading=false
                  })
                  .catch((error) => {
                    console.log(error.response)
                  })
              } else {
                Swal.fire({
                  title: 'Success!',
                  text: 'Verifikasi Gagal.',
                  icon: 'success',
                })
                this.loadingApprove = false
                this.need_approve = true
                this.disableApprove = false
                this.disableReject = false
                this.action = true
                this.loading=false
              }
            })
            .catch((error) => {
              console.log(error.response)
            })
        } else {
          Swal.fire({
            title: 'Error!',
            text: 'Lengkapi alasan anda.',
            icon: 'error',
          })
          this.loading=false
          this.loadingReject=false
        }
      }
    },
    loadLogHistory (p3at_number) {
      axios({
        method: 'post',
        url: 'http://sd6webdev.indomaret.lan:8000/get_log_history/',
        data: {
          P3AT_NUMBER: p3at_number,
        },
        headers: {
          Authorization: 'Bearer ' + this.$session.get('token'),
        },
      })
        .then((response) => {
          this.data_log_header = []
          this.data = response.data
          this.data.forEach((item) => {
            this.data_log_header.push({
              APPROVAL_TYPE: item.APPROVAL_TYPE,
              CREATED_AT: item.CREATED_AT,
              EMP_NAME: item.EMP_NAME,
              APPROVAL_KE: item.APPROVAL_KE,
              DESCRIPTION: item.DESCRIPTION,
              REASON_APPROVAL: item.REASON_APPROVAL,
            })
          })
        })
        .catch((error) => {
          console.log(error.response)
        })
    },
    detail (item) {
      axios({
        method: 'post',
        url: 'http://sd6webdev.indomaret.lan:8000/get_detail_p3at/',
        data: {
          P3AT_NUMBER: item.P3AT_NUMBER,
        },
        headers: {
          Authorization: 'Bearer ' + this.$session.get('token'),
        },
      })
        .then((response) => {
          this.data_detail_inq_p3at = []
          this.data = response.data
          this.data.forEach((item) => {
            this.data_detail_inq_p3at.push({
              ASSET_NUMBER: item.ASSET_NUMBER,
              ASSET_NAME: item.ASSET_NAME,
              ASSET_LOCATION: item.ASSET_LOCATION,
              ASSET_PRICE: item.ASSET_PRICE,
              QTY_ASSET: item.QTY_ASSET,
              BOOKS_PRICE: item.BOOKS_PRICE,
              COST_OF_REMOVAL: item.COST_OF_REMOVAL,
              STATUS: item.STATUS,
              EFFECTIVE_DATE:item.EFFECTIVE_DATE,
              PEMAKAI:item.PEMAKAI
            })
          })
          this.loadLogHistory(item.P3AT_NUMBER)
          this.dialog2 = true
          this.p3at_number = item.P3AT_NUMBER
          this.p3at_date = item.P3AT_DATE
          this.status = item.STATUS
          this.total_qty = item.TOTAL_QTY
          this.total_asset_price = item.TOTAL_ASSET_PRICE
          this.total_cost_removal = item.TOTAL_COST_REMOVAL
          this.need_approve = item.NEED_APPROVE
        })
        .catch((error) => {
          console.log(error.response)
        })
    },
    formatDate (value) {
      return moment(value).format('DD-MM-YYYY')
    },
    formatPrice (value) {
      const val = (value / 1).toFixed(2).replace('.', ',')
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
    },
  },
}
</script>
