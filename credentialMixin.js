/*!
 * Copyright (c) 2019 Digital Bazaar, Inc. All rights reserved.
 */
'use strict';

export const credentialMixin = {
  data() {
    return {
      showFieldValues: false
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
    },
    getSchema(val) {
      let schema = '';
      for(const key in this.schema) {
        if(this.schema[key].icon) {
          if(val === key) {
            schema = this.schema[key];
          }
        }
        else {
          for(const value in this.schema[key]) {
            if(val === value) {
              schema = this.schema[key][value];
            }
          }
        }
      }
      return schema;
    }
  }
};

function _createFields(fields, source, schema) {
  for(const key in source) {
    // naively recurse into objects
    if(typeof source[key] === 'object') {
      for(const key in schema) {
        if(schema[key].icon) {
          _createFields(fields, source[key], schema);
          fields[key] = source[key];
        } else {
          _createFields(fields, source[key], schema[key]);
          fields[key] = source[key];
        }
      }
    } else if(schema[key]) {
      // field defined in schema, add it
      fields[key] = source[key];
    }
  }
}
