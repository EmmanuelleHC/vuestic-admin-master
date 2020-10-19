
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

        <template v-slot:item.EFFECTIVE_DATE="{ item }">
          {{ formatDate(item.EFFECTIVE_DATE) }}
        </template>
        <template v-slot:item.actions="{ item }">
          <v-btn color="primary" dark class="mb-2" @click="detail(item)">
            Detail
          </v-btn>
        </template>
      </v-data-table>
      <v-dialog
        v-model="dialog2"
        scrollable
        fullscreen
      >
     
        <v-card>
        <v-card-title>Detail P3AT</v-card-title>
        <v-divider></v-divider>
        <v-row justify="center">
               <v-col col-md-6>
                 <v-card>
                   <v-card-text style="height: 200px;">
<table style="float: left; margin-right: 5%;" >
     <tr><td>P3AT Number</td><td>:</td>
     <td>{{p3at_number}}</td>
     <td><br>  <br></td>
     </tr>

      <tr><td>P3AT Date</td><td>:</td>
     <td> {{ formatDate(p3at_date) }}</td>
     <td><br>  <br></td>
     </tr>
      <tr><td>Status</td><td>:</td>
     <td>{{status}}</td>
     <td><br>  <br></td>
     </tr>
   </table>

<table style="display: inline-block;" >
<tr><td><br>  <br></td>
  <td>Total Asset Qty</td><td>:</td>
     <td>{{total_qty}}</td>
     </tr>
      <tr><td><br>   <br></td>
        <td>Total of Books Price</td><td>:</td>
     <td>   {{ formatPrice(total_asset_price) }}</td>
     </tr>
      <tr><td><br>  <br></td>
        <td>Total of Cost Removal</td><td>:</td>
     <td>{{ formatPrice(total_cost_removal) }}</td>
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
        <v-toolbar dark color="primary" fixed>
        <v-toolbar-title class="white--text">List Asset</v-toolbar-title>

        
      </v-toolbar>
      <div style="height: 200px; overflow-y: scroll;">
            <v-data-table
              :headers="headers2"
              :items="data_detail_inq_p3at"
              :search="search_detail"
              sort-by="ID"
              class="elevation-1"
            >
            </v-data-table>
          </div>
            </v-col>
            </v-row >
        </v-card-text>
        
          <v-card-text style="height: 300px;">
            <v-row>
              <v-col>
                 <v-card-title>Info</v-card-title>

                <div v-if="need_approve">
                        <v-text-field
            v-model="alasan"
            hint="Input Alasan"
            label="Alasan"
          ></v-text-field>
          <v-btn
      class="ma-2"
      :loading="loadingApprove"
      :disabled="loadingApprove"
      color="success"
      @click="approve()"
    >
      Approve
    </v-btn>
    <v-btn
      class="ma-2"
      :loading="loadingReject"
      :disabled="loadingReject"
      color="error"
      @click="reject()"
    >
      Reject
    </v-btn>
           

            <!-- here put a spinner or whatever you want to indicate that a request is in progress -->
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

           

      <v-card-actions>
          <v-btn
            color="blue darken-1"
            text
            @click="dialog2 = false"
          >
            Close
          </v-btn>
          
          
        </v-card-actions>
           </v-col>
            </v-row > 

            
</v-card>

    </v-dialog>
      
        
    </v-card>
  </v-app>
