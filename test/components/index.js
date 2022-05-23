/*!
 * Copyright (c) 2018-2022 Digital Bazaar, Inc. All rights reserved.
 */
// import * as brQuasar from '@bedrock/quasar';
// import {config} from '@bedrock/web';
import * as brVue from '@bedrock/vue';
import {default as iconSet} from 'quasar/icon-set/fontawesome-v5.js';
import Quasar from 'quasar';
import Vue from 'vue';
import VueRouter from 'vue-router';

import './app.less';
import '@bedrock/web-fontawesome';

// FIXME: make configurable
Vue.config.devtools = true;

// install all plugins
Vue.use(brVue);

brVue.setRootVue(async () => {
  // replace default `br-root` with a custom one
  // eslint-disable-next-line vue/component-definition-name-casing
  Vue.component('br-root', () => import('./BrRoot.vue'));

  const router = new VueRouter({
    mode: 'history',
    routes: [{
      path: '/',
      component: () => import('./TestHome.vue'),
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
  return new BrApp({router});
});
