<template>
  <q-page
    class="column q-col-gutter-md"
    padding>
    <div class="column items-center">
      <h4>Regular mode</h4>
      <credential-card
        :issuer-map="issuerMap"
        :credential="credential"
        :color="meta.profile.color"
        :schema="schema" />
      <h4>Regular mode (Image Override)</h4>
      <credential-card
        :issuer-map="issuerMap"
        :credential="credential"
        :color="meta.profile.color"
        :schema="schema">
        <template #image>
          <logo />
        </template>
      </credential-card>
      <h4>Show mode</h4>
      <credential-card
        :issuer-map="issuerMap"
        :credential="credential"
        :color="meta.profile.color"
        :schema="schema"
        visibility-toggle />
      <h4>Detail mode</h4>
      <credential-card-detail
        :issuer-map="issuerMap"
        :credential="extendedCredential"
        :schema="schema">
        <template #bottom-left>
          <q-chip
            square
            :style="{'background-color': meta.profile.color}"
            text-color="white"
            class="q-mt-md q-mb-none q-mx-none text-subtitle1">
            <q-icon
              :name="getIcon(meta.profile.type[1])"
              class="q-mr-sm" />
            <span>{{meta.profile.name}}</span>
          </q-chip>
        </template>
      </credential-card-detail>
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

let more = '';
for(let i = 0; i < 200; i++) {
  more += ' more ';
}

export default {
  name: 'Home',
  components: {CredentialCard, CredentialCardDetail, CredentialCardList, Logo},
  data() {
    return {
      meta: {
        profile: {
          name: 'Business',
          color: '#3498DB',
          type: ['Profile', 'Person']
        }
      },
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
        }
      }
    };
  },
  computed: {
    extendedCredential() {
      return Object.assign({}, this.credential, {description: more});
    }
  },
  methods: {
    getIcon(type) {
      if(type === 'Person') {
        return 'fas fa-user-circle';
      }
      if(type === 'Organization') {
        return 'fas fa-building';
      }
    }
  }
};
</script>
<style>

.chapi {
  max-width: 600px;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.2)
}
</style>
