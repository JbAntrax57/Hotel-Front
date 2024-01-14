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
    name: "IndexRooms",
    data: () => ({
        tableProps: {
            flat: true,
            bordered: true,
            title: null,
            rows: [],
            url: 'rooms/',
            sortBy: 'name_room',
            filter: [
                'name_room',
                'name_type'
            ],
            conditions: [
            ],
            columns: [
                { name: "name_type", align: "left", label: "TIPO", field: "name_type", sortable: false },
                { name: "name_room", align: "left", label: "NOMBRE HABITACIÓN", field: "name_room", sortable: false },
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
            { type: 'button', style: 'color: white', icon: 'add', label: 'Nuevo', emit: 'toNew', dateEmit: '/rooms/new' }
        ]
    }),
    components: {
        BreadCrumbIndexComponent,
        MasterTable,
    },
    methods: {
        toNew(val) { this.$router.push(val) },
        updateRow(val) { this.$router.push(`rooms/${val.room_id}`) },
        async deleteRow(val) {
            this.tableProps.buttons[1].loading = true
            const { data } = await api.delete(`rooms/${val.room_id}`)
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