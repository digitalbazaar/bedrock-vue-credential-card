<template>
  <div>
    <q-icon
      v-if="showDefault || hasImageError"
      :name="defaultImage" />
    <img
      v-else
      :src="src"
      @error="imageError">
  </div>
</template>
<script>
/*!
 * Copyright (c) 2019 Digital Bazaar, Inc. All rights reserved.
 */
'use strict';

const DEFAULT_ICONS = {
  fontawesome: {
    defaultImage: 'fas fa-check-square'
  },
  'material-icons': {
    defaultImage: 'check_box'
  }
};

export default {
  name: 'CredentialCardImage',
  props: {
    showDefault: {
      type: Boolean,
      required: true,
      default: false
    },
    src: {
      type: String,
      required: true,
      default: ''
    }
  },
  data() {
    return {
      hasImageError: false
    };
  },
  computed: {
    defaultImage() {
      if(this.defaultIcon) {
        return this.defaultIcon;
      }
      return this.$q.iconSet.credentialCard.defaultImage;
    }
  },
  beforeCreate() {
    // set default icons
    const defaultIcons = DEFAULT_ICONS[this.$q.iconSet.name] ||
      DEFAULT_ICONS.fontawesome;
    // if the iconSet is missing credentialCard add it.
    if(!this.$q.iconSet.credentialCard) {
      this.$q.iconSet.credentialCard = {};
    }
    // add all the defaultIcons to credentialCard
    for(const name in defaultIcons) {
      if(!this.$q.iconSet.credentialCard[name]) {
        this.$q.iconSet.credentialCard[name] = defaultIcons[name];
      }
    }
  },
  methods: {
    imageError() {
      this.hasImageError = true;
    }
  }
};

</script>
<style lang="scss" scoped>
</style>
