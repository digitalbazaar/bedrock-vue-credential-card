/*!
 * Copyright (c) 2018-2022 Digital Bazaar, Inc. All rights reserved.
 */
export {default as CredentialCard} from '../components/CredentialCard.vue';
export {default as CredentialBase} from '../components/CredentialBase.vue';
export {default as CredentialDetail} from '../components/CredentialDetail.vue';

export {default as CredentialSwitch} from '../components/CredentialSwitch.vue';
export {default as CredentialCardList} from
  '../components/CredentialCardList.vue';
export {default as CredentialCardDetail} from
  '../components/CredentialCardDetail.vue';

export const registerComponent = async ({
  app, component, name = '', prefix = ''
}) => {
  app.component(`${prefix}${name}`, component);
};

export const registerComponents = async ({app, components}) => {
  for(const component of components) {
    await registerComponent({
      app, component: component.value,
      name: component.name, prefix: component.prefix
    });
  }
};
