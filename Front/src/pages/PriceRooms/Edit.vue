<template>
    <q-page>
        <BreadCrumbIndexComponent :labelIndex="'Precio de habitaciones'" :toIndex="'/priceRooms'" :labelTitle="labelTitle"
            :actionsBreadCrumbsItems="actionsBreadCrumbsItems" @updateData="updateData" />
        <div :class="$q.dark.isActive ? 'theme-dark background-gray' : 'background-gray'"
            :style="$q.dark.isActive ? 'padding: 0%;' : ''">
            <div :class="$q.dark.isActive ? 'theme-dark background-white' : 'background-white'">
                <div class="row q-pa-md q-col-gutter-xs">
                    <div class="col-xs-12 col-sm-6">
                        <SelectComponent v-model="form.fields.room_id" clearable label="Habitación" icon="category"
                            :options="roomsOptions" :rules="roomsOptionsRules" :error="v$.form.fields.room_id.$error" />
                    </div>
                    <div class="col-xs-12 col-sm-6">
                        <SelectComponent v-model="form.fields.type_id" clearable label="Tipo" icon="category"
                            :options="typesOptions" :rules="typesOptionsRules" :error="v$.form.fields.type_id.$error" />
                    </div>
                    <div class="col-xs-12 col-sm-6">
                        <q-input filled v-model="form.fields.price_high" label="Precio temporada alta"
                            :rules="price_highRules" :error="v$.form.fields.price_high.$error">
                            <template v-slot:prepend>
                                <q-icon name="draw" />
                            </template>
                        </q-input>
                    </div>
                    <div class="col-xs-12 col-sm-6">
                        <q-input filled v-model="form.fields.price_low" label="Precio temporada baja"
                            :rules="price_lowRules" :error="v$.form.fields.price_low.$error">
                            <template v-slot:prepend>
                                <q-icon name="draw" />
                            </template>
                        </q-input>
                    </div>
                </div>
            </div>
        </div>
    </q-page>
</template>
  
<script>
import BreadCrumbIndexComponent from "../../components/breadcrumb/BreadCrumbIndexComponent.vue";
import { api } from 'boot/axios';
import { defineComponent } from 'vue';
import { required, alphaNum, maxLength, numeric } from '@vuelidate/validators';
import { useVuelidate } from '@vuelidate/core';
import SelectComponent from "../../components/form/SelectComponent.vue";
export default defineComponent({
    name: 'EditPriceRoom',
    components: {
        SelectComponent,
        BreadCrumbIndexComponent
    },
    validations: {
        form: {
            fields: {
                room_id: { required },
                type_id: { required },
                price_high: { required, numeric },
                price_low: { required, numeric }
            },
        }
    },
    setup: () => ({ v$: useVuelidate() }),
    data: () => ({
        typesOptions: [],
        roomsOptions: [],
        form: {
            fields: {
                room_id: null,
                type_id: null,
                price_high: null,
                price_low: null
            },
        },
        labelTitle: 'Editar precios: ',
        actionsBreadCrumbsItems: [
            { type: 'button', style: 'color: white', icon: 'save', label: 'Guardar', emit: 'updateData', dateEmit: true }
        ]
    }),
    computed: {
        roomsOptionsRules() {
            return [
                () =>
                    !this.v$.form.fields.room_id.required.$invalid ||
                    "El campo es requerido.",
            ];
        },
        typesOptionsRules() {
            return [
                () =>
                    !this.v$.form.fields.type_id.required.$invalid ||
                    "El campo es requerido.",
            ];
        },
        price_highRules() {
            return [
                () =>
                    !this.v$.form.fields.price_high.required.$invalid ||
                    "El campo es requerido.",
                () => !this.v$.form.fields.price_high.numeric.$invalid || 'El campo debe ser numérico.'
            ];
        },
        price_lowRules() {
            return [
                () =>
                    !this.v$.form.fields.price_low.required.$invalid ||
                    "El campo es requerido.",
                () => !this.v$.form.fields.price_low.numeric.$invalid || 'El campo debe ser numérico.'
            ];
        }
    },
    created() {
        this.fetchFromServer()
        this.getTypes()
        this.getRooms()
    },
    methods: {
        async fetchFromServer() {
            this.$loading()
            const params = {}
            params.conditions = [[
                'price_room_id', '=', this.$route.params.id
            ]]
            const { data: { data } } = await api.get('priceRooms', { params })
            if (!!data.length) {
                console.log(data)
                this.form.fields.room_id = data[0].room_name
                this.form.fields.type_id = data[0].type_name
                this.form.fields.price_high = data[0].price_high
                this.form.fields.price_low = data[0].price_low
                // delete this.form.fields.created_at
                // delete this.form.fields.updated_at
                this.labelTitle = data[0].name_room
            }
            this.$q.loading.hide()
        },
        async updateData(val) {
            try {
                this.v$.form.fields.$reset()
                this.v$.form.fields.$touch()
                if (this.v$.form.fields.$error) {
                    this.$notify(this.$messageValidate);
                    return false
                }
                this.$loading('Actualizando...')
                const params = { ...this.form.fields }
                const { data } = await api.post(`priceRooms/${this.$route.params.id}`, params)
                this.$notify(data.message)
                this.fetchFromServer()
            } catch (error) {
                console.error('Error al actualizar el registro:', error);
            }
            this.$q.loading.hide()
        },
        async getTypes() {
            this.$loading('Obteniendo tipos');
            const params = {};
            params.conditions = '';
            const {
                data: { data },
            } = await api.get("types/getOptions", { params });
            console.log(data)
            this.typesOptions = data;
            this.$q.loading.hide();
        },
        async getRooms() {
            this.$loading("Obteniendo tipos");
            const params = {};
            params.conditions = "";
            const {
                data: { data },
            } = await api.get("rooms/getOptions", { params });
            console.log(data);
            this.roomsOptions = data;
            this.$q.loading.hide();
        }
    }
});
</script>
  
<style></style>