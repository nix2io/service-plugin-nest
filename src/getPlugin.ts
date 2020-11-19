/*
 * File: getPlugin.ts
 * Created: 11/19/2020 11:34:00
 * ----
 * Copyright: 2020 Nix² Technologies
 * Author: Max Koon (maxk@nix2.io)
 */

import { NestPlugin } from '.';
import { ServicePlugin } from '@nix2/service-core';

/**
 * Return the plugin.
 * @returns {ServicePlugin} Nest Plugin.
 */
export default (): ServicePlugin => NestPlugin;
