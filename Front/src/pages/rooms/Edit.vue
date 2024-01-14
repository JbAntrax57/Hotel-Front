<template>
    <q-page>
        <BreadCrumbIndexComponent :labelIndex="'Habitaciones'" :toIndex="'/rooms'" :labelTitle="labelTitle"
            :actionsBreadCrumbsItems="actionsBreadCrumbsItems" @updateData="updateData" />
        <div :class="$q.dark.isActive ? 'theme-dark background-gray' : 'background-gray'"
            :style="$q.dark.isActive ? 'padding: 0%;' : ''">
            <div :class="$q.dark.isActive ? 'theme-dark background-white' : 'background-white'">
                <div class="row q-pa-md q-col-gutter-xs">
                    <div class="col-xs-12 col-sm-6">
                        <q-input filled v-model="form.fields.name" label="Nombre" :rules="nameRules"
                            :error="v$.form.fields.name.$error" @blur="form.fields.name = form.fields.name.toUpperCase()">
                            <template v-slot:prepend>
                                <q-icon name="draw" />
                            </template>
                        </q-input>
                    </div>
                    <div class="col-xs-12 col-sm-6">
                        <SelectComponent v-model="form.fields.type_id" clearable label="Tipo"
                            icon="category" :options="typesOptions" :rules="typesOptionsRules" :error="v$.form.fields.type_id.$error" />
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
import { required, alphaNum, maxLength } from '@vuelidate/validators';
import { useVuelidate } from '@vuelidate/core';
import SelectComponent from "../../components/form/SelectComponent.vue";
export default defineComponent({
    name: 'EditRoom',
    components: {
        SelectComponent,
        BreadCrumbIndexComponent
    },
    validations: {
        form: {
            fields: {
                name: {
                    required, maxLength: maxLength(255),
                },
                type_id: {
                    required
                },
            },
        }
    },
    setup: () => ({ v$: useVuelidate() }),
    data: () => ({
        typesOptions: [],
        form: {
            fields: {
                name: null,
                type_id: null
            }
        },
        labelTitle: 'Tipos: ',
        actionsBreadCrumbsItems: [
            { type: 'button', style: 'color: white', icon: 'save', label: 'Guardar', emit: 'updateData', dateEmit: true }
        ]
    }),
    computed: {
        nameRules() {
            return [
                () => !this.v$.form.fields.name.required.$invalid || 'El campo es requerido.',
                () => !this.v$.form.fields.name.maxLength.$invalid || 'El campo debe tener máximo 255 caracteres.'

            ]
        },
        typesOptionsRules() {
            return [
                () =>
                    !this.v$.form.fields.type_id.required.$invalid ||
                    "El campo es requerido."
            ];
        }
    },
    created() {
        this.fetchFromServer()
        this.getTypes()
    },
    methods: {
        async fetchFromServer() {
            this.$loading()
            const params = {}
            params.conditions = [[
                'room_id', '=', this.$route.params.id
            ]]
            const { data: { data } } = await api.get('rooms', { params })
            if (!!data.length) {
                this.form.fields.name = data[0].name_room
                this.form.fields.type_id = data[0].type_id
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
                const { data } = await api.post(`rooms/${this.$route.params.id}`, params)
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
        }
    }
});
</script>
  
<style></style>