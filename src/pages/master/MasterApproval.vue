<template>
  <div class="master-approval">
    <va-card>
      <div class="justify center">
        <data-table-approval :listApproval="listApproval" class="mb-4" />
      </div>
    </va-card>
  </div>
</template>

<script>
import axios from 'axios'
import 'sweetalert2/src/sweetalert2.scss'
import DataTableApproval from '../../components/admin/master/DataTableApproval.vue'
export default {
  name: 'master-approval',
  components: {
    DataTableApproval,
  },
  data () {
    return {
      listApproval: [],
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
