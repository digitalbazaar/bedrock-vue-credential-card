<template>
  <q-page
    class="column gutter-md"
    padding>
    <div class="column items-center">
      <h4>Regular mode</h4>
      <credential-card
        :credential="credential"
        :schema="schema"></credential-card>
      <h4>Show mode</h4>
      <credential-card
        :credential="credential"
        :schema="schema"
        visibility-toggle></credential-card>
      <h4>Detail mode</h4>
      <credential-card-detail
        :credential="credential"
        :schema="schema"></credential-card-detail>
    </div>
  </q-page>
</template>
<script>
/*!
 * Copyright (c) 2018 Digital Bazaar, Inc. All rights reserved.
 */
'use strict';

import {CredentialCard} from 'bedrock-vue-credential-card';
import {CredentialCardDetail} from 'bedrock-vue-credential-card';

export default {
  name: 'Home',
  components: {CredentialCard, CredentialCardDetail},
  data() {
    return {
      credential: {
        "@context": 'https://w3id.org/credentials/v1',
        "id": 'urn:uuid:7d43de52-a23b-11e8-8389-d77d791b431c',
        "type": ["VerifiableCredential", "ex:AddressCard"],
        "name": "Example Card",
        "description": "Your verified US name, email, phone number and address",
        "issuanceDate": new Date().toJSON(),
        "issuer": 'did:v1:test:1234',
        "issuerName": 'Virginia Department of Motor Vehicles',       
        "issuerLogo": '/images/issuer-logo.png',
        "image": '/images/credential-image.png',
        "credentialSubject": {
          "id": 'did:v1:test:1234',
          "name": "John Doe",
          "email": 'john.doe@test.com',
          "address": {
            "streetAddress": "123 Main St.",
            "addressCountry": "US",
            "addressLocality": "Chicago",
            "addressRegion": "IL",
            "postalCode": "60610-2949"
          },
          "phone": '555-555-5555',
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
          sublabels: true
        }
      }
    };
  },
  methods: {

  }
};
</script>
<style>
</style>
