<template>
  <component
    :is="selection"
    :v-bind="$attrs" />
</template>

<script setup>
import {computed, defineProps} from 'vue';

const componentDefaults = {
  list: 'CredentialBase',
  details: 'CredentialDetail'
};

const props = defineProps({
  mode: {
    type: String,
    default: 'list'
  }
});

const selection = computed(() => {
  const {mode} = props;
  return componentDefaults[mode];
});

</script>

<style lang="scss" scoped>

</style>
