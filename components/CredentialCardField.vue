<template>
  <div>
    <q-item
      class="q-mb-sm s-item"
      :style="{
        'border-radius': visibilityToggle ? '0 50px 50px 0' : 'inherit',
        'background-color': (visibilityToggle && visible) ?
          visibleBackgroundColor : 'inherit',
        cursor: visibilityToggle ? 'pointer' : 'inherit',
        'margin-bottom': visibilityToggle ? '1px' : '0',
        padding: visibilityToggle ? '4px 0px' : '4px 0px'
      }"
      @click="isVisible = !isVisible">
      <q-item-label
        v-if="visibilityToggle"
        class="row items-start no-wrap q-mx-auto full-width">
        <q-item-section
          lines="1"
          :class="isVisible ? 'text-primary' : 'text-grey-7'"
          class="s-field-data">
          <div class="text-caption text-grey-7">
            {{name}}
          </div>
          <span v-if="!isVisible">
            {{maskData}}
          </span>
          <span v-else-if="!sublabels">{{displayValue}}</span>
          <div v-else>
            <div
              v-for="object in displayValue"
              :key="object.id">
              {{object}}
            </div>
          </div>
        </q-item-section>
      </q-item-label>
      <q-item-label
        v-if="!visibilityToggle"
        class="row items-start no-wrap q-mx-auto full-width">
        <q-item-section
          v-if="component === 'Image'"
          class="g-field-data-regular q-py-sm q-px-md">
          <q-img
            style="max-width: 128px; max-height: 128px;"
            class="rounded-borders"
            :src="displayValue" />
        </q-item-section>
        <q-item-section
          v-if="component === 'MediumImage'"
          class="q-py-sm q-px-md"
          :class="presentationView ?
            'g-field-data-presentation' : 'g-field-data-regular'">
          <q-img
            style="max-width: 250px; margin: auto"
            class="rounded-borders row"
            :src="displayValue" />
        </q-item-section>
        <q-item-section
          v-else-if="component === 'WideImage'"
          class="q-py-sm q-px-md"
          :class="presentationView ?
            'g-field-data-presentation' : 'g-field-data-regular'">
          <q-img
            style="max-width: 100%; min-width: 100%;"
            class="rounded-borders"
            :src="displayValue" />
        </q-item-section>
        <q-item-section
          v-else-if="component === 'FixedWidth'"
          class="g-field-data-regular">
          <div class="text-caption text-grey-7">
            {{name}}
          </div>
          <pre
            style="margin: 0"
            class="text-caption">{{displayValue}}</pre>
        </q-item-section>
        <q-item-section
          v-else-if="component === 'RemainingListCount'">
          <q-card-section
            class="q-pa-none full-width">
            <div class="text-caption text-grey-7">
              {{name}}
            </div>
            <div>
              {{displayValue + ' Remaining'}}
            </div>
          </q-card-section>
        </q-item-section>
        <q-item-section
          v-else-if="!sublabels"
          class="g-field-data-regular">
          <div class="text-caption text-grey-7">
            {{name}}
          </div>
          <div>
            {{displayValue}}
          </div>
        </q-item-section>
        <q-item-section
          v-else
          class="g-field-data-regular"
          lines="1">
          <div class="text-caption text-grey-7">
            {{name}}
          </div>
          <div
            v-for="object in displayValue"
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
    <q-separator
      v-if="!presentationView"
      class="full-width" />
  </div>
</template>

<script>
/*!
 * Copyright (c) 2018-2022 Digital Bazaar, Inc. All rights reserved.
 */
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
      required: false,
      default: ''
    },
    name: {
      type: String,
      required: true
    },
    icon: {
      type: String,
      required: false,
      default: ''
    },
    sublabels: {
      type: Boolean,
      required: false
    },
    value: {
      type: [Array, Object, Number, String],
      required: true
    },
    valueMapper: {
      type: Function,
      required: false,
      default: () => {}
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
    },
    displayValue() {
      if(!this.valueMapper) {
        return this.value;
      }
      return this.valueMapper(this.value);
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
