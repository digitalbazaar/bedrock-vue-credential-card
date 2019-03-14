const DEFAULT_ICONS = {
  fontawesome: {
    defaultImage: 'fas fa-check-square'
  },
  'material-icons': {
    defaultImage: 'check_box'
  }
};

export const credentialMixin = {
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
      useDefaultImage: false,
      toggleArrow: 'fas fa-caret-right'
    };
  },
  computed: {
    fields() {
      if(!(this.credential || this.schema)) {
        return {};
      }
      const {credentialSubject} = this.credential;
      const fields = {};
      _createFields(fields, credentialSubject, this.schema);
      return fields;
    },
    defaultImage() {
      if(this.defaultIcon) {
        return this.defaultIcon;
      }
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
    },
    defaultIcon: {
      type: String,
      required: false
    }
  },
  methods: {
    imageError() {
      this.useDefaultImage = true;
    },
    toggleFields() {
      console.log('Show Field Values', this.showFieldValues)
      if(!this.showFieldValues) {
        this.showFieldValues = true;
        this.toggleArrow = 'fas fa-caret-down';
      } else {
        this.showFieldValues = false;
        this.toggleArrow = 'fas fa-caret-right';
      }
    }
  }
};

function _createFields(fields, source, schema) {
  for(const key in source) {
    // naively recurse into objects
    if(typeof source[key] === 'object') {
      _createFields(fields, source[key], schema);
      fields[key] = source[key];
    } else if(schema[key]) {
      // field defined in schema, add it
      fields[key] = source[key];
    }
  }
}
