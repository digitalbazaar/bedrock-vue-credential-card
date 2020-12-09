<template>
  <q-card class="row">
    <div
      v-if="presentationView === false"
      class="full-width">
      <q-card-section class="text-center s-card-title">
        Credential Details
        <q-icon
          v-if="modal"
          v-close-popup
          name="fas fa-times"
          class="s-close-icon"
          size="sm" />
      </q-card-section>
      <div class="row justify-between s-card-info q-pb-md">
        <div class="column items-center s-card-info-left">
          <q-card-section class="s-logo">
            <slot name="image">
              <credential-card-image
                :src="credentialImage"
                size="lg" />
            </slot>
          </q-card-section>
          <q-item-label
            v-if="issuerName"
            class="s-issuer-info">
            <q-item-section
              class="text-center text-subtitle1">
              Issuer:
            </q-item-section>
            <q-item-section
              class="text-center g-sublabel text-body2 text-grey-7">
              {{issuerName}}
            </q-item-section>
          </q-item-label>
          <slot name="bottom-left" />
        </div>
        <div class="s-card-info-right">
          <div class="s-card-right-title">
            <q-item
              class="s-item q-px-none">
              <q-item-section>
                <q-item-label class="text-subtitle1 q-mb-sm">
                  {{credential.name || credential.type[1]}}
                </q-item-label>
                <q-item-label
                  class="g-sublabel text-body2 text-grey-7 q-mb-sm"
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
          <q-card-actions class="s-card-actions">
            <q-list
              no-border
              class="s-list q-mx-auto">
              <credential-card-field
                v-for="(value, key) in detailsFields"
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
        </div>
      </div>
    </div>
    <div
      v-else
      class="full-width">
      <q-card-section class="text-center s-card-title">
        Presentation View
        <q-icon
          v-if="modal"
          name="fas fa-arrow-left"
          class="s-back-icon"
          size="sm"
          @click="presentationView = false" />
        <q-icon
          v-if="modal"
          v-close-popup
          name="fas fa-times"
          class="s-close-icon"
          size="sm" />
      </q-card-section>
      <div class="row justify-between q-py-sm">
        <div class="q-mx-auto">
          <q-card-actions class="s-card-actions">
            <q-list
              no-border
              class="s-list q-mx-auto">
              <credential-card-field
                v-for="(value, key) in presentationFields"
                :key="key"
                :component="presentationSchema[key].component"
                :name="presentationSchema[key].name"
                :icon="presentationSchema[key].icon"
                :presentation-view="presentationSchema[key].presentationView"
                :sublabels="presentationSchema[key].sublabels"
                :value="value"
                :visible="showFieldValues"
                :visibility-toggle="visibilityToggle" />
            </q-list>
          </q-card-actions>
        </div>
      </div>
    </div>
    <div
      v-if="schema.barcodeImage && !presentationView"
      class="full-width floating-button"
      :style="$q.screen.lt.sm ? 'position: fixed' : 'position: sticky'">
      <q-btn
        fab
        class="float-right q-mr-md q-mb-md"
        color="primary"
        icon="fas fa-qrcode"
        @click="presentationView = true" />
    </div>
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
      viewMore: true,
      presentationView: false
    };
  },
  computed: {
    lines() {
      return this.viewMore && this.truncateDescription ? 3 : 0;
    },
    buttonLabel() {
      return this.viewMore ? 'View More' : 'View Less';
    },
    detailsFields() {
      const newFields = {...this.fields};
      for(const [key, value] of Object.entries(newFields)) {
        for(const [key2, value2] of Object.entries(this.schema)) {
          console.log(value2);
          if(key === key2 && value2.detailsView === false) {
            delete newFields[key];
          }
        }
      }
      return newFields;
    },
    presentationFields() {
      const newFields = {};
      for(const [key, value] of Object.entries(this.fields)) {
        for(const [key2, value2] of Object.entries(this.presentationSchema)) {
          if(key === key2) {
            newFields[key] = value;
          }
        }
      }
      return newFields;
    },
    presentationSchema() {
      const newSchema = {};
      for(const [key, value] of Object.entries(this.schema)) {
        console.log(key, value);
        if(value.presentationView === true) {
          newSchema[key] = value;
        }
      }
      return newSchema;
    }
  }
};

</script>
<style lang="scss" scoped>

$breakpoint-xs: 560px;

@mixin mobile {
  @media (max-width: #{$breakpoint-xs}) {
    @content;
  }
}

.floating-button {
  height: 0px;
  bottom: 0px;
  transform: translateY(-72px)
}

.q-card {
  border-radius: 6px;
  max-width: 600px;
  min-height: 170px;
  font-size: 1rem;

  .s-card-title {
    z-index: 1;
    position: sticky;
    top: 0px;
    padding: 8px;
    border-bottom: 1px solid #F2F2F2;
    background: #fff;
    width: 100%;
  }

  .s-close-icon {
    position: absolute;
    top: 2px;
    right: 4px;
    font-size: 12px;
    padding: 8px;
  }

  .s-back-icon {
    position: absolute;
    top: 2px;
    left: 4px;
    font-size: 12px;
    padding: 8px;
  }

  .s-close-icon:hover, .s-back-icon:hover {
    color: #9e9e9e;
    cursor: pointer;
  }

  .s-card-info {
    padding-bottom: 16px;
    margin: auto;

    @include mobile {
      width: calc(100vw - 64px);
    }

    .s-card-info-left {
      max-width: 200px;
      margin: 0 auto;

      @include mobile {
        margin-bottom: 16px;
      }

      .s-logo {
        max-width: 182px; padding: 16px;
      }

      .s-issuer-info {
        padding: 0 16px;
      }
    }

    .s-card-info-right {
      max-width: 400px;
      margin: 0 auto;

      @include mobile {
        border-top: 1px solid #F2F2F2;
      }

      .s-card-right-title {
        padding: 16px 32px;

        .s-item {
          overflow: hidden;
          border-bottom: 1px solid #F2F2F2;
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
