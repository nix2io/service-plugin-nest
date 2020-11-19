/*
 * File: NestService.ts
 * Created: 11/19/2020 11:34:00
 * ----
 * Copyright: 2020 Nix² Technologies
 * Author: Max Koon (maxk@nix2.io)
 */
import { ExecutionContext, Info, Schema } from '@nix2/service-core';

import { TypescriptService } from '@nix2/service-plugin-typescript';

/**
 * Class for representing a Nest.js Service.
 * @class NestService
 */
export default class NestService extends TypescriptService {
    static NAME = 'nestjs';
    static DIRNAME: string = __dirname;

    /**
     * Constructor for the GraphQL service.
     * @param {ExecutionContext} context Path to the service.yaml.
     * @param {Info}             info    Info of the service.
     * @param {Array<Schema>}    schemas List of service schemas.
     */
    constructor(context: ExecutionContext, info: Info, schemas: Schema[]) {
        // You need the any because for some reason,
        // private properties from the service-core are not considered the same.
        // It would be nice to fix this some time in the future but I don't think I can.
        // This is starting to show the limitations of OOP with TS. :/
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        super(context, info as any, 'nest', schemas as any);
    }
}
