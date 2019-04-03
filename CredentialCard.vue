<template>
  <q-card class="row br-credential-card bg-white q-ma-sm">
    <div
      class="row justify-between items-center"
      :class="{'s-card-info-top': fieldQuantity > 0}">
      <q-card-section class="s-card-info-top-text">
        <q-item class="text-body1">
          <q-item-section>
            <q-item-label
              class="text-left text-subtitle1"
              lines="2">
              {{credential.name}}
            </q-item-label>
            <q-item-label
              lines="2"
              class="s-sublabel text-left text-body2 text-grey-7">
              {{credential.description}}
            </q-item-label>
          </q-item-section>
        </q-item>
      </q-card-section>
      <q-card-section class="s-logo">
        <slot>
          <q-icon
            v-if="useDefaultImage || !credential.issuerLogo"
            :name="defaultImage" />
          <img
            v-else
            :src="credential.issuerLogo"
            @error="imageError">
        </slot>
      </q-card-section>
    </div>
    <q-card-actions class="q-py-sm q-px-none">
      <q-list no-border>
        <credential-card-field
          v-for="(value, key, index) in sliceFields(fieldQuantity)"
          :key="value"
          :sublabels="schema[key].sublabels"
          :name="schema[key].name"
          :icon="schema[key].icon"
          :value="value"
          :visible="showFieldValues"
          :visibility-toggle="visibilityToggle"
          :index="index" />
      </q-list>
    </q-card-actions>
    <div
      v-if="clickable"
      class="s-more-details row items-center justify-center text-grey-7
      q-py-xs">
      <div>Show Details</div><q-icon name="far fa-window-restore"/>
    </div>
  </q-card>
</template>
<script>
/*!
 * Copyright (c) 2019 Digital Bazaar, Inc. All rights reserved.
 */
'use strict';

import CredentialCardField from './CredentialCardField.vue';
import {credentialMixin} from './credentialMixin.js';

export default {
  name: 'CredentialCard',
  components: {CredentialCardField},
  mixins: [credentialMixin]
};

</script>
<style lang="scss" scoped>

$breakpoint-xs: 560px;

@mixin mobile {
  @media (max-width: #{$breakpoint-xs}) {
    @content;
  }
}

.q-card {
  border-radius: 6px;
  width: 320px;
  font-size: 1rem;

  @include mobile {
    margin: 8px 0;
  }

  .s-card-info-top {
    border-bottom: 1px solid #F2F2F2;
  }

  .s-card-info-top-text {
    padding: 16px;
    width: 210px;

    .q-item {
      padding: 0; overflow: hidden;

      .s-card-title {
        line-height: 1.3rem;
      }

      .s-sublabel {
        line-height: normal;
        max-height: 57px;
      }
    }
  }

  .s-logo {
    width: 110px;
    padding: 16px;

    svg {
      width: 75px;
      height: 75px;
    }

    .q-icon {
      font-size: 75px;
    }

    img {
      width: 75px;
      height: 75px;
      border-radius: 4px;
    }
  }

  .s-more-details {
    width: 100%;
    border-top: 1px solid #F2F2F2;
    text-align: center;
    font-size: 14px;

    i {
      margin-left: 5px;
    }
  }
}
</style>
