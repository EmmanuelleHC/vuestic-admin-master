<template>
  <div class="master-branch">
    <va-card>
      <div class="justify center">
        <data-table-branch :listBranch="listBranch" class="mb-4" />
       
      </div>
       
    </va-card>
  </div>
</template>

<script>
import axios from 'axios'
import 'sweetalert2/src/sweetalert2.scss'
import DataTableBranch from '../../components/admin/master/DataTableBranch.vue'

export default {
  name: 'master-branch',
  components: {
    DataTableBranch,
   
  },
  data () {
    return {
      listBranch: [],


      
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
