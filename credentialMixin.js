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
  data() {
    return {
      showFieldValues: false,
      useDefaultImage: false
    };
  },
  created() {
    // Defaults shown fields to 3 if not defined as prop
    if(this.fieldQuantity === undefined) {
      this.fieldQuantity = 3;
    }
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
      return this.$q.iconSet.credentialCard.defaultImage;
    }
  },
  props: {
    credential: {
      type: Object,
      required: true,
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
    },
    fieldQuantity: {
      type: Number,
      required: false
    },
    clickable: {
      type: Boolean,
      required: false
    }
  },
  methods: {
    imageError() {
      this.useDefaultImage = true;
    },
    sliceFields(slice) {
      /**
       * Take the fields object and slice off a few properties.
       * @param {number} slice - Max number of fields to return.
       *
       * @returns {Object} A sliced fields object
       */
      const entries = Object.entries(this.fields).slice(0, slice);
      return entries.reduce((acc, [key, value]) => {
        acc[key] = value;
        return acc;
      }, {});
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
