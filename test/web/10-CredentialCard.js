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
  it('should check something on the rendered element', async () => {
    // TODO: specify propsData
    const vm = renderCredentialCard({
      credential: {
        name: 'Test Credential',
        type: ['TestCredential'],
        description: 'Test description',
        image: 'http://example.com/some-image.png'
      },
      schema: {}
    });
    should.exist(vm);
    should.exist(vm.$el);
    // TODO: $vm.el.something
  });
});
