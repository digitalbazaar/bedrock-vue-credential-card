<template>
  <div class="column justify-evenly">
    <div
      :class="dense ? 'q-py-none' : 'q-py-xs'"
      class="cb-content col row justify-between items-center">
      <credential-field
        class="col"
        :title="credentialName"
        title-class="text-subtitle1"
        :value="description"
        value-class="text-body2 text-grey-7" />
      <credential-card-image
        :src="credentialImage"
        :size="dense ? 'sm' : 'md'" />
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
        @click="toggleDetails">
        <span class="cb-details-text q-mr-sm">{{detailsText}}</span>
        <q-icon :name="detailsIcon" />
        <q-dialog v-model="state.details">
          <slot name="modal">
            <q-card>
              <credential-detail :credential="credential" />
            </q-card>
          </slot>
        </q-dialog>
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
          <slot name="expansion">
            <credential-detail :credential="credential" />
          </slot>
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
import CredentialField from './CredentialField.vue';
import CredentialDetail from './CredentialDetail.vue';
import {computed, defineProps, reactive, toRef, unref} from 'vue';
import {useCredentialCommon} from './credentialCommon.js';

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

const state = reactive({
  details: false
});

const {
  credentialDescription, credentialName,
  credentialImage
} = useCredentialCommon({
  credential: toRef(props, 'credential')
});

const description = computed(() => {
  const _cd = unref(credentialDescription);
  if(_cd.length === 0) {
    return 'No description available.';
  }
  return _cd;
});

function toggleDetails() {
  console.log(state.details);
  state.details = !state.details;
}

</script>

<style lang="scss" scoped>
.cb-expandable :deep(.q-item__section--avatar) {
  min-width: unset;
}
</style>
