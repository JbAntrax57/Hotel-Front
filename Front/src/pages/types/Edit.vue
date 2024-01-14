<template>
    <q-page>
        <BreadCrumbIndexComponent :labelIndex="'Tipos'" :toIndex="'/types'" :labelTitle="labelTitle"
            :actionsBreadCrumbsItems="actionsBreadCrumbsItems" @updateData="updateData" />
        <div :class="$q.dark.isActive ? 'theme-dark background-gray' : 'background-gray'"
            :style="$q.dark.isActive ? 'padding: 0%;' : ''">
            <div :class="$q.dark.isActive ? 'theme-dark background-white' : 'background-white'">
                <div class="row q-pa-md q-col-gutter-xs">
                    <div class="col-xs-12 col-sm-12">
                        <q-input filled v-model="form.fields.name" label="Nombre" :rules="nameRules"
                            :error="v$.form.fields.name.$error" @blur="form.fields.name = form.fields.name.toUpperCase()">
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
import { required, alphaNum, maxLength } from '@vuelidate/validators';
import { useVuelidate } from '@vuelidate/core';
export default defineComponent({
    name: 'EditNewTypes',
    components: {
        BreadCrumbIndexComponent
    },
    validations: {
        form: {
            fields: {
                name: {
                    required, maxLength: maxLength(255),
                },
            },
        }
    },
    setup: () => ({ v$: useVuelidate() }),
    data: () => ({
        form: {
            fields: {
                name: null
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
    },
    created() {
        this.fetchFromServer()
    },
    methods: {
        async fetchFromServer() {
            this.$loading()
            const params = {}
            params.conditions = [[
                'id', '=', this.$route.params.id
            ]]
            const { data: { data } } = await api.get('types', { params })
            if (!!data.length) {
                this.form.fields = { ...data[0] }
                delete this.form.fields.created_at
                delete this.form.fields.updated_at
                this.labelTitle = data[0].name
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
                const { data } = await api.post(`types/${this.$route.params.id}`, params)
                this.$notify(data.message)
                this.fetchFromServer()
            } catch (error) {
                console.error('Error al actualizar el registro:', error);
            }
            this.$q.loading.hide()
        },
    }
});
</script>
  
<style></style>