<template>
    <div class="row">
      <div class="col-xs-6 col-sm-6">
        <div class="q-pa-md q-gutter-sm">
          <q-breadcrumbs style="font-size: 20px">
            <q-breadcrumbs-el to="/" icon="home" />
            <q-breadcrumbs-el :label="labelIndex" :to="toIndex" />
            <q-breadcrumbs-el v-if="labelTitle" :label="labelTitle" />
          </q-breadcrumbs>
        </div>
      </div>
      <div class="col-xs-6 col-sm-6 text-right">
            <div class="q-pa-md q-gutter-sm" v-for="items in actionsBreadCrumbsItems" :key="items.key">
              <q-btn
                v-if="items.type === 'button'"
                class="bg-primary"
                :style="items.style"
                :icon="items.icon"
                :label="items.label"
                @click="$emit(items.emit, items.dateEmit)"
              />
            </div>
          </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "BreadCrumb",
    props: {
      labelIndex: String,
      labelTitle: String,
      toIndex: String,
      actionsBreadCrumbsItems: Array
    }
  };
  </script>
  
  <style>
  </style>