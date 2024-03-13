/*!
 * Copyright (c) 2018-2024 Digital Bazaar, Inc. All rights reserved.
 */
import {createApp} from 'vue';
import {CredentialCard} from '@bedrock/vue-credential-card';
import iconSet from 'quasar/icon-set/fontawesome-v5.mjs';
import {Quasar} from 'quasar';

function tearDown(app) {
  return app.unmount();
}

function _createApp({propsData = {}}) {
  const app = createApp(CredentialCard, propsData);
  app.use(Quasar);
  Quasar.iconSet.set(iconSet);
  return app;
}

// helper function that mounts and returns the rendered text
function renderCredentialCard({app = null, propsData = {}}) {
  if(!app) {
    app = _createApp({propsData});
  }
  const vm = app.mount('*');
  return {app, vm};
}

describe('CredentialCard', () => {
  it('should render content if type of value is a string in credential ' +
    'subject', async () => {
    const {app, vm} = renderCredentialCard({propsData: {
      credential: {
        credentialSubject: {
          name: 'John Doe',
        },
        type: ['TestCredential'],
        description: 'Test description',
        image: 'http://example.com/some-image.png'
      },
      schema: {
        name: {
          name: 'Full Name',
          icon: 'fas fa-user',
          valueMapper: name => name
        }
      }
    }});
    should.exist(vm);
    should.exist(vm.$el);
    vm.$el.querySelector('.g-field-data-regular div:nth-child(2)')
      .textContent.trim().should.equal('John Doe');
    tearDown(app);
  });

  it('should not render content if type of value in credential ' +
    'subject is null or undefined', async () => {
    const valueTypes = [undefined, null];

    for(const value of valueTypes) {
      const {app, vm} = renderCredentialCard({propsData: {
        credential: {
          credentialSubject: {
            name: value,
          },
          type: ['TestCredential'],
          description: 'Test description',
          image: 'http://example.com/some-image.png'
        },
        schema: {
          name: {
            name: 'Full Name',
            icon: 'fas fa-user'
          }
        }
      }});
      should.exist(vm);
      should.exist(vm.$el);
      should.not.exist(vm.$el.querySelector('.g-field-data-regular'));
      tearDown(app);
    }
  });

  it('should render content if type of value in credential ' +
    'subject is a number, NaN, or boolean', async () => {
    const valueTypes = [ NaN, 0, false];

    for(const value of valueTypes) {
      const {app, vm} = renderCredentialCard({propsData: {
        credential: {
          credentialSubject: {
            name: value,
          },
          type: ['TestCredential'],
          description: 'Test description',
          image: 'http://example.com/some-image.png'
        },
        schema: {
          name: {
            name: 'Full Name',
            icon: 'fas fa-user'
          }
        }
      }});
      should.exist(vm);
      should.exist(vm.$el);
      should.exist(vm.$el.querySelector('.g-field-data-regular'));
      tearDown(app);
    }
  });
  it('should render content if type of value in credential ' +
    'subject is an object', async () => {
    const {app, vm} = renderCredentialCard({propsData: {
      credential: {
        credentialSubject: {
          address: {
            streetAddress: '123 Main St.',
            addressCountry: 'US',
            addressLocality: 'Chicago',
            addressRegion: 'IL',
            postalCode: '60610-2949'
          }
        },
        type: ['TestCredential'],
        description: 'Test description',
        image: 'http://example.com/some-image.png'
      },
      schema: {
        address: {
          name: 'Address',
          icon: 'fa fa-map-marker-alt',
          sublabels: true
        }
      }
    }});
    should.exist(vm);
    should.exist(vm.$el);
    should.exist(vm.$el.querySelector('.g-field-data-regular'));
    tearDown(app);
  });
});
