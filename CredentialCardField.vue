<template>
  <q-item class="q-mb-sm item"
    @click.native="visible = !visible"
    v-bind:style="{
      'border-radius': visibilityToggle ? '0 50px 50px 0' : 'inherit',
      'background-color': (visibilityToggle && visible) ?
        visibleBackgroundColor : 'inherit',
      cursor: visibilityToggle ? 'pointer' : 'inherit',
      'margin-bottom': visibilityToggle ? '1px' : '0',
      padding: visibilityToggle ? '4px 16px' : '4px 16px'
    }">
    <q-item-main v-if="visibilityToggle" class="row no-wrap">
      <q-icon :name="icon" class="q-mr-sm field-icon" />
      <q-item-tile
        lines="1"
        :text-color="visible ? 'primary' : 'faded'"
        style="width: 195px; overflow: hidden">
        <span v-if="visible">{{value}}</span>
        <span v-else>
          {{maskData}}
        </span>
      </q-item-tile>
    </q-item-main>
    <q-item-main v-else class="row no-wrap">
      <q-icon :name="icon" class="q-mr-sm field-icon" />
      <q-item-tile style="max-width: 259px; overflow-x: hidden" lines="1" >{{value}}</q-item-tile>
    </q-item-main>
    <q-item-side v-if="visibilityToggle" right>
      <q-icon
        style="font-size: 20px"
        :name="visible ? hideIcon : showIcon"
        :color="visible ? 'primary' : 'faded'" />
    </q-item-side>
  </q-item>
</template>
<script>
/*!
 * Copyright (c) 2018 Digital Bazaar, Inc. All rights reserved.
 */
'use strict';

import Quasar from 'quasar-framework';

const DEFAULT_ICONS = {
  fontawesome: {
    showField: 'fas fa-eye-slash',
    hideField: 'fas fa-eye'
  },
  'material-icons': {
    showField: 'visibility',
    hideField: 'visibility_off'
  }
};

export default {
  name: 'CredentialCardField',
  beforeCreate() {
    // set default icons
    const defaultIcons = DEFAULT_ICONS[this.$q.icon.name] ||
      DEFAULT_ICONS.fontawesome;
    if(!this.$q.icon.credentialCardField) {
      this.$q.icon.credentialCardField = {};
    }
    const {credentialCardField: icons} = this.$q.icon;
    for(const name in defaultIcons) {
      if(!icons[name]) {
        icons[name] = defaultIcons[name];
      }
    }
  },
  data() {
    return {
      maskData: '••••••••••••••••'
    };
  },
  computed: {
    showIcon() {
      return this.$q.icon.credentialCardField.showField;
    },
    hideIcon() {
      return this.$q.icon.credentialCardField.hideField;
    },
    visibleBackgroundColor() {
      const {utils: {colors}} = Quasar;
      const primary = colors.getBrand('primary');
      const rgba = colors.hexToRgb(primary);
      rgba.a = 0.15;
      return `rgba(${rgba.r}, ${rgba.g}, ${rgba.b}, ${rgba.a})`;
    },
    darkerPrimary() {
      const {utils: {colors}} = Quasar;
      const primary = colors.getBrand('primary');
      const darker = colors.lighten(primary, -25);
      return darker;
    }
  },
  props: {
    icon: {
      type: String,
      required: true
    },
    value: {
      type: String,
      required: true
    },
    visible: {
      type: Boolean,
      required: false
    },
    visibilityToggle: {
      type: Boolean,
      required: false
    },
    index: {
      type: Number,
      required: true
    }
  }
};
</script>
<style lang="scss" scoped>
  .field-icon {
    width: 21px;
  }

  .item {
    border: none !important;
    min-height: auto;
  }
</style>
