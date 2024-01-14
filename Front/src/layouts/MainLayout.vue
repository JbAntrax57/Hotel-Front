<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          Hotel Jardin de Jaluco
        </q-toolbar-title>
        <div class="q-my-4">
          <q-img src="/src/assets/logohotel.png" style="width: 50px; height: 45px;" />
          <q-btn-dropdown flat color="white" :label="dataUser?.name" dropdown-icon="settings">
            <q-list class="q-my-4">
              <q-item clickable v-close-popup @click="logOut">
                <q-item-section>
                  <q-item-label>Cerrar Sesión</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-btn-dropdown>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
    >
    <q-list>
        <q-item-label header>
        </q-item-label>
        <!-- UTILIZAR LA PROPIEDAD expand-icon en los  nodos de q-expansion-item para colocar un ícono-->
        <q-expansion-item expand-separator label="Reservaciones" caption="">
          <q-item to="/categories" clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="hotel_class" />
            </q-item-section>
            <q-item-section>Registrar</q-item-section>
          </q-item>
          <q-item to="/sub_categories" clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="preview" />
            </q-item-section>
            <q-item-section>Mostrar Reservaciones</q-item-section>
          </q-item>
        </q-expansion-item>
        <q-expansion-item expand-separator label="Habitaciones" caption="">
          <q-item to="/categories" clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="bedroom_child" />
            </q-item-section>
            <q-item-section>Estado Habitaciones</q-item-section>
          </q-item>
          <q-item to="/sub_categories" clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="night_shelter" />
            </q-item-section>
            <q-item-section>Precio Habitaciones</q-item-section>
          </q-item>
        </q-expansion-item>
        <q-expansion-item expand-separator label="Recepcion" caption="">
          <q-item to="/categories" clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="point_of_sale" />
            </q-item-section>
            <q-item-section>Corte de caja</q-item-section>
          </q-item>
          <q-item to="/sub_categories" clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="price_check" />
            </q-item-section>
            <q-item-section>Pagos caja</q-item-section>
          </q-item>
        </q-expansion-item>
        <q-expansion-item expand-separator label="Configuración" caption="">
          <q-item to="/users" clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="manage_accounts" />
            </q-item-section>
            <q-item-section>Usuarios</q-item-section>
          </q-item>
        </q-expansion-item>
        <!-- <EssentialLink v-for="link in essentialLinks" :key="link.title" v-bind="link" /> -->
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from 'vue'
//import EssentialLink from 'components/EssentialLink.vue'
import { api } from 'boot/axios'

const linksList = [
  {
    title: 'Docs',
    caption: 'quasar.dev',
    icon: 'school',
    link: 'https://quasar.dev'
  },
  {
    title: 'Github',
    caption: 'github.com/quasarframework',
    icon: 'code',
    link: 'https://github.com/quasarframework'
  },
  {
    title: 'Discord Chat Channel',
    caption: 'chat.quasar.dev',
    icon: 'chat',
    link: 'https://chat.quasar.dev'
  },
  {
    title: 'Forum',
    caption: 'forum.quasar.dev',
    icon: 'record_voice_over',
    link: 'https://forum.quasar.dev'
  },
  {
    title: 'Twitter',
    caption: '@quasarframework',
    icon: 'rss_feed',
    link: 'https://twitter.quasar.dev'
  },
  {
    title: 'Facebook',
    caption: '@QuasarFramework',
    icon: 'public',
    link: 'https://facebook.quasar.dev'
  },
  {
    title: 'Quasar Awesome',
    caption: 'Community Quasar projects',
    icon: 'favorite',
    link: 'https://awesome.quasar.dev'
  }
]

export default defineComponent({
  name: 'MainLayout',

  components: {
    //EssentialLink
  },

  setup () {
    const leftDrawerOpen = ref(false)

    return {
      essentialLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  }
})
</script>
