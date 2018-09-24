<template>
  <q-item class="q-mb-sm"
    @click.native="visible = !visible"
    v-bind:style="{
      'border-radius': visibilityToggle ? '0 50px 50px 0' : 'inherit',
      'background-color': (visibilityToggle && visible) ?
        visibleBackgroundColor : 'inherit',
      cursor: visibilityToggle ? 'pointer' : 'inherit',
      'font-weight': (!visibilityToggle || visible) ? 'bold' : 'normal',
      'margin-bottom': visibilityToggle ? '1px' : '0',
      padding: visibilityToggle ? '0 16px' : '8px 16px'
    }">
    <q-item-side v-if="visibilityToggle">
      <q-icon
        style="font-size: 20px"
        :name="visible ? hiddenIcon : visibleIcon"
        :color="visible ? 'primary' : 'faded'" />
    </q-item-side>
    <q-item-main v-if="visibilityToggle">
      <q-item-tile
        label
        lines="1"
        :text-color="visible ? 'primary' : 'dark'">
        {{visible ? value : name}}
      </q-item-tile>
    </q-item-main>
    <q-item-main v-else>
      <q-item-tile label lines="1">{{name}}</q-item-tile>
      <q-item-tile sublabel lines="1">{{value}}</q-item-tile>
    </q-item-main>
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
    visible: 'fas fa-eye',
    hidden: 'fas fa-eye-slash'
  },
  'material-icons': {
    visible: 'visibility',
    hidden: 'visibility_off'
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
    if(!icons.visible) {
      icons.visible = defaultIcons.visible;
    }
    if(!icons.hidden) {
      icons.hidden = defaultIcons.hidden;
    }
  },
  computed: {
    visibleIcon() {
      return this.$q.icon.credentialCardField.visible;
    },
    hiddenIcon() {
      return this.$q.icon.credentialCardField.hidden;
    },
    visibleBackgroundColor() {
      const {utils: {colors}} = Quasar;
      const primary = colors.getBrand('primary');
      const rgba = colors.hexToRgb(primary);
      rgba.a = 0.15;
      return `rgba(${rgba.r}, ${rgba.g}, ${rgba.b}, ${rgba.a})`;
    }
  },
  props: {
    name: {
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
    }
  }
};
</script>
<style>
</style>
