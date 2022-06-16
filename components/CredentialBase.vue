<template>
  <div class="column justify-evenly">
    <div
      :class="dense ? 'q-py-none' : 'q-py-xs'"
      class="cb-content col row justify-between items-center">
      <q-item class="text-body1">
        <q-item-section>
          <q-item-label
            class="text-left text-subtitle1"
            lines="2">
            {{credentialName}}
          </q-item-label>
          <q-item-label
            lines="2"
            class="text-left text-body2 text-grey-7">
            {{credential.description || 'No description available.'}}
          </q-item-label>
        </q-item-section>
      </q-item>
      <slot name="image">
        <credential-card-image
          :src="credentialImage"
          :size="dense ? 'sm' : 'md'" />
      </slot>
    </div>
    <q-separator
      v-if="(clickable || expandable) && separator"
      class="cb-separator" />
    <div
      :class="dense ? 'q-py-none' : 'q-py-xs'"
      class="col">
      <div
        v-if="clickable"
        class="cb-clickable cursor-pointer
        row items-center justify-center text-grey-7"
        @click="emit('clicked')">
        <span class="cb-details-text q-mr-sm">{{detailsText}}</span>
        <q-icon :name="detailsIcon" />
      </div>
      <div
        v-else-if="expandable"
        class="cb-expandable row justify-start text-grey-7 full-width">
        <q-expansion-item
          :label="detailsText"
          class="full-width"
          dense
          dense-toggle
          switch-toggle-side>
          <slot name="expansion" />
        </q-expansion-item>
      </div>
    </div>
  </div>
</template>

<script setup>
/*!
 * Copyright (c) 2018-2022 Digital Bazaar, Inc. All rights reserved.
 */
import CredentialCardImage from './CredentialCardImage.vue';
import {defineEmits, defineProps, toRef} from 'vue';
import {useCredentialCommon} from './credentialCommon.js';

const emit = defineEmits(['clicked']);
const props = defineProps({
  credential: {
    type: Boolean,
    default: false
  },
  dense: {
    type: Boolean,
    default: false
  },
  separator: {
    type: Boolean,
    default: true
  },
  clickable: {
    type: Boolean,
    default: false
  },
  expandable: {
    type: Boolean,
    default: false
  },
  detailsText: {
    type: String,
    default: 'Show Details'
  },
  detailsIcon: {
    type: String,
    default: 'far fa-window-restore'
  }
});

const {credentialName} = useCredentialCommon({
  credential: toRef(props, 'credential')
});

</script>

<style lang="scss" scoped>
.cb-expandable :deep(.q-item__section--avatar) {
  min-width: unset;
}
</style>
