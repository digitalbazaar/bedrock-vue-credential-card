<template>
  <q-card class="row br-credential-card bg-white q-ma-md">
    <div class="row justify-between s-card-info-top">
      <q-card-title class="s-card-info-top-text">
        <q-item multiline>
          <q-item-main>
            <q-item-tile label class="s-card-title" lines="2">
              {{credential.name}}
            </q-item-tile>
            <q-item-tile
              sublabel lines="2"
              class="s-sublabel">
              {{credential.description}}
            </q-item-tile>
          </q-item-main>
        </q-item>
      </q-card-title>
      <q-card-media>
        <q-icon
          v-if="useDefaultImage || !credential.issuerLogo"
          :name="defaultImage" />
        <img
          v-else
          :src="credential.issuerLogo"
          @error="imageError">
      </q-card-media>
    </div>
    <q-card-actions>
      <q-list no-border>
        <credential-card-field
          v-for="(value, key, index) in fields"
          v-if="index < 3"
          :sublabels="schema[key].sublabels"
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
 * Copyright (c) 2019 Digital Bazaar, Inc. All rights reserved.
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
  min-height: 170px;


  .s-card-info-top {
    border-bottom: 1px solid #F2F2F2;

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

    .q-card-media {
      width: 110px;
      padding: 16px;

      .q-icon {
        font-size: 75px;
      }

      img {
        width: 75px;
        height: 75px;
        border-radius: 4px;
      }
    }
  }

  .q-card-actions {
    padding: 0;
  }
}
</style>
