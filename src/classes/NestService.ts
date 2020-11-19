/*
 * File: NestService.ts
 * Created: 11/19/2020 11:34:00
 * ----
 * Copyright: 2020 Nix² Technologies
 * Author: Max Koon (maxk@nix2.io)
 */
import {
    ExecutionContext,
    Info,
    InitializeServiceDataType,
    Schema,
    SchemaType,
    User,
} from '@nix2/service-core';

import { NestServiceType } from '..';
import { TypescriptService } from '@nix2/service-plugin-typescript';

/**
 * Class for representing a Nest.js Service.
 * @class NestService
 */
export default class NestService extends TypescriptService {
    static NAME = 'nestjs';
    static DIRNAME: string = __dirname;

    /**
     * Constructor for the NestJS service.
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

    /**
     * Deserialize an object into a `NestService` instance.
     * @function deserialize
     * @static
     * @memberof NestService
     * @param   {ExecutionContext} context Execution context.
     * @param   {object}           data    Javascript object of the service.
     * @returns {NestService}              Service instance.
     */
    static deserialize(
        context: ExecutionContext,
        data: NestServiceType,
    ): NestService {
        return new NestService(
            context,
            Info.deserialize(data.info),
            Object.values(data.schemas).map((schema: SchemaType) =>
                Schema.deserialize(schema),
            ),
        );
    }

    /**
     * Make a `NestService` object.
     * @static
     * @param   {InitializeServiceDataType} data Data for the `NestService` objectr.
     * @param   {User}                      user User instance.
     * @returns {NestServiceType}                `NestService` object data.
     */
    static makeObject(
        data: InitializeServiceDataType,
        user: User | null,
    ): NestServiceType {
        return {
            ...super.makeObject(data, user),
            ...{
                type: 'nest',
            },
        };
    }

    /**
     * Serialize a `NestService` instance into an object.
     * @function serialize
     * @memberof NestService
     * @returns {NestServiceType} Javascript object.
     */
    serialize(): NestServiceType {
        return {
            ...super.serialize(),
            ...{
                type: 'nest',
            },
        };
    }
}
