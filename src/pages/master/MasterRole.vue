<template>
  <div class="master-role">
    <va-card>
      <div class="justify center">
        <data-table-role :listRole="listRole" class="mb-4" />
      </div>
    </va-card>
  </div>
</template>

<script>
import DataTableRole from '../../components/admin/master/DataTableRole.vue'
export default {
  name: 'master-role',
  components: {
    DataTableRole,
  },
  data () {
    return {
      listRole: [],
    
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
