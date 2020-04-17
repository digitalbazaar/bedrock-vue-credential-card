<template>
  <q-card>
    <q-card-section class="q-pl-md q-pa-sm text-center full-width">
      <div class="text-subtitle1">
        Credential Details
      </div>
      <q-space />
      <q-btn
        v-if="modal"
        v-close-popup
        flat
        round
        dense
        class="absolute-right q-ma-xs"
        style="height: 34px">
        <q-icon
          name="fas fa-times"
          size="sm" />
      </q-btn>
    </q-card-section>
    <q-separator />
    <q-card-section :class="$q.screen.lt.sm ? 'column': 'row justify-center'">
      <div class="column items-center col-sm-4 col-xs-12">
        <q-card-section class="q-pa-sm">
          <slot name="image">
            <credential-card-image
              :src="credentialImage"
              size="lg" />
          </slot>
        </q-card-section>
        <q-item-label
          v-if="issuerName">
          <q-item-section
            class="text-center text-subtitle1">
            Issuer:
          </q-item-section>
          <q-item-section
            class="text-center text-body2 text-grey-7">
            {{issuerName}}
          </q-item-section>
        </q-item-label>
        <slot name="bottom-left" />
      </div>
      <div class="q-mt-md">
        <q-separator />
      </div>
      <div class="col-sm-8 col-xs-12" :class="$q.screen.lt.sm ? 'q-mt-md': ''">
        <div class="">
          <q-item>
            <q-item-section>
              <q-item-label class="text-subtitle1 q-mb-sm">
                {{credential.name}}
              </q-item-label>
              <q-item-label
                class="text-body2 text-grey-7 q-mb-sm"
                top
                :lines="lines">
                {{credential.description}}
              </q-item-label>
              <div
                v-if="truncateDescription"
                class="self-end">
                <q-btn
                  flat
                  no-caps
                  size="sm"
                  :label="buttonLabel"
                  @click="viewMore = !viewMore" />
              </div>
            </q-item-section>
          </q-item>
        </div>
      </div>
      <div class="q-mt-md">
        <q-separator />
      </div>
    </q-card-section>
    <div
      v-if="$q.screen.gt.xs"
      class="q-px-md">
      <q-separator />
    </div>
    <q-card-section>
      <q-card-actions>
        <q-list no-border>
          <credential-card-field
            v-for="(value, key) in fields"
            :key="key"
            :component="schema[key].component"
            :name="schema[key].name"
            :icon="schema[key].icon"
            :sublabels="schema[key].sublabels"
            :value="value"
            :visible="showFieldValues"
            :visibility-toggle="visibilityToggle" />
        </q-list>
      </q-card-actions>
    </q-card-section>
  </q-card>
</template>
<script>
/*!
 * Copyright (c) 2019 Digital Bazaar, Inc. All rights reserved.
 */
'use strict';

import CredentialCardField from './CredentialCardField.vue';
import CredentialCardImage from './CredentialCardImage.vue';
import {credentialMixin} from './credentialMixin.js';

export default {
  name: 'CredentialCardDetail',
  components: {CredentialCardField, CredentialCardImage},
  mixins: [credentialMixin],
  props: {
    modal: {
      type: Boolean,
      required: false
    }
  },
  data() {
    return {
      viewMore: true
    };
  },
  computed: {
    lines() {
      return this.viewMore && this.truncateDescription ? 6 : 0;
    },
    buttonLabel() {
      return this.viewMore ? 'View More' : 'View Less';
    }
  }
};

</script>
<style lang="scss" scoped>

</style>
