<template>
  <q-page>
    <BreadCrumbIndexComponent :labelIndex="'Usuarios'" :toIndex="'/users'" :labelTitle="labelTitle"
      :actionsBreadCrumbsItems="actionsBreadCrumbsItems" @updateData="updateData" />
    <div :class="$q.dark.isActive ? 'theme-dark background-gray' : 'background-gray'" :style="$q.dark.isActive ? 'padding: 0%;' : ''">
      <div :class="$q.dark.isActive ? 'theme-dark background-white' : 'background-white'">
        <div class="row q-pa-md q-col-gutter-xs">
          <div class="col-xs-12 col-sm-4">
            <q-input filled v-model="user.name" label="Nombre" :dense="false"
            @blur="user.name = user.name.toUpperCase()" >
              <template v-slot:prepend>
                <q-icon name="badge" />
              </template>
            </q-input>
          </div>
          <div class="col-xs-12 col-sm-4">
            <q-input filled v-model="user.email" label="Email" :dense="false" >
              <template v-slot:prepend>
                <q-icon name="mail" />
              </template>
            </q-input>
          </div>
          <div class="col-xs-12 col-sm-4">
            <q-input filled v-model="user.password" label="Contraseña" :type="isPwd ? 'password' : 'text'">
              <template v-slot:prepend>
                <q-icon name="password" />
              </template>
              <template v-slot:append>
                <q-icon :name="isPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer" @click="isPwd = !isPwd" />
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
import { api } from 'boot/axios'
export default {
  name: 'EditUser',
  components: {
    BreadCrumbIndexComponent
  },
  data() {
    return {
      user: {
        name: null,
        email: null,
        password: null
      },
      isPwd: true,
      labelTitle: 'Editar',
      actionsBreadCrumbsItems: [
        { type: 'button', style: 'color: white', icon: 'save', label: 'Guardar', emit: 'updateData', dateEmit: true }
      ]
    }
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
      const { data: { data } } = await api.get('users', { params })
      if (!!data.length) {
        this.user.name = data[0].name
        this.user.email = data[0].email
        this.user.password = data[0].password
        this.labelTitle = data[0].name
      }
      this.$q.loading.hide()
    },
    async updateData(val) {
      this.$loading('Actualizando...')
      const params = { ...this.user }
      const { data: { message } } = await api.post(`users/${this.$route.params.id}`, params)
      this.$notify(message)
      this.fetchFromServer()
      this.$q.loading.hide()
    }
  }
}
</script>
  
<style></style>