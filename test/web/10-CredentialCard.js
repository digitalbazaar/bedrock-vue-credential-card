/*!
 * Copyright (c) 2018 Digital Bazaar, Inc. All rights reserved.
 */
import Vue from 'vue';
import {CredentialCard} from 'bedrock-vue-credential-card';

// helper function that mounts and returns the rendered text
function renderCredentialCard(propsData) {
  const Constructor = Vue.extend(CredentialCard);
  return new Constructor({propsData}).$mount();
}

describe('CredentialCard', () => {
  it('should render content if type of value is not falsy in credential' +
    'subject', async () => {
    const vm = renderCredentialCard({
      credential: {
        credentialSubject: {
          birthCountry: 'Mexico',
        },
        type: ['TestCredential'],
        description: 'Test description',
        image: 'http://example.com/some-image.png'
      },
      schema: {
        birthCountry: {
          name: 'Birth Country'
        }
      }
    });
    should.exist(vm);
    should.exist(vm.$el);
    vm.$el.querySelector(
      '.q-item__section.g-field-data-regular.q-item__section--main')
      .textContent.trim().should.equal('Mexico');
  });

  it('should not render content if type of value is falsy in credential' +
    'subject', async () => {
    const valueTypes = ['', NaN, 0, null, false, undefined];

    for(const value of valueTypes) {
      const vm = renderCredentialCard({
        credential: {
          credentialSubject: {
            birthCountry: value,
          },
          type: ['TestCredential'],
          description: 'Test description',
          image: 'http://example.com/some-image.png'
        },
        schema: {
          birthCountry: {
            name: 'Birth Country'
          }
        }
      });
      should.exist(vm);
      should.exist(vm.$el);
      should.not.exist(vm.$el.querySelector(
        '.q-item__section.g-field-data-regular.q-item__section--main')
      );
    }
  });
});
