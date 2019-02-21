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

const DEFAULT_ICONS = {
  fontawesome: {
    defaultImage: 'fas fa-check-square'
  },
  'material-icons': {
    defaultImage: 'check_box'
  }
};

export default {
  name: 'CredentialCardDetail',
  components: {CredentialCardField},
  beforeCreate() {
    // set default icons
    const defaultIcons = DEFAULT_ICONS[this.$q.icon.name] ||
      DEFAULT_ICONS.fontawesome;
    if(!this.$q.icon.credentialCard) {
      this.$q.icon.credentialCard = {};
    }
    const {credentialCard: icons} = this.$q.icon;
    for(const name in defaultIcons) {
      if(!icons[name]) {
        icons[name] = defaultIcons[name];
      }
    }
  },
  data() {
    return {
      useDefaultImage: false
    };
  },
  computed: {
    fields() {
      if(!this.credential || !this.schema) {
        return {};
      }
      const {credentialSubject} = this.credential;
      const fields = {};
      _createFields(fields, credentialSubject, this.schema);
      return fields;
    },
    defaultImage() {
      return this.$q.icon.credentialCard.defaultImage;
    }
  },
  props: {
    credential: {
      type: Object,
      required: true
    },
    schema: {
      type: Object,
      required: true
    },
    visibilityToggle: {
      type: Boolean,
      required: false
    }
  },
  methods: {
    imageError() {
      this.useDefaultImage = true;
    }
  }
};

function _createFields(fields, source, schema) {
  console.log('SOURCE', source);
  for(const key in source) {
    // naively recurse into objects
    if(typeof source[key] === 'object') {
      _createFields(fields, source[key], schema);
      // console.log('ADDRESS FIELDS', schema[key])'

    } else if(schema[key]) {
      // field defined in schema, add it
      fields[key] = source[key];
    }
  }

}
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
    min-height: 170px
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