</template>
<script>
import moment from "moment";
import axios from "axios";
import TimelineP3AT from "./TimelineP3AT.vue";
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';
export default {
  data: () => ({
    need_approve:false,
    search: "",
    p3at_number:"",
    alasan:"",
    loader: null,
    loadingApprove: false,
    loadingReject: false,
    p3at_date:"",
    status:"",  
    total_qty:"",
    total_asset_price:"",
    total_cost_removal:"",
    dialog2: false,
    headers2: [],
    data_log_header:[],
    data_detail_inq_p3at: [],
    search_detail: "",
    log_header:[ { text: "Approval Type", value: "APPROVAL_TYPE" },
      { text: "Tanggal", value: "CREATED_AT", formatter: "formatDate" },
      { text: "Diapprove Oleh", value: "EMP_NAME"},
      { text: "Sebagai Approval ke", value: "APPROVAL_KE", width: "1%" },
      { text: "Deskripsi", value: "DESCRIPTION" },
      { text: "Alasan", value: "REASON_APPROVAL" },
      ],
    headers: [
      { text: "P3AT Number", value: "P3AT_NUMBER" },
      { text: "P3AT Date", value: "P3AT_DATE", formatter: "formatDate" },
      { text: "Total Asset Qty", value: "TOTAL_QTY" },
      { text: "Total Asset Price", value: "TOTAL_ASSET_PRICE", align: "right" },
      {
        text: "Total of Books Price",
        value: "TOTAL_BOOKS_PRICE",
        align: "right",
      },
      {
        text: "Total of Cost Removal",
        value: "TOTAL_COST_REMOVAL",
        align: "right",
      },
      { text: "Status", value: "STATUS" },
      { text: "Effective Date", value: "EFFECTIVE_DATE" },
      { text: "Actions", value: "actions", sortable: false },
    ],
    headers2: [
      { text: "Asset Number", value: "ASSET_NUMBER" },
      { text: "Asset Price", value: "ASSET_PRICE", align: "right" },
      { text: "Asset Location", value: "ASSET_LOCATION" },
      { text: "Asset Qty", value: "QTY_ASSET" },
      {
        text: "Books Price",
        value: "BOOKS_PRICE",
        align: "right",
      },
      {
        text: "Cost Removal",
        value: "COST_REMOVAL",
        align: "right",
      },
      { text: "Status", value: "STATUS" },
    ],
  }),
  props: {
    data_list_inq_p3at: Array,
  },
  computed: {},

  created() {},
  watch:{
     loader () {
        const l = this.loader
        this[l] = !this[l]

        setTimeout(() => (this[l] = false), 3000)

        this.loader = null
      },
  },
  methods: {
    getColor(status) {
      if (status === "New") return "yellow";
      else if (status === "REJECTED") return "red";
      else return "green";
    },
    approve(){
      this.loadingApprove=true;
      axios({
        method: "post",
        url: "http://localhost:8000/approve_p3at/",
        data: {
          p3at_number: this.p3at_number,
          user_id:this.$session.get('id'),
          alasan:this.alasan
        },
        headers: {
          Authorization: "Bearer " + this.$session.get("token"),
        },
      })
        .then((response) => {
          Swal.fire({
            title: 'Success!',
            text: 'Anda berhasil melakukan approval.',
            icon: 'success',
          })
          this.loadingApprove=true;
          this.need_approve=false;

        })
        .catch((error) => {
          console.log(error.response);
        });
    },
    reject() {
      if(this.alasan!=''){
           this.loadingReject=true;
            axios({
              method: "post",
              url: "http://localhost:8000/reject_p3at/",
              data: {
                p3at_number: this.p3at_number,
                user_id:this.$session.get('id'),
                alasan:this.alasan
              },
              headers: {
                Authorization: "Bearer " + this.$session.get("token"),
              },
            })
              .then((response) => {
                Swal.fire({
                  title: 'Success!',
                  text: 'Anda berhasil melakukan reject.',
                  icon: 'success',
                })
                this.loadingReject=true;
                this.need_approve=false;

              })
              .catch((error) => {
                console.log(error.response);
              });
      }else{
           Swal.fire({
            title: 'Error!',
            text: 'Lengkapi alasan anda.',
            icon: 'error',
          });
      }
     
    },
    loadLogHistory(p3at_number){
        axios({
        method: "post",
        url: "http://localhost:8000/get_log_history/",
        data: {
          P3AT_NUMBER: p3at_number,
        },
        headers: {
          Authorization: "Bearer " + this.$session.get("token"),
        },
      })
        .then((response) => {
          this.data_log_header = [];
          this.data = response.data;
          this.data.forEach((item) => {
            this.data_log_header.push({
              APPROVAL_TYPE: item.APPROVAL_TYPE,
              CREATED_AT: item.CREATED_AT,
              EMP_NAME: item.EMP_NAME,
              APPROVAL_KE:item.APPROVAL_KE,
              DESCRIPTION: item.DESCRIPTION,
              REASON_APPROVAL: item.REASON_APPROVAL
            });
          });
          
        })
        .catch((error) => {
          console.log(error.response);
        });
    },
    detail(item) {
      axios({
        method: "post",
        url: "http://localhost:8000/get_detail_p3at/",
        data: {
          P3AT_NUMBER: item.P3AT_NUMBER,
        },
        headers: {
          Authorization: "Bearer " + this.$session.get("token"),
        },
      })
        .then((response) => {
          this.data_detail_inq_p3at = [];
          this.data = response.data;
          this.data.forEach((item) => {
            this.data_detail_inq_p3at.push({
              ASSET_NUMBER: item.ASSET_NUMBER,
              ASSET_LOCATION: item.ASSET_LOCATION,
              ASSET_PRICE: item.ASSET_PRICE,
              ASSET_QTY: item.ASSET_QTY,
              BOOKS_PRICE: item.BOOKS_PRICE,
              COST_OF_REMOVAL: item.COST_OF_REMOVAL,
              STATUS: item.STATUS,
            });
          });
          this.loadLogHistory(item.P3AT_NUMBER);
          this.dialog2 = true;
          this.p3at_number=item.P3AT_NUMBER;
          this.p3at_date=item.P3AT_DATE;
          this.status=item.STATUS;
          this.total_qty=item.TOTAL_QTY;
          this.total_asset_price=item.TOTAL_ASSET_PRICE;
          this.total_cost_removal=item.TOTAL_COST_REMOVAL;
          this.need_approve=item.NEED_APPROVE;
        })
        .catch((error) => {
          console.log(error.response);
        });
    },
    formatDate(value) {
      return moment(value).format("DD-MM-YYYY");
    },
    formatPrice(value) {
      const val = (value / 1).toFixed(2).replace(".", ",");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
  },
};
</script>
