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

const DEFAULT_ICONS = {
  fontawesome: {
    defaultImage: 'fas fa-check-square'
  },
  'material-icons': {
    defaultImage: 'check_box'
  }
};

export default {
  name: 'CredentialCard',
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
      showFieldValues: false,
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
      console.log('FIELDS', fields)

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
