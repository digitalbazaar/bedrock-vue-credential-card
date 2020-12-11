<template>
  <q-item
    class="q-mb-sm s-item"
    :style="{
      'border-radius': visibilityToggle ? '0 50px 50px 0' : 'inherit',
      'background-color': (visibilityToggle && visible) ?
        visibleBackgroundColor : 'inherit',
      cursor: visibilityToggle ? 'pointer' : 'inherit',
      'margin-bottom': visibilityToggle ? '1px' : '0',
      padding: visibilityToggle ? '4px 16px' : '4px 16px'
    }"
    @click.native="isVisible = !isVisible">
    <q-item-label
      v-if="visibilityToggle"
      class="row items-start no-wrap q-mx-auto">
      <q-icon
        :name="icon"
        class="q-mr-sm g-field-icon"
        @mouseover.native="hoverIcon = true"
        @mouseleave.native="hoverIcon = false" />
      <div
        v-if="hoverIcon"
        class="g-hover-name">
        <q-icon
          name="fas fa-sort-down"
          class="g-hover-name-icon" />
        <span>{{name}}</span>
      </div>
      <q-item-section
        lines="1"
        :class="isVisible ? 'text-primary' : 'text-grey-7'"
        class="s-field-data">
        <span v-if="!isVisible">
          {{maskData}}
        </span>
        <span v-else-if="!sublabels">{{value}}</span>
        <div v-else>
          <div
            v-for="object in value"
            :key="object.id">
            {{object}}
          </div>
        </div>
      </q-item-section>
    </q-item-label>
    <q-item-label
      v-if="!visibilityToggle"
      class="row items-start no-wrap q-mx-auto">
      <q-icon
        v-if="!component || component === 'RemainingListCount'"
        :name="icon"
        class="q-mr-sm g-field-icon"
        @mouseover.native="hoverIcon = true"
        @mouseleave.native="hoverIcon = false" />
      <div
        v-if="hoverIcon"
        class="g-hover-name">
        <q-icon
          name="fas fa-sort-down"
          class="g-hover-name-icon" />
        <span>{{name}}</span>
      </div>
      <q-item-section
        v-if="component === 'Image'"
        class="g-field-data-regular">
        <q-img
          style="max-width: 128px; max-height: 128px;"
          class="rounded-borders"
          :src="value" />
      </q-item-section>
      <q-item-section
        v-else-if="component === 'WideImage'"
        :class="presentationView ?
          'g-field-data-presentation' : 'g-field-data-regular'">
        <q-img
          style="max-width: 100%; min-width: 100%;"
          class="rounded-borders"
          :src="value" />
      </q-item-section>
      <q-item-section
        v-else-if="component === 'FixedWidth'"
        class="g-field-data-regular">
        <pre
          style="margin: 0"
          class="text-caption">{{value}}</pre>
      </q-item-section>
      <q-item-section
        v-else-if="component === 'RemainingListCount'">
        <q-expansion-item
          dense-toggle
          :label="value.length + ' Remaining'"
          class="g-field-data-regular"
          header-class="q-pa-none"
          header-style="min-height: auto">
          <q-separator class="q-my-sm" />
          <div
            v-for="(item, index) in value"
            :key="index">
            <q-list>
              <q-item class="q-px-none q-pt-none">
                <q-item-section class="g-field-data-regular">
                  {{item}}
                </q-item-section>
              </q-item>
            </q-list>
          </div>
        </q-expansion-item>
      </q-item-section>
      <q-item-section
        v-else-if="!sublabels"
        class="g-field-data-regular">
        {{value}}
      </q-item-section>
      <q-item-section
        v-else
        class="g-field-data-regular"
        lines="1">
        <div
          v-for="object in value"
          :key="object.id">
          {{object}}
        </div>
      </q-item-section>
    </q-item-label>
    <div
      v-else
      class="s-toggle q-ml-sm row items-center justify-end">
      <q-icon
        :name="isVisible ? hideIcon : showIcon"
        class="s-toggle-icon"
        :color="isVisible ? 'primary' : 'grey-7'" />
    </div>
  </q-item>
</template>
<script>
/*!
 * Copyright (c) 2019 Digital Bazaar, Inc. All rights reserved.
 */
'use strict';

import Quasar from 'quasar';

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
  props: {
    component: {
      type: String,
      required: false
    },
    name: {
      type: String,
      required: true
    },
    icon: {
      type: String,
      required: true
    },
    sublabels: {
      type: Boolean,
      required: false
    },
    value: {
      type: [Array, Number, String],
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
    presentationView: {
      type: Boolean,
      required: false
    }
  },
  data() {
    return {
      maskData: '••••••••••••••••',
      hoverIcon: false,
      isVisible: this.visible
    };
  },
  computed: {
    showIcon() {
      return this.$q.iconSet.credentialCardField.showField;
    },
    hideIcon() {
      return this.$q.iconSet.credentialCardField.hideField;
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
  beforeCreate() {
    // set default icons
    const defaultIcons = DEFAULT_ICONS[this.$q.iconSet.name] ||
      DEFAULT_ICONS.fontawesome;
    if(!this.$q.iconSet.credentialCardField) {
      this.$q.iconSet.credentialCardField = {};
    }
    const {credentialCardField: icons} = this.$q.iconSet;
    for(const name in defaultIcons) {
      if(!icons[name]) {
        icons[name] = defaultIcons[name];
      }
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

.g-hover-name {
  position: absolute;
  margin: -29px 0 0 0;
  background-color: #222;
  color: #fff;
  padding: 5px;
  border-radius: 5px;
  font-size: 12px;
  font-weight: bold;

  .g-hover-name-icon {
    position: absolute;
    margin: 14px 0 0 2px;
    color: #222;
  }
}

.g-field-icon {
  width: 21px;
  margin-top: 3px;
}

.g-field-data-regular {
  width: 250px;
  word-wrap: break-word;
  display: inline-block;

  @include mobile {
    width: calc(100vw - 160px);
  }
}

.g-field-data-presentation {
  width: 250px;;
  word-wrap: break-word;
  display: inline-block;

  @include mobile {
    width: calc(100vw - 96px);
  }
}

.s-item {
  border: none !important;
  min-height: auto;

  .s-field-data {
    width: 195px;
    word-wrap: break-word;
    display: inline-block
  }

  .s-toggle {
    width: 38px;

    .s-toggle-icon {
      font-size: 20px;
    }
  }
}
</style>
