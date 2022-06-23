<template>
  <component
    :is="selection"
    v-bind="{...$props, ...$attrs}">
    <template v-for="(_, slot) in $slots" v-slot:[slot]="scope">
      <slot :name="slot" v-bind="scope || {}" />
    </template>
  </component>
</template>

<script setup>
import {computed, defineProps, unref} from 'vue';
import {config} from '@bedrock/web';
import CredentialBase from './CredentialBase.vue'
import CredentialDetail from './CredentialDetail.vue'

const componentDefaults = {
  list: CredentialBase,
  details: CredentialDetail
};

const props = defineProps({
  mode: {
    type: String,
    default: 'list'
  },
  credential: {
    type: Object,
    required: true
  }
});

const selection = computed(() => {
  const {credentialDisplay: {registration: componentRegistration}} = config;
  const {mode, credential} = props;
  const {type} = unref(credential);
  const registrations = componentRegistration.filter(r => r.mode === mode);
  const granularType = type[type.length - 1];
  const options = registrations.map(r => {
    if(r.acceptableTypes.includes(granularType)) {
      return `${r.prefix ?? ''}${r.component}`;
    }
  }).filter(Boolean);
  options.push(componentDefaults[mode]);
  console.log(options)
  return options[0];
});

</script>

<style lang="scss" scoped>

</style>
