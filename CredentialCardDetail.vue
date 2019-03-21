<template>
  <q-card class="row br-credential-card">
    <q-card-section class="text-center s-card-title">
      Credential Details
    </q-card-section>
    <div class="row justify-between s-card-info">
      <div class="column items-center s-card-info-left">
        <q-card-section class="s-logo">
          <q-icon
            v-if="showDefaultImage"
            :name="defaultImage" />
          <img
            v-else
            :src="credential.issuerLogo"
            @error="imageError">
        </q-card-section>
        <q-item-label class="s-issuer-info">
          <q-item-section
            class="text-center text-subtitle1">
            Issuer:
          </q-item-section>
          <q-item-section
            class="text-center g-sublabel text-body2 text-grey-7">
            {{credential.issuerName}}
          </q-item-section>
        </q-item-label>
      </div>
      <div class="s-card-info-right">
        <div class="s-card-right-title">
          <q-item
            multiline
            class="s-item">
            <q-item-label class="s-item-label">
              <q-item-section
                class="text-subtitle1"
                lines="1">
                {{credential.name}}
              </q-item-section>
              <q-item-section
                sublabel
                class="g-sublabel text-body2 text-grey-7">
                {{credential.description}}
              </q-item-section>
            </q-item-label>
          </q-item>
        </div>
        <q-card-actions class="s-card-actions">
          <q-list no-border class="s-list">
            <credential-card-field
              v-for="(value, key) in fields"
              :key="value.id"
              :name="schema[key].name"
              :icon="schema[key].icon"
              :sublabels="schema[key].sublabels"
              :value="value"
              :visible="showFieldValues"
              :visibility-toggle="visibilityToggle"
              :index="index" />
          </q-list>
        </q-card-actions>
      </div>
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
  name: 'CredentialCardDetail',
  components: {CredentialCardField},
  mixins: [credentialMixin],
  computed: {
    showDefaultImage() {
      return this.useDefaultImage ||
        !(this.credential.issuerLogo || this.credential.image);
    }
  }
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
  font-size: 1rem;

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

      .s-logo {
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

      .s-card-right-title {
        padding: 16px 32px;

        .s-item {
          padding: 0; overflow: hidden;

          .s-item-label {
            padding-bottom: 16px;
            border-bottom: 1px solid #F2F2F2;
          }
        }
      }

      .s-card-actions {
        padding: 0 16px;

        .s-list {
          padding: 0;
        }
      }
    }
  }
}

.g-sublabel {
  line-height: normal;
  max-height: 57px;
  margin: 0;
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
