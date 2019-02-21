<template>
  <q-card class="row br-credential-card">
    <q-card-title class="text-center" style="padding: 8px; border-bottom: 1px solid #F2F2F2; width: 100%" >
      Credential Details
    </q-card-title>
    <div class="row justify-between" style="padding-bottom: 16px;">
      <div class="column items-center" style="max-width: 200px; margin: auto">
        <q-card-media style="max-width: 182px; padding: 16px">
          <q-icon
            v-if="useDefaultImage || !credential.issuerLogo & !credential.image"
            style="font-size: 75px"
            :name="defaultImage" />
          <img
            v-if="credential.issuerLogo && !credential.image"
            class="issuer-logo"
            style="border-radius: 4px"
            :src="credential.issuerLogo"
            @error="imageError">
          <img
            v-else
            class="credential-image"
            style="border-radius: 4px"
            :src="credential.image"
            @error="imageError">
        </q-card-media>
        <q-item-main style="padding: 0 16px">
          <q-item-tile label class="text-center">
            Issuer:
          </q-item-tile>
          <q-item-tile
            sublabel
            class="text-center"
            style="line-height: normal; max-height: 57px;">
            {{credential.issuerName}}
          </q-item-tile>
        </q-item-main>
      </div>
      <div style="max-width: 400px; margin: auto">
        <q-card-title style="padding: 16px;">
          <q-item multiline style="padding: 0; overflow: hidden">
            <q-item-main style="padding-bottom: 16px; border-bottom: 1px solid #F2F2F2">
              <q-item-tile label lines="1">
                {{credential.name}}
              </q-item-tile>
              <q-item-tile
                sublabel
                style="line-height: normal; max-height: 57px;">
                {{credential.description}}
              </q-item-tile>
            </q-item-main>
          </q-item>
        </q-card-title>
        <q-card-actions style="padding: 0">
          <q-list no-border style="padding: 0">
            <credential-card-field
              v-for="(value, key) in fields"
              :icon="schema[key].icon"
              :value="value"
              :visible="showFieldValues"
              :visibility-toggle="visibilityToggle" 
              :index="index"
              :key="value"/>
          </q-list>
        </q-card-actions>
      </div>
    </div>
  </q-card>
</template>
<script>
/*!
 * Copyright (c) 2018 Digital Bazaar, Inc. All rights reserved.
 */
'use strict';

import CredentialCardField from './CredentialCardField.vue';
import {credentialMixin} from './credentialMixin.js'

export default {
  name: 'CredentialCardDetail',
  components: {CredentialCardField},
  mixins: [credentialMixin]
};

</script>
<style lang="scss" scoped>

$breakpoint-xs: 600px;

@mixin mobile {
  @media (max-width: #{$breakpoint-xs}) {
    @content;
  }
}

.q-card {
  border-radius: 6px;
  max-width: 600px;
  min-height: 170px;
}

.issuer-logo
.credential-image {
  width: 150px;
  height: 150px;
}

.q-item-label,
.q-item-sublabel {
  @include mobile {
    text-align: center;
  }
}

.q-list {
  @include mobile {
    margin: auto;
  };
}


</style>
