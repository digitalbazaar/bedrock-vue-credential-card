export const credentialMixin = {
  data() {
    return {
      showFieldValues: false,
      useDefaultImage: false,
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
    defaultImage: {
      type: String,
      default: 'fas fa-check-square',
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
