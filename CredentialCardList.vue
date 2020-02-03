<template>
  <div
    class="s-collapsible"
    @click="showFieldValues = !showFieldValues">
    <div class="row bg-white s-card">
      <div class="row justify-between items-center s-card-info-top">
        <div class="s-card-info-top-text row">
          <q-icon
            v-if="!showFieldValues"
            name="fas fa-caret-right"
            class="s-arrow" />
          <q-icon
            v-else
            name="fas fa-caret-down"
            class="s-arrow" />
          <q-item class="s-card-info-top-text-lines">
            <q-item-section>
              <q-item-label
                lines="2"
                class="s-card-title text-subtitle1">
                {{credential.name}}
              </q-item-label>
              <q-item-label
                top
                :lines="lines"
                class="s-sublabel text-body2 text-grey-7">
                {{credential.description}}
              </q-item-label>
            </q-item-section>
          </q-item>
        </div>
        <q-card-section class="s-logo">
          <slot name="image">
            <credential-card-image
              :src="credentialImage"
              size="sm" />
          </slot>
        </q-card-section>
      </div>
      <q-separator />
    </div>

    <div v-if="showFieldValues">
      <q-card-actions class="s-fields">
        <q-list no-border>
          <credential-card-field
            v-for="(value, key) in fields"
            :key="key"
            :component="schema[key].component"
            :sublabels="schema[key].sublabels"
            :name="schema[key].name"
            :icon="schema[key].icon"
            :value="value"
            :visible="showFieldValues"
            :visibility-toggle="visibilityToggle"
            :index="index" />
        </q-list>
      </q-card-actions>
    </div>
  </div>
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
  name: 'CredentialCardList',
  components: {CredentialCardField, CredentialCardImage},
  mixins: [credentialMixin],
  computed: {
    lines() {
      return !this.showFieldValues && this.truncateDescription ? 3 : 0;
    }
  }
};

</script>
<style lang="scss" scoped>

$breakpoint-sm: 502px;
$breakpoint-xs: 320px;

@mixin mobile {
  @media (min-width: #{$breakpoint-xs}) and (max-width: #{$breakpoint-sm}) {
    @content;
  }
}

.s-arrow {
  font-size: 24px;
  width: 24px;
  margin: 0 7px 0 0;
}

.s-collapsible {
  width: 100%;
  padding: 0;
  border-bottom: 1px solid rgba(157, 157, 157, 0.75);
  cursor: pointer;
  user-select: none;
}

.s-card {
  border-radius: 6px;
  min-height: 83px;
  width: 100%;
  font-size: 1rem;

  .s-card-info-top {
    width: 100%;

    .s-card-info-top-text {
      padding: 16px;

      .s-card-info-top-text-lines {
        max-width: 350px;

        @include mobile {
          max-width: 175px;
        }
      }

      .q-item {
        padding: 0; overflow: hidden;

        .s-card-title {
          line-height: 1.3rem;
        }

        .s-sublabel {
          line-height: normal;
          margin: 0;
        }
      }
    }

    .s-logo {
      padding: 0px;
    }
  }
}

.s-fields {
  border-top: 1px solid #F2F2F2;
  padding: 8px 0 8px 30px;
  font-size: 1rem;
}
</style>
