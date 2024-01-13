<template>
  <div id="q-app">
    <q-layout view="lHh Lpr lFf">
      <q-page-container class="full-width">
        <q-page class="flex flex-center bg-grey-2">
          <q-card class="q-pa-md shadow-0 my_card" bordered> <!-- cambiar a shadow-2 para sombreado por defecto -->
            <q-card-section class="text-center">
              <q-icon name="favorite" size="5em" color="primary" class="heartbeat" />
              <div class="text-grey-8">Accede con tu cuenta</div>
            </q-card-section>
            <q-card-section>
              <q-input dense outlined v-model="form.fields.email" :rules="emailRules" :error="v$.form.fields.email.$error"
                clearable clear-icon="close" label="Correo" v-on:keyup.enter="login()" />
              <q-input dense outlined class="q-mt-md" v-model="form.fields.password" :rules="passwordRules"
                :error="v$.form.fields.password.$error" :type="isPwd ? 'password' : 'text'" label="Contraseña"
                v-on:keyup.enter="login()">
                <template v-slot:append>
                  <q-icon :name="isPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer"
                    @click="isPwd = !isPwd" />
                </template>
              </q-input>
            </q-card-section>
            <q-card-section>
              <q-btn :loading="loadingBtn" style="border-radius: 8px;" color="primary" rounded size="md" label="Ingresar"
                no-caps class="full-width" @click="login">
                <template v-slot:loading>
                  <q-spinner-hourglass class="on-left" />
                  Espere...
                </template>
              </q-btn>
            </q-card-section>

            <q-card-section class="text-center q-pt-none q-pb-xs">
              <div class="text-grey-8">¿No tienes una cuenta?
                <q-btn :loading="loadingBtn" v-morph:btn:mygroup:300.resize="morphGroupModel" class="q-ml-xl"
                  color="primary" size="md" icon="person_add" @click="nextMorph" round>
                  <q-tooltip class="bg-primary text-body2 shadow-5" :offset="[10, 10]">
                    Registrar
                  </q-tooltip>
                  <template v-slot:loading>
                    <q-spinner-hourglass class="on-center" />
                  </template>
                </q-btn>
              </div>
            </q-card-section>
            <q-card-section class="text-center q-pt-none q-pb-none" style="margin-bottom: -4%;">
              <q-btn-toggle v-model="themeToggled" no-caps rounded unelevated
                :toggle-color="themeToggled ? 'warning' : 'dark'" color="white"
                :text-color="themeToggled ? 'dark' : 'warning'" @click="toggleTheme" :options="[
                  { icon: 'light_mode', value: true },
                  { icon: 'mode_night', value: false }
                ]" />
            </q-card-section>
            <q-card v-morph:card1:mygroup:500.resize="morphGroupModel"
              class="absolute-bottom-left bg-white text-white text-center" :class="{ 'isMobile': this.$isMobile() }"
              :style="!this.$isMobile() ? 'width: 40rem; left: -32% !important;' : ''">
              <div :class="$q.dark.isActive ? 'theme-dark background-gray' : 'background-gray'" style="padding: 0%;">
                <div :class="$q.dark.isActive ? 'theme-dark background-white' : 'background-white'">
                  <q-card-section :class="{ 'q-pb-none': this.$isMobile() }">
                    <q-btn class="q-mt-md" style="float: left;" color="primary" size="md" icon="arrow_back"
                      @click="reload" round>
                      <q-tooltip class="bg-primary text-body2 shadow-5" :offset="[10, 10]">
                        Regresar
                      </q-tooltip>
                      <template v-slot:loading>
                        <q-spinner-hourglass class="on-center" />
                      </template>
                    </q-btn>
                    <q-icon name="favorite" size="5em" color="primary" class="heartbeat" style="padding-right: 7%;" />
                    <div class="text-grey-8">Registrar cuenta</div>
                  </q-card-section>

                  <q-card-section :class="{ 'q-pb-none': this.$isMobile() }">
                    <div class="row q-pa-md q-col-gutter-xs">
                      <div class="col-xs-12 col-sm-3">
                        <q-input dense outlined v-model="account.code" label="Código" :rules="accountCodeRule"
                          :error="v$.account.code.$error" @blur="account.code = account.code.toUpperCase()">
                        </q-input>
                      </div>
                      <div class="col-xs-12 col-sm-5">
                        <q-input dense outlined v-model="account.name" label="Nombre de la cuenta" clearable
                          clear-icon="close" :rules="accountNameRule" :error="v$.account.code.$error"
                          @blur="account.name = account.name.toUpperCase()">
                        </q-input>
                      </div>
                      <div class="col-xs-12 col-sm-4">
                        <q-input dense outlined v-model="account.business_name" label="Razón social"
                          :rules="accountBussinesNameRule" :error="v$.account.business_name.$error"
                          @blur="account.business_name = account.business_name.toUpperCase()">
                        </q-input>
                      </div>
                      <div class="col-xs-12 col-sm-4">
                        <q-input dense outlined v-model="account.rfc" label="RFC" :rules="accountRFCRule"
                          :error="v$.account.rfc.$error" @blur="account.rfc = account.rfc.toUpperCase()">
                        </q-input>
                      </div>
                      <div class="col-xs-12 col-sm-4">
                        <q-input dense outlined v-model="account.address" label="Domicilio" :rules="accountAddressRule"
                          :error="v$.account.address.$error" @blur="account.address = account.address.toUpperCase()">
                        </q-input>
                      </div>
                      <div class="col-xs-12 col-sm-4">
                        <q-input dense outlined v-model="account.zip_code" label="Código postal"
                          :rules="accountZipCodeRule" :error="v$.account.zip_code.$error">
                        </q-input>
                      </div>
                      <div class="col-xs-12 col-sm-4">
                        <q-input dense outlined v-model="form.fieldsRegister.name" :rules="nameRegisterRules"
                          :error="v$.form.fieldsRegister.name.$error" clearable clear-icon="close"
                          label="Nombre de usuario" />
                      </div>
                      <div class="col-xs-12 col-sm-4">
                        <q-input dense outlined :rules="emailRegisterRules" :error="v$.form.fieldsRegister.email.$error"
                          v-model="form.fieldsRegister.email" clearable clear-icon="close" label="Correo" />
                      </div>
                      <div class="col-xs-12 col-sm-4">
                        <q-input dense outlined :rules="passwordRegisterRules"
                          :error="v$.form.fieldsRegister.password.$error" v-model="form.fieldsRegister.password"
                          :type="isPwd ? 'password' : 'text'" label="Contraseña">
                          <template v-slot:append>
                            <q-icon :name="isPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer"
                              @click="isPwd = !isPwd" />
                          </template>
                        </q-input>
                      </div>
                    </div>
                  </q-card-section>
                  <q-page-sticky v-if="this.$isMobile()" position="bottom-right" :offset="fabPos" :disable="draggingFab"
                    v-touch-pan.prevent.mouse="moveFab">
                    <q-btn fab icon="person_add" color="primary" @click="verifyEmail">
                    </q-btn>
                  </q-page-sticky>

                  <q-card-section v-if="!this.$isMobile()">
                    <q-btn :loading="loadingBtn" style="border-radius: 8px;" color="primary" rounded size="md"
                      label="Registrar" no-caps class="full-width" @click="verifyEmail">
                      <template v-slot:loading>
                        <q-spinner-hourglass class="on-left" />
                        Espere...
                      </template>
                    </q-btn>
                  </q-card-section>
                </div>
              </div>
            </q-card>
          </q-card>
        </q-page>
      </q-page-container>
    </q-layout>
  </div>
