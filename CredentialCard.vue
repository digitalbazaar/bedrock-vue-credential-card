<template>
  <q-card class="row br-credential-card">
    <div class="row justify-between" style="border-bottom: 1px solid #F2F2F2">
      <q-card-title style="padding: 16px; width: 210px">
        <q-item multiline style="padding: 0; overflow: hidden">
          <q-item-main>
            <q-item-tile label lines="1">
              {{credential.name}}
            </q-item-tile>
            <q-item-tile
              sublabel lines="2"
              style="line-height: normal; max-height: 57px;">
              {{credential.description}}
            </q-item-tile>
          </q-item-main>
        </q-item>
      </q-card-title>
      <q-card-media style="width: 110px; padding: 16px">
        <q-icon
          v-if="useDefaultImage || !credential.issuerLogo"
          style="font-size: 75px"
          :name="defaultImage" />
        <img
          v-else
          class="issuer-logo"
          style="border-radius: 4px"
          :src="credential.issuerLogo"
          @error="imageError">
      </q-card-media>
    </div> 
    <q-card-actions style="padding: 0">
      <q-list no-border>
        <credential-card-field
          v-for="(value, key, index) in fields"
          v-if="index < 3"
          :icon="schema[key].icon"
          :value="value"
          :visible="showFieldValues"
          :visibility-toggle="visibilityToggle" 
          :index="index"
          :key="value"/>
      </q-list>
    </q-card-actions>
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
  name: 'CredentialCard',
  components: {CredentialCardField},
  mixins: [credentialMixin]
};

</script>
<style lang="scss" scoped>
.q-card {
  border-radius: 6px;
  width: 320px;
  min-height: 170px
}
.issuer-logo {
  width: 75px;
  height: 75px;
}
</style>
