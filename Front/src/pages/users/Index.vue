<template>
  <q-page>
    <BreadCrumbIndexComponent :labelIndex="'Usuarios'" :actionsBreadCrumbsItems="actionsBreadCrumbsItems"
      @toNew="toNew" />
    <div :class="$q.dark.isActive ? 'theme-dark background-gray' : 'background-gray'" :style="$q.dark.isActive ? 'padding: 0%;' : ''">
      <div :class="$q.dark.isActive ? 'theme-dark background-white' : 'background-white'">
        <MasterTable :tableProps="tableProps" @updateRow="updateRow" @deleteRow="deleteRow" @reload="reloadTable = false"
          :reloadTable="reloadTable" />
      </div>
    </div>
  </q-page>
</template>

<script>
import BreadCrumbIndexComponent from "../../components/breadcrumb/BreadCrumbIndexComponent.vue";
import MasterTable from "../../components/mainContent/MasterTable.vue";
import { api } from 'boot/axios'
export default {
  name: "IndexUsers",
  data() {
    return {
      tableProps: {
        flat: true,
        bordered: true,
        title: null,
        rows: [],
        url: 'users/',
        sortBy: 'name',
        filter: [
          'name',
          'email'
        ],
        conditions: [
          /* ['name','=', 'Isaac7'],
          ['email','=', 'Isaac7@wasp.mx'] */
        ],
        columns: [
          { name: "name", align: "center", label: "NOMBRE", field: "name", sortable: true },
          { name: "email", align: "center", label: "EMAIL", field: "email", sortable: false },
          { name: "actions", align: "center", label: "ACCIONES", field: "actions", sortable: false, "sort-method": null, }
        ],
        "row-key": "name",
        selection: "single",
        "v-model:selected": null,
        buttons: [{
          key: 1,
          color: "primary",
          icon: "edit",
          flat: 'flat',
          emit: "updateRow",
          size: "10px"
        },
        {
          key: 2,
          color: "negative",
          icon: "delete",
          flat: 'flat',
          emit: "deleteRow",
          size: "10px",
          loading: false
        }
        ]
      },
      reloadTable: false,
      rows: [],
      selected: null,
      actionsBreadCrumbsItems: [
        { type: 'button', style: 'color: white', icon: 'add', label: 'Nuevo', emit: 'toNew', dateEmit: '/users/new' }
      ]
    };
  },
  created () {
    // console.log(JSON.parse(this.$store.getters['login/getUserData']))
  },
  components: {
    BreadCrumbIndexComponent,
    MasterTable,
  },
  methods: {
    toNew(val) { this.$router.push(val) },
    updateRow(val) { this.$router.push(`users/${val.id}`) },
    async deleteRow(val) {
      this.tableProps.buttons[1].loading = true
      const { data: { message } } = await api.delete(`users/${val.id}`)
      this.$notify(message)
      this.tableProps.buttons[1].loading = false
      this.reloadTable = true
    },
    uploadFile(val) {
      alert(val.name)
    },
    downloadFile(val) {
      alert(val.email)
    }
  }
};
</script>

<style></style>