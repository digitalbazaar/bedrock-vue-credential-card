<template>
  <q-page
    class="column q-col-gutter-md"
    padding>
    <div class="column items-center">
      <h4>Regular mode</h4>
      <credential-card
        :issuer-map="issuerMap"
        :credential="credential"
        :schema="schema" />
      <h4>Regular mode (Image Override)</h4>
      <credential-card
        :issuer-map="issuerMap"
        :credential="credential"
        :schema="schema">
        <template #image>
          <logo />
        </template>
      </credential-card>
      <h4>Show mode</h4>
      <credential-card
        :issuer-map="issuerMap"
        :credential="credential"
        :schema="schema"
        visibility-toggle />
      <h4>Detail mode</h4>
      <credential-card-detail
        :issuer-map="issuerMap"
        :credential="credential"
        :schema="schema" />
      <h4>List mode</h4>
      <div class="chapi q-px-xl">
        <credential-card-list
          :issuer-map="issuerMap"
          :credential="credential"
          :schema="schema" />
      </div>
    </div>
  </q-page>
</template>
<script>
/*!
 * Copyright (c) 2019 Digital Bazaar, Inc. All rights reserved.
 */
'use strict';

import {
  CredentialCard,
  CredentialCardDetail,
  CredentialCardList
} from 'bedrock-vue-credential-card';
import Logo from './Logo.vue';

const issuer = 'did:v1:test:1234';

export default {
  name: 'Home',
  components: {CredentialCard, CredentialCardDetail, CredentialCardList, Logo},
  data() {
    return {
      credential: {
        '@context': 'https://w3id.org/credentials/v1',
        id: 'urn:uuid:7d43de52-a23b-11e8-8389-d77d791b431c',
        type: ['VerifiableCredential', 'ex:AddressCard'],
        name: 'Example Card',
        description: 'Your verified US name, email, phone number and address',
        issuanceDate: new Date().toJSON(),
        issuer,
        credentialSubject: {
          id: 'did:v1:test:1234',
          name: 'John Doe',
          email: 'john.doe@test.com',
          organizationRegistration: {
            id: 'id',
            status: 'status',
            registrar: 'registrar',
            created: 'created'
          },
          address: {
            streetAddress: '123 Main St.',
            addressCountry: 'US',
            addressLocality: 'Chicago',
            addressRegion: 'IL',
            postalCode: '60610-2949'
          },
          phone: '555-555-5555',
        },
        signature: {
          type: 'Ed25519Signature2018',
          created: new Date().toJSON(),
          creator: 'did:v1:test:1234' + '#key-1',
          signatureValue: 'ABCDEF0123456789abcdef=='
        }
      },
      issuerMap: {
        [issuer]: {
          name: 'Virginia Department of Motor Vehicles',
          image: '/images/issuer-logo.png'
        }
      },
      schema: {
        name: {
          name: 'Full Name',
          icon: 'fas fa-user'
        },
        email: {
          name: 'Email',
          icon: 'fa fa-envelope'
        },
        phone: {
          name: 'Phone',
          icon: 'fa fa-mobile-alt'
        },
        address: {
          name: 'Address',
          icon: 'fa fa-map-marker-alt',
          sublabels: true
        },
        organizationRegistration: {
          id: {
            name: 'ID',
            icon: 'fas fa-fingerprint'
          },
          status: {
            name: 'Status',
            icon: 'fa fa-info'
          },
          registrar: {
            name: 'Registrar',
            icon: 'fa fa-clipboard-check'
          },
          created: {
            name: 'Created',
            icon: 'far fa-clock'
          }
        }
      }
    };
  }
};
</script>
<style>

.chapi {
  max-width: 600px;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.2)
}
</style>