</template>

<script>
import { api } from 'boot/axios'
import { required, email, numeric } from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'
import { useStore } from 'vuex'

export default {
  name: 'LoginComponent',
  validations: {
    form: {
      fields: {
        email: { required, email },
        password: { required }
      },
      fieldsRegister: {
        name: { required },
        email: { required, email },
        password: { required }
      }
    },
    account: {
      code: { required },
      name: { required },
      business_name: { required },
      rfc: { required },
      address: { required },
      zip_code: { required, numeric }
    }
  },
  created() {
    // this.toggleTheme()
  },
  setup: () => ({ v$: useVuelidate() }),
  data() {
    return {
      draggingFab: false,
      fabPos: [18, 18],
      // themeToggled: this.$store.getters['theme/getTheme'] === 'true',
      account: {
        code: null,
        name: null,
        business_name: null,
        rfc: null,
        address: null,
        zip_code: null
      },
      isPwd: true,
      form: {
        fields: {
          email: '',
          password: ''
        },
        fieldsRegister: {
          name: '',
          email: '',
          password: '',
          token_verification: '',
          urlServer: window.location.origin,
          encryptData: ''
        }
      },
      nextMorphStep: {
        btn: 'card1',
        card1: 'btn',
        btn2: 'btn'
        //card1: 'card2',
        //card2: 'btn'
      },
      morphGroupModel: 'btn',
      notifyActions: [
        { label: 'Cerrar', color: 'white', handler: () => { /* console.log('wooow') */ } }
      ],
      loadingBtn: false
    }
  },
  computed: {
    accountZipCodeRule() {
      return [
        () => !this.v$.account.zip_code.required.$invalid || 'El campo es requerido.',
        () => !this.v$.account.zip_code.numeric.$invalid || 'El campo debe ser numérico.'
      ]
    },
    accountAddressRule() {
      return [
        () => !this.v$.account.address.required.$invalid || 'El campo es requerido.'
      ]
    },
    accountRFCRule() {
      return [
        () => !this.v$.account.rfc.required.$invalid || 'El campo es requerido.'
      ]
    },
    accountBussinesNameRule() {
      return [
        () => !this.v$.account.business_name.required.$invalid || 'El campo es requerido.'
      ]
    },
    accountNameRule() {
      return [
        () => !this.v$.account.name.required.$invalid || 'El campo es requerido.'
      ]
    },
    accountCodeRule() {
      return [
        () => !this.v$.account.code.required.$invalid || 'El campo es requerido.'
      ]
    },
    emailRules() {
      return [
        () => !this.v$.form.fields.email.required.$invalid || 'El campo es requerido.',
        () => !this.v$.form.fields.email.email.$invalid || 'El campo debe ser email.'
      ]
    },
    passwordRules() {
      return [
        () => !this.v$.form.fields.password.required.$invalid || 'El campo es requerido.'
      ]
    },
    nameRegisterRules() {
      return [
        () => !this.v$.form.fieldsRegister.name.required.$invalid || 'El campo es requerido.'
      ]
    },
    emailRegisterRules() {
      return [
        () => !this.v$.form.fieldsRegister.email.required.$invalid || 'El campo es requerido.',
        () => !this.v$.form.fieldsRegister.email.email.$invalid || 'El campo debe ser email.'
      ]
    },
    passwordRegisterRules() {
      return [
        () => !this.v$.form.fieldsRegister.password.required.$invalid || 'El campo es requerido.'
      ]
    },
  },
  methods: {
    moveFab(ev) {
      this.draggingFab = ev.isFirst !== true && ev.isFinal !== true
      this.fabPos = [
        this.fabPos[0] - ev.delta.x,
        this.fabPos[1] - ev.delta.y,
      ];
    },
    reload() {
      location.reload()
    },
    async login() {
      try {
        this.v$.form.fields.$reset()
        this.v$.form.fields.$touch()
        if (this.v$.form.fields.$error) {
          this.$notify(this.$messageValidate);
          return false
        }
        this.loadingBtn = true
        await api.get('sanctum/csrf-cookie').then(async data => {
          if (data.status === 204) {
            const cretentials = { ...this.form.fields }
            const { data } = await api.post('logIn', cretentials);
            this.$notify(data.message)
            if (data.result) {
              const token = data.token
              if (token) {
                localStorage.setItem('USER', JSON.stringify(data.dataUser))
                localStorage.setItem('authToken', token)
                this.$store.dispatch('login/setUserDataAction', JSON.stringify(data.dataUser))
                this.$store.dispatch('login/setJWAction', token)
                this.$router.push('/')
              }
            } else {
              this.$router.push('/login')
            }
          } else {
            console.log('no funcionó')
          }
        });


      } catch (error) {
        console.error('Error de inicio de sesión:', error);
      }
      this.loadingBtn = false
    },
    nextMorph() {
      this.morphGroupModel = this.nextMorphStep[this.morphGroupModel]
    },
    async verifyEmail() {
      this.v$.form.fieldsRegister.$reset()
      this.v$.form.fieldsRegister.$touch()
      this.v$.account.$reset()
      this.v$.account.$touch()
      if (this.v$.form.fieldsRegister.$error && this.v$.account.$error) {
        this.$notify(this.$messageValidate)
        return false
      }
      this.loadingBtn = true
      this.form.fieldsRegister.encryptData = this.encryptData()
      try {
        const params = { ...this.form.fieldsRegister }
        const { data } = await api.post('verifyEmail', params)
        if (data.result)
          this.form.fieldsRegister.name = ''
        this.form.fieldsRegister.email = ''
        this.form.fieldsRegister.password = ''
        this.$notify(data.message)
      } catch (error) {
      }
      this.loadingBtn = false
      this.nextMorph()
    },
    encryptData() {
      const toEncryptData = {}
      toEncryptData.user = this.form.fieldsRegister
      toEncryptData.account = this.account
      const jsonData = JSON.stringify(toEncryptData);
      const cipher = CryptoJS.AES.encrypt(jsonData, CryptoJS.enc.Utf8.parse('82f2ceed4c503896c8a291e560bd4325'), {
        iv: CryptoJS.enc.Utf8.parse('sinasinasisinaaa'),
        mode: CryptoJS.mode.CBC
      })

      return cipher.toString()
    },
    toggleTheme() {
      if (!this.themeToggled) {
        this.$q.dark.set('auto'); // Cambia al tema automático
      } else {
        const newTheme = this.$q.dark.isActive ? 'light' : 'dark';
        this.$q.dark.set(newTheme);
      }
      //localStorage.removeItem('theme');
      localStorage.setItem('theme', this.themeToggled)
      this.$store.dispatch('theme/setThemeDataAction', this.themeToggled)
      // UTILZAR ESTO SOLAMENTE EN BOTÓN NORMAL
      // this.themeToggled = !this.themeToggled; // Cambia el estado del botón
    },
  }
};
</script>
<style>
.customWidth {
  width: 60%;
}

@keyframes heartbeat {
  0% {
    transform: scale(1);
  }

  25% {
    transform: scale(1.1);
  }

  50% {
    transform: scale(1);
  }

  75% {
    transform: scale(1.1);
  }

  100% {
    transform: scale(1);
  }
}

.heartbeat {
  animation: heartbeat 5s infinite;
}


.my-custom-toggle {
  background-color: #FFFF00;
  /* Light theme background color */
}

.my-custom-toggle-active {
  background-color: #000000;
  /* Dark theme background color */
}
</style>