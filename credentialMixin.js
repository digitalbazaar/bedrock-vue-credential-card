/*!
 * Copyright (c) 2019 Digital Bazaar, Inc. All rights reserved.
 */
'use strict';

export const credentialMixin = {
  props: {
    credential: {
      type: Object,
      required: true,
    },
    issuerMap: {
      type: Object,
      default: () => ({})
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
      default: 3,
      required: false
    },
    clickable: {
      type: Boolean,
      required: false
    }
  },
  data() {
    return {
      showFieldValues: false
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
    issuer() {
      const {issuer} = this.credential;
      if(!issuer) {
        return {};
      }
      if(typeof issuer === 'string') {
        return this.issuerMap[issuer] || {};
      }
      if(typeof issuer === 'object') {
        const {id} = issuer;
        const additionalIssuerInformation = this.issuerMap[id];
        return {
          ...additionalIssuerInformation,
          ...issuer // override issuer map data with credential data
        };
      }
      return {};
    },
    issuerName() {
      return this.issuer.name;
    },
    credentialImage() {
      if(this.credential.image) {
        return this.credential.image;
      }
      if(this.issuer.image) {
        return this.issuer.image;
      }
      if(this.issuer.logo) {
        return this.issuer.logo;
      }
      return '';
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
    }
  }
};

function _createFields(fields, source, schema) {
  for(const key in schema) {
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
