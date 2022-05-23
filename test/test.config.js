/*!
 * Copyright (c) 2018-2022 Digital Bazaar, Inc. All rights reserved.
 */
import {config} from '@bedrock/core';
import path from 'path';
import '@bedrock/karma';

config.karma.suites['bedrock-vue-credential-card'] =
  path.join('web', '**', '*.js');
config.karma.config.proxies = {
  '/': 'https://localhost:18443'
};
config.karma.config.proxyValidateSSL = false;
