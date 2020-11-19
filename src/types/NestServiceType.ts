/*
 * File: NestServiceType.ts
 * Created: 11/19/2020 11:56:00
 * ----
 * Copyright: 2020 Nix² Technologies
 * Author: Max Koon (maxk@nix2.io)
 */

import { ServiceType } from '@nix2/service-core';

export default interface NestServiceContextType extends ServiceType {
    type: 'nest';
}
