/*!
 * Copyright (c) 2015-2018 Digital Bazaar, Inc. All rights reserved.
 */
'use strict';

import * as brVue from 'bedrock-vue';
import Vue from 'vue';
import VueRouter from 'vue-router';

// FIXME: make configurable
Vue.config.devtools = true;

// install all plugins
Vue.use(brVue);

brVue.setRootVue(async () => {
  // load dynamic imports in parallel
  const [
    Quasar,
    {default: iconSet}
  ] = await Promise.all([
    import('bedrock-quasar'),
    import('quasar'),
    import('quasar/icon-set/fontawesome-v5')
  ]);

  // replace default `br-root` with a custom one
  // eslint-disable-next-line vue/component-definition-name-casing
  Vue.component('br-root', () => import('./BrRoot.vue'));

  const router = new VueRouter({
    mode: 'history',
    routes: [{
      path: '/',
      component: () => import('./Home.vue'),
      meta: {title: 'Credential Card'}
    }]
  });

  // configure quasar
  //iconSet.credentialCard = {defaultImage: 'fas fa-check'};
  Quasar.iconSet.set(iconSet);
  // await brQuasar.theme({
  //   Quasar,
  //   brand: {
  //     primary: '#xxxxxx'
  //   }
  // });

  const BrApp = Vue.component('br-app');
  return new BrApp({
    router
  });
});
