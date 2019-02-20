<template>
  <q-page
    class="column gutter-md"
    padding>
    <div class="column items-center">
      <div>
        <h4>Regular mode</h4>
        <credential-card
          :credential="credential"
          :schema="schema"
          @show="show"
          @share="share"></credential-card>
        <h4>Show mode</h4>
        <credential-card
          :credential="credential"
          :schema="schema"
          visibility-toggle
          @show="show"
          @share="share"></credential-card>
      </div>
    </div>
  </q-page>
</template>
<script>
/*!
 * Copyright (c) 2018 Digital Bazaar, Inc. All rights reserved.
 */
'use strict';

import {CredentialCard} from 'bedrock-vue-credential-card';

export default {
  name: 'Home',
  components: {CredentialCard},
  data() {
    return {
      credential: {
        "@context": 'https://w3id.org/credentials/v1',
        "id": 'urn:uuid:7d43de52-a23b-11e8-8389-d77d791b431c',
        "type": ["VerifiableCredential", "ex:AddressCard"],
        "name": "Address Card",
        "description": "Your verified US address",
        "issuanceDate": new Date().toJSON(),
        "issuer": 'did:v1:test:1234',
        "issuerLogo": '/images/dmv-logo.png',
        "image": 'https://example.org/address.png',
        "credentialSubject": {
          "id": 'did:v1:test:1234',
          "name": "John Doe",
          "email": 'john.doe@test.comsfefsfesefsefsefsesefesfsefsef',
          "phone": '555-555-5555',
          "address": {
            "streetAddress": "123 Main St.",
            "addressCountry": "US",
            "addressLocality": "Chicago",
            "addressRegion": "IL",
            "postalCode": "60610-2949"
          },
        },
        "signature": {
          "type": "Ed25519Signature2018",
          "created": new Date().toJSON(),
          "creator": 'did:v1:test:1234' + '#key-1',
          "signatureValue": "ABCDEF0123456789abcdef=="
        }
      },
      schema: {
        name: {
          icon: 'fas fa-user'
        },
        email: {
          icon: 'fa fa-envelope'
        },
        phone: {
          icon: 'fa fa-mobile-alt'
        },
        address: {
          icon: 'fa fa-map-marker-alt',
          streetAddress: {
            icon: ''
          },
          addressCountry: {
            icon: ''
          },
          addressLocality: {
            icon: ''
          },
          addressRegion: {
            icon: ''
          },
          postalCode: {
            icon: ''
          }
        },
      }
    };
  },
  methods: {
    share(event) {
      console.log('share', event);
    },
    show(event) {
      console.log('show', event);
    }
  }
};
</script>
<style>
</style>
