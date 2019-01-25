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
        "image": 'https://example.org/address.png',
        "credentialSubject": {
          "id": 'did:v1:test:1234',
          "address": {
            "streetAddress": "123 Main St.",
            "addressCountry": "US",
            "addressLocality": "Chicago",
            "addressRegion": "IL",
            "postalCode": "60610-2949"
          }
        },
        "signature": {
          "type": "Ed25519Signature2018",
          "created": new Date().toJSON(),
          "creator": 'did:v1:test:1234' + '#key-1',
          "signatureValue": "ABCDEF0123456789abcdef=="
        }
      },
      schema: {
        streetAddress: {
          name: 'Street'
        },
        addressCountry: {
          name: 'Country'
        },
        addressLocality: {
          name: 'City'
        },
        addressRegion: {
          name: 'State'
        },
        postalCode: {
          name: 'Zip code'
        }
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
