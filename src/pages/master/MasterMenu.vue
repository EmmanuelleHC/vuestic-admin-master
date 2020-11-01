<template>
  <div class="master-menu">
    <va-card>
      <div class="justify center">
        <data-table-menu :listMenu="listMenu" class="mb-4" />
      </div>
    </va-card>
  </div>
</template>

<script>
import DataTableMenu from "../../components/admin/master/DataTableMenu.vue";
export default {
  name: "master-menu",
  components: {
    DataTableMenu
  },
  data() {
    return {
      listMenu: []
    };
  },
  mounted() {},
  created: function() {},
  methods: {}
};
</script>

<style>
.row.row-inside {
  max-width: none;
}
</style>
