<template>
  <q-card class="row br-credential-card">
    <q-card-title class="text-center s-card-title">
      Credential Details
    </q-card-title>
    <div class="row justify-between s-card-info">
      <div class="column items-center s-card-info-left">
        <q-card-media>
          <q-icon
            v-if="useDefaultImage || !credential.issuerLogo & !credential.image"
            :name="defaultImage" />
          <img
            v-if="credential.issuerLogo && !credential.image"
            :src="credential.issuerLogo"
            @error="imageError">
          <img
            v-if="credential.image"
            :src="credential.image"
            @error="imageError">
        </q-card-media>
        <q-item-main class="s-issuer-info">
          <q-item-tile label class="text-center">
            Issuer:
          </q-item-tile>
          <q-item-tile
            sublabel
            class="text-center g-sublabel">
            {{credential.issuerName}}
          </q-item-tile>
        </q-item-main>
      </div>
      <div class="s-card-info-right">
        <q-card-title>
          <q-item multiline>
            <q-item-main>
              <q-item-tile label lines="1">
                {{credential.name}}
              </q-item-tile>
              <q-item-tile
                sublabel
                class="g-sublabel">
                {{credential.description}}
              </q-item-tile>
            </q-item-main>
          </q-item>
        </q-card-title>
        <q-card-actions>
          <q-list no-border>
            <credential-card-field
              v-for="(value, key) in fields"
              :icon="schema[key].icon"
              :sublabels="schema[key].sublabels"
              :value="value"
              :visible="showFieldValues"
              :visibility-toggle="visibilityToggle" 
              :index="index"
              :key="value.id"/>
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

  .s-card-title {
    padding: 8px; 
    border-bottom: 1px solid #F2F2F2; 
    width: 100%;
  }

  .s-card-info {
    padding-bottom: 16px;

    .s-card-info-left {
      max-width: 200px; 
      margin: 0 auto;

      .q-card-media {
        max-width: 182px; padding: 16px;

        .q-icon {
          font-size: 150px;
        }

        img {
          width: 150px;
          height: 150px;
          border-radius: 4px
        }
      }

      .s-issuer-info {
        padding: 0 16px;
      } 
    }

    .s-card-info-right {
      max-width: 400px; 
      margin: 0 auto;

      .q-card-title {
        padding: 0 16px;

        .q-item {
          padding: 0; overflow: hidden;

          .q-item-main {
            padding-bottom: 16px; 
            border-bottom: 1px solid #F2F2F2;
          }
        }
      }

      .q-card-actions {
        padding: 0 16px;

        .q-list {
          padding: 0;
        }
      }
    }
  }
}

.g-sublabel {
  line-height: normal; 
  max-height: 57px;
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
