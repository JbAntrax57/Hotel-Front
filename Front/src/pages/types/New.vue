<template>
    <q-page>
        <BreadCrumbIndexComponent :labelIndex="'Tipos'" :toIndex="'/types'" :labelTitle="'Nuevo Tipo'"
            :actionsBreadCrumbsItems="actionsBreadCrumbsItems" @saveData="saveData" />
        <div :class="$q.dark.isActive ? 'theme-dark background-gray' : 'background-gray'
            " :style="$q.dark.isActive ? 'padding: 0%;' : ''">
            <div :class="$q.dark.isActive ? 'theme-dark background-white' : 'background-white'
                ">
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
import { api } from "boot/axios";
import { defineComponent } from "vue";
import BreadCrumbIndexComponent from "../../components/breadcrumb/BreadCrumbIndexComponent.vue";
import { required, alphaNum, maxLength } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
export default defineComponent({
    name: "NewTypes",
    validations: {
        form: {
            fields: {
                name: { required, maxLength: maxLength(255) }
            },
        },
    },
    setup: () => ({ v$: useVuelidate() }),
    components: {
        BreadCrumbIndexComponent,
    },
    data: () => ({
        form: {
            fields: {
                name: null,
            },
        },
        actionsBreadCrumbsItems: [
            {
                type: "button",
                style: "color: white",
                icon: "save",
                label: "Guardar",
                emit: "saveData",
                dateEmit: true,
            },
        ]
    }),
    computed: {
        nameRules() {
            return [
                () =>
                    !this.v$.form.fields.name.required.$invalid ||
                    "El campo es requerido.",
                () =>
                    !this.v$.form.fields.name.maxLength.$invalid ||
                    "El campo debe tener máximo 255 caracteres.",
            ];
        },
    },
    methods: {
        async saveData(val) {
            try {
                this.v$.form.fields.$reset();
                this.v$.form.fields.$touch();
                if (this.v$.form.fields.$error) {
                    this.$notify(this.$messageValidate);
                    return false;
                }
                this.$loading('Ingresando tipo');
                const params = { ...this.form.fields };
                const { data } = await api.post("types", params);
                this.$notify(data.message);
                this.clearFields();
            } catch (error) {
                console.error("Error al guardar el registro:", error);
            }
            this.$q.loading.hide();
        },
        clearFields() {
            this.form.fields.name = null;
        },
    },
});
</script>

<style></style>
