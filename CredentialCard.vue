<template>
  <q-card style="
    border-radius: 6px;
    width: 320px;
    min-height: 170px"
    class="br-credential-card">
    <q-card-title style="padding: 16px 16px 0 16px">
      <q-item multiline style="padding: 0; overflow: hidden">
        <q-item-main>
          <q-item-tile label lines="1">
            {{credential.name}}
          </q-item-tile>
          <q-item-tile
            sublabel lines="3"
            style="line-height: normal; max-height: 57px">
            {{credential.description}}
          </q-item-tile>
        </q-item-main>
      </q-item>
      <q-card-media slot="right" style="max-width: 100px; margin-left: 20px">
        <q-icon
          v-if="useDefaultImage || !credential.image"
          style="font-size: 100px"
          :name="defaultImage" />
        <img
          v-else
          height="100px"
          style="border-radius: 4px"
          :src="credential.image"
          @error="imageError">
      </q-card-media>
    </q-card-title>
    <q-card-actions style="padding: 0">
      <q-collapsible
        icon-toggle
        :collapse-icon="collapseIcon"
        class="col"
        header-style="padding: 8px"
        @show="showFieldValues = undefined"
        @hide="showFieldValues = false">
        <template slot="header">
          <q-btn
            flat
            text-color="primary"
            style="font-weight: bold; font-size: 14px"
            label="Show"
            @click="show" />
          <q-btn
            flat
            text-color="primary"
            style="font-weight: bold; font-size: 14px"
            label="Share"
            @click="share" />
          <span class="col"></span>
        </template>
        <q-list no-border :separator="!visibilityToggle">
          <credential-card-field
            v-for="(value, key) in fields"
            :name="schema[key].name"
            :value="value"
            :visible="showFieldValues"
            :visibility-toggle="visibilityToggle" />
        </q-list>
      </q-collapsible>
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
    defaultImage: 'fas fa-check-square',
    collapse: 'fas fa-chevron-down'
  },
  'material-icons': {
    defaultImage: 'check_box',
    collapse: 'keyboard_arrow_down'
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
      return fields;
    },
    collapseIcon() {
      return this.$q.icon.credentialCard.collapse;
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
    },
    share() {
      this.$emit('share', {
        data: {credential: this.credential}
      });
    },
    show() {
      this.$emit('show', {
        data: {credential: this.credential}
      });
    }
  }
};

function _createFields(fields, source, schema) {
  for(const key in source) {
    // naively recurse into objects
    if(typeof source[key] === 'object') {
      _createFields(fields, source[key], schema);
    } else if(schema[key]) {
      // field defined in schema, add it
      fields[key] = source[key];
    }
  }
}
</script>
<style>
</style>
