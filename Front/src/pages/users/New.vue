<template>
  <q-page>
    <BreadCrumbIndexComponent :labelIndex="'Usuarios'" :toIndex="'/users'" :labelTitle="'Nuevo usuario'"
      :actionsBreadCrumbsItems="actionsBreadCrumbsItems" @saveData="saveData" />
    <div :class="$q.dark.isActive ? 'theme-dark background-gray' : 'background-gray'"
      :style="$q.dark.isActive ? 'padding: 0%;' : ''">
      <div :class="$q.dark.isActive ? 'theme-dark background-white' : 'background-white'">
        <div class="row q-pa-md q-col-gutter-xs">
          <div class="col-xs-12 col-sm-4">
            <q-input filled v-model="user.name" label="Nombre" clearable clear-icon="close"
              :rules="nameRule" :error="v$.user.name.$error" color="white" dark bg-color="blue-8"
              @blur="user.name = user.name.toUpperCase()">
            </q-input>
          </div>
          <div class="col-xs-12 col-sm-4">
            <q-input filled v-model="user.last_name" label="Apellido Paterno" :rules="lastNameRule"
              :error="v$.user.name.$error" color="white" dark bg-color="blue-8"
              @blur="user.last_name = user.last_name.toUpperCase()">
            </q-input>
          </div>
          <div class="col-xs-12 col-sm-4">
            <q-input filled v-model="user.second_last_name" label="Apellido Materno"
              :rules="secondLastNameRule" :error="v$.user.second_last_name.$error" color="white" dark bg-color="blue-8"
              @blur="user.second_last_name = user.second_last_name.toUpperCase()">
            </q-input>
          </div>
          <div class="col-xs-12 col-sm-4">
            <q-input filled v-model="user.address" label="Domicilio" :rules="addressRule"
              :error="v$.user.address.$error" color="white" dark bg-color="blue-8"
              @blur="user.address = user.address.toUpperCase()">
            </q-input>
          </div>
          <div class="col-xs-12 col-sm-4">
            <q-input filled v-model="user.phone" label="Número de telefono" :rules="phoneRules" color="white" dark bg-color="blue-8"
              :error="v$.user.phone.$error">
            </q-input>
          </div>
          <div class="col-xs-12 col-sm-4">
            <q-input filled :rules="emailRegisterRules" :error="v$.user.email.$error" color="white" dark bg-color="blue"
              v-model="user.email" clearable clear-icon="close" label="Correo" />
          </div>
          <div class="col-xs-12 col-sm-4">
            <q-input filled :rules="passwordRegisterRules" :error="v$.user.password.$error" color="white" dark bg-color="blue"
              v-model="user.password" :type="isPwd ? 'password' : 'text'" label="Contraseña">
              <template v-slot:append>
                <q-icon :name="isPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer" @click="isPwd = !isPwd" />
              </template>
            </q-input>
          </div>
          <div class="col-xs-12 col-sm-4">
            <SelectComponent v-model="user.turn" clearable label="Turno" icon="style" :options="[
              { label: 'MATUTINO', value: 'M' },
              { label: 'VESPERTINO', value: 'V' }
            ]" :rules="turnRules" />
          </div>
          <div class="col-xs-12 col-sm-4">
            <SelectComponent v-model="user.role" clearable label="Rol" icon="manage_accounts" :options="[
              { label: 'GERENTE', value: 'G' },
              { label: 'EMPLEADO', value: 'E' }
            ]" :rules="roleRules" />
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { api } from 'boot/axios'
import BreadCrumbIndexComponent from "../../components/breadcrumb/BreadCrumbIndexComponent.vue";
import { required, email, numeric } from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'
import SelectComponent from '../../components/form/SelectComponent.vue';
export default {
  name: 'NewUser',
  validations: {
    user: {
      email: { required, email },
      password: { required },
      name: { required },
      address: { required },
      last_name: { required },
      second_last_name: { required },
      turn: { required },
      role: { required },
      phone: { required, numeric },
    },
  },
  components: {
    SelectComponent
  },
  setup: () => ({ v$: useVuelidate() }),
  components: {
    BreadCrumbIndexComponent
  },
  computed: {
    turnRules() {
      return [
          () => !this.v$.user.turn.required.$invalid || 'El campo es requerido.'
      ]
    },
    roleRules() {
      return [
          () => !this.v$.user.role.required.$invalid || 'El campo es requerido.'
      ]
    },
    nameRule() {
      return [
        () => !this.v$.user.name.required.$invalid || 'El campo es requerido.'
      ]
    },
    lastNameRule() {
      return [
        () => !this.v$.user.last_name.required.$invalid || 'El campo es requerido.'
      ]
    },
    secondLastNameRule() {
      return [
        () => !this.v$.user.second_last_name.required.$invalid || 'El campo es requerido.'
      ]
    },
    addressRule() {
      return [
        () => !this.v$.user.address.required.$invalid || 'El campo es requerido.'
      ]
    },
    phoneRules() {
      return [
        () => !this.v$.user.phone.required.$invalid || 'El campo es requerido.',
        () => !this.v$.user.phone.numeric.$invalid || 'El campo debe ser numérico.'
      ]
    },
    emailRules() {
      return [
        () => !this.v$.user.email.required.$invalid || 'El campo es requerido.',
        () => !this.v$.user.email.email.$invalid || 'El campo debe ser email.'
      ]
    },
    passwordRules() {
      return [
        () => !this.v$.user.password.required.$invalid || 'El campo es requerido.'
      ]
    },
    nameRegisterRules() {
      return [
        () => !this.v$.user.name.required.$invalid || 'El campo es requerido.'
      ]
    },
    emailRegisterRules() {
      return [
        () => !this.v$.user.email.required.$invalid || 'El campo es requerido.',
        () => !this.v$.user.email.email.$invalid || 'El campo debe ser email.'
      ]
    },
    passwordRegisterRules() {
      return [
        () => !this.v$.user.password.required.$invalid || 'El campo es requerido.'
      ]
    },
  },
  data() {
    return {
      user: {
        name: null,
        email: null,
        password: null,
        phone: null,
        turn: null,
        address: '',
        role: null,
        last_name: '',
        second_last_name: ''
      },
      isPwd: true,
      actionsBreadCrumbsItems: [
        { type: 'button', style: 'color: white', icon: 'save', label: 'Guardar', emit: 'saveData', dateEmit: true }
      ]
    }
  },
  methods: {
    async saveData(val) {
      this.$loading()
      const params = { ...this.user }
      const { data: { message } } = await api.post('users', params)
      this.$notify(message.message)
      this.clearFields()
      this.$q.loading.hide()
    },
    clearFields() {
      this.user.name = null
      this.user.email = null
      this.user.password = null
    }
  }
}
</script>

<style></style>