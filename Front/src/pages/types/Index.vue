<template>
    <q-page>
        <BreadCrumbIndexComponent :labelIndex="'Tipos'" :actionsBreadCrumbsItems="actionsBreadCrumbsItems"
            @toNew="toNew" />
        <div :class="$q.dark.isActive ? 'theme-dark background-gray' : 'background-gray'" :style="$q.dark.isActive ? 'padding: 0%;' : ''">
            <div :class="$q.dark.isActive ? 'theme-dark background-white' : 'background-white'">
                <MasterTable :tableProps="tableProps" @updateRow="updateRow" @deleteRow="deleteRow"
                    @reload="reloadTable = false" :reloadTable="reloadTable" />
            </div>
        </div>
    </q-page>
</template>
  
<script>
import BreadCrumbIndexComponent from "../../components/breadcrumb/BreadCrumbIndexComponent.vue"
import MasterTable from "../../components/mainContent/MasterTable.vue"
import { api } from 'boot/axios'
import { defineComponent } from 'vue'
export default defineComponent({
    name: "IndexNewTypes",
    data: () => ({
        tableProps: {
            flat: true,
            bordered: true,
            title: null,
            rows: [],
            url: 'types/',
            sortBy: 'name',
            filter: [
                'name',
                'email'
            ],
            conditions: [
            ],
            columns: [
                { name: "name", align: "left", label: "NOMBRE", field: "name", sortable: false },
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
            { type: 'button', style: 'color: white', icon: 'add', label: 'Nuevo', emit: 'toNew', dateEmit: '/types/new' }
        ]
    }),
    components: {
        BreadCrumbIndexComponent,
        MasterTable,
    },
    methods: {
        toNew(val) { this.$router.push(val) },
        updateRow(val) { this.$router.push(`types/${val.id}`) },
        async deleteRow(val) {
            this.tableProps.buttons[1].loading = true
            const { data } = await api.delete(`types/${val.id}`)
            console.log(data)
            this.$notify(data.message)
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
});
</script>
  
<style></style>