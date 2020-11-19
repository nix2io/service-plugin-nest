/*
 * File: NestPlugin.ts
 * Created: 11/19/2020 11:34:00
 * ----
 * Copyright: 2020 Nix² Technologies
 * Author: Max Koon (maxk@nix2.io)
 */

import { Service, ServicePlugin } from '@nix2/service-core';

import { NestService } from '..';

/**
 * Class to represent a GraphQL plugin.
 * @class GraphQLPlugin
 */
export default class NestPlugin extends ServicePlugin {
    static NAME = 'nestjs';
    static LABEL = 'Nest.js';

    /**
     * Return the services for the GraphQL Plugin.
     * @function getServices
     * @memberof NestPlugin
     * @static
     * @returns {typeof Service[]} GraphQL Service.
     */
    static getServices(): typeof Service[] {
        // @ts-expect-error The `NestService` does not have a `type` param so it does not match that shape of `Service`.
        return [NestService];
    }
}
