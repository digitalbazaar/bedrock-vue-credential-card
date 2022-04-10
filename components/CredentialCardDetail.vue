<template>
  <q-card class="row">
    <delete-confirmation-modal
      :open="openDeleteConfirmationModal"
      @cancel="openDeleteConfirmationModal = false"
      @delete="$emit('delete', credential.id); openDeleteConfirmationModal = false"
    />
    <div
      v-if="presentationView === false"
      class="full-width">
      <q-card-section class="text-center s-card-title">
        <div class="row">
          <div class="col-2">
            <div class="float-left">
              <q-btn
                flat
                round
                size="sm"
                color="negative"
                icon="far fa-trash-alt"
                @click.prevent="openDeleteConfirmationModal = true" />
            </div>
          </div>
          <div class="col-8 q-my-auto">
            Credential Details
          </div>
          <div class="col-2">
            <div class="float-right">
              <q-btn
                flat
                round
                size="sm"
                color="black"
                icon="fas fa-times"
                v-if="modal"
                v-close-popup />
            </div>
          </div>
        </div>
      </q-card-section>
      <div
        class="column justify-start s-card-info q-pb-md"
        :class="$q.screen.lt.sm ? 'content-fill' : ''">
        <div class="column items-center s-card-info-left">
          <q-card-section
            v-if="issuerName"
            class="text-center q-pa-sm">
            <div class="text-caption text-grey-7">
              Issued by
            </div>
            <div class="text-body2">
              {{issuerName}}
            </div>
          </q-card-section>
          <q-card-section class="s-logo">
            <slot name="image">
              <credential-card-image
                :src="credentialImage"
                size="lg" />
            </slot>
          </q-card-section>
        </div>
        <div class="s-card-info-right">
          <div class="s-card-right-title">
            <q-item
              class="s-item q-px-none">
              <q-item-section>
                <q-item-label class="text-subtitle1 text-center q-mb-sm">
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
              class="s-list q-mx-auto full-width">
              <credential-card-field
                v-for="(value, key) in detailsFields"
                :key="key"
                :component="schema[key].component"
                :name="schema[key].name"
                :icon="schema[key].icon"
                :sublabels="schema[key].sublabels"
                :value-mapper="schema[key].valueMapper"
                :value="value"
                :visible="showFieldValues"
                :visibility-toggle="visibilityToggle" />
            </q-list>
          </q-card-actions>
        </div>
      </div>
      <q-card-section class="text-center sticky-bottom q-pa-sm">
        <div class="text-caption text-grey-7">
          Issued for
        </div>
        <div class="text-body2">
          {{profile.name}}
        </div>
      </q-card-section>
    </div>
    <div
      v-else
      class="full-width"
      :style="$q.screen.lt.sm ? '' : 'min-width: 300px'">
      <q-card-section class="text-center s-card-title">
        <div class="row">
          <div class="col-2">
            <div class="float-left">
              <q-btn
                flat
                round
                size="sm"
                color="black"
                icon="fas fa-arrow-left"
                v-if="modal"
                @click="presentationView = false" />
            </div>
          </div>
          <div class="col-8 q-my-auto">
            Presentation View
          </div>
          <div class="col-2">
            <div class="float-right">
              <q-btn
                flat
                round
                size="sm"
                color="black"
                icon="fas fa-times"
                v-if="modal"
                v-close-popup />
            </div>
          </div>
        </div>
      </q-card-section>
      <div class="row justify-between">
        <div
          class="q-mx-auto"
          :class="$q.screen.lt.sm ? '' : 'full-width'">
          <q-card-actions class="s-card-actions">
            <q-list
              no-border
              class="s-list q-mx-auto full-width">
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
      <slot name="qrcode" />
    </div>
    <div
      v-if="schema.presentationView && !presentationView"
      class="full-width floating-button"
      :style="$q.screen.lt.sm ? 'position: fixed' : 'position: sticky'">
      <q-btn
        round
        class="float-right q-mr-sm q-mb-xs q-pa-xs"
        color="primary"
        icon="fas fa-qrcode"
        size="md"
        @click="handlePresentationView()" />
    </div>
  </q-card>
</template>

<script>
/*!
 * Copyright (c) 2018-2022 Digital Bazaar, Inc. All rights reserved.
 */
import CredentialCardField from './CredentialCardField.vue';
import CredentialCardImage from './CredentialCardImage.vue';
import DeleteConfirmationModal from './DeleteConfirmationModal.vue';
import {credentialMixin} from './credentialMixin.js';

export default {
  name: 'CredentialCardDetail',
  components: {CredentialCardField, CredentialCardImage, DeleteConfirmationModal},
  mixins: [credentialMixin],
  props: {
    modal: {
      type: Boolean,
      required: false
    },
    profile: {
      type: Object,
      required: true,
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
      for(const [key] of Object.entries(newFields)) {
        for(const [key2, value2] of Object.entries(this.schema)) {
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
        for(const [key2] of Object.entries(this.presentationSchema)) {
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
        if(value.presentationView === true) {
          newSchema[key] = value;
        }
      }
      return newSchema;
    }
  },
  methods: {
    handlePresentationView() {
      this.presentationView = true;
      this.$emit('presentation-view');
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

.content-fill {
  min-height: calc(100vh - 101px)
}

.sticky-bottom {
  position: sticky;
  height: 60px;
  bottom: 0px;
  background: #fff;
  border-top: 1px solid #F2F2F2;
}

.floating-button {
  height: 0px;
  bottom: 0px;
  transform: translateY(-54px)
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

  .s-card-info {
    padding-bottom: 16px;
    margin: auto;

    @include mobile {
      width: calc(100vw - 64px);
    }

    .s-card-info-left {
      max-width: 200px;
      margin: 0 auto;

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

      .s-card-right-title {
        padding: 0 16px;

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
