/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

import { ConfigurePortalDateArg, CreateUserInBackendArg } from '../types';
import { createUserInBackend } from './createUserInBackend';
import { configurePortalDate } from './configurePortalDate';

/**
 * @type {Cypress.PluginConfig}
 */
module.exports = (
  on: Cypress.PluginEvents,
  config: Cypress.PluginConfigOptions
): void | Cypress.ConfigOptions | Promise<Cypress.ConfigOptions> => {
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config
  on('task', {
    createUserInBackend: async (arg: CreateUserInBackendArg) => createUserInBackend(arg, config),
    configurePortalDate: async (arg: ConfigurePortalDateArg) => configurePortalDate(arg, config),
  });
};
