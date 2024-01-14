<template>
    <!-- :rules="rules" -->
    <!-- :error="error" -->
    <q-select
      class="field_color"
      emit-value
      :dense="isDense"
      fill-input
      filled
      hide-selected
      :label="label"
      map-options
      :options="filteredOptions"
      :model-value="selectedOption"
      use-input
      @filter="filterOptions"
      @update:model-value="val => emit('update:modelValue', val)"
    >
      <template v-slot:prepend>
          <q-icon :name="icon" />
      </template>
    </q-select>
  </template>
  
  <script setup>
  // import { ref, watch, computed } from 'vue'
  import { ref, watch } from 'vue'
  
  const props = defineProps({
    modelValue: {
      type: [Number, String],
      default: null
    },
    label: {
      type: String,
      default: ''
    },
    options: {
      type: Array,
      required: true
    },
    icon: {
      type: String,
      default: ''
    },
    isDense: {
      type: Boolean
    }
    // error: {
    //   type: Boolean,
    //   default: false
    // }
  })
  
  const emit = defineEmits(['update:modelValue'])
  
  let selectedOption = ref(props.modelValue)
  let label = ref(props.label)
  let options = ref(props.options)
  let icon = ref(props.icon)
  let isDense = ref(props.isDense)
  // let error = ref(props.error)
  
  let filteredOptions = ref([... options.value ])
  
  watch(() => props.modelValue, (value) => {
    selectedOption.value = value
  })
  
  watch(() => props.options, (value) => {
    options.value = value
    filteredOptions.value = value
  })
  
  // watch(() => props.error, (value) => {
  //   error.value = value
  // })
  
  // const rules = computed(() => {
  //   if (props.error) {
  //     return [
  //       () => (!props.error) || 'El campo es requerido.'
  //     ]
  //   }
  //   return false
  // })
  
  const filterOptions = (val, update) => {
    update(() => {
      const needle = val.toLowerCase()
      filteredOptions.value = options.value.filter(v => v.label.toLowerCase().indexOf(needle) > -1)
    })
  }
  
  </script>