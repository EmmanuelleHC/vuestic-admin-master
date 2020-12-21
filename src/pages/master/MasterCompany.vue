<template>
  <div class="master-company">
    <va-card>
      <div class="justify center">
        <data-table-company :listCompany="listCompany" class="mb-4" />
      </div>
    </va-card>
  </div>
</template>

<script>
import axios from 'axios'
import 'sweetalert2/src/sweetalert2.scss'
import DataTableCompany from '../../components/admin/master/DataTableCompany.vue'
export default {
  name: 'master-company',
  components: {
    DataTableCompany,
  },
  data () {
    return {
      listCompany: [],
      
    }
  },
  mounted () {
    
  },
  created: function () {},
  methods: {
  
  },
}
</script>

<style>
.row.row-inside {
  max-width: none;
}
</style>
