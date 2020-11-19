import {
    APP_CONTROLLER_TEMPLATE,
    APP_MODULE_TEMPLATE,
    APP_SERVICE_TEMPLATE,
    MAIN_TEMPLATE,
} from '../templates';
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
import {
    PackageJSONType,
    TypescriptService,
} from '@nix2/service-plugin-typescript';

import { NestServiceType } from '..';
import { join } from 'path';
import { writeFileSync } from 'fs';

/**
 * Class for representing a Nest.js Service.
 * @class NestService
 */
export default class NestService extends TypescriptService {
    static NAME = 'nest';
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

    /**
     * NestJS specific dependencies.
     * @function dependencies
     * @memberof NestService
     * @returns {Record<string, string>} Object of package name and version.
     */
    get dependencies(): Record<string, string> {
        return {
            ...super.dependencies,
            ...{
                '@nestjs/common': '^7.5.1',
                '@nestjs/core': '^7.5.1',
                '@nestjs/platform-express': '^7.5.1',
                'reflect-metadata': '^0.1.13',
                rimraf: '^3.0.2',
                rxjs: '^6.6.3',
            },
        };
    }

    /**
     * NestJS specific dev-dependencies.
     * @function devDependencies
     * @memberof NestService
     * @returns {Record<string, string>} Object of package name and version.
     */
    get devDependencies(): Record<string, string> {
        return {
            ...super.dependencies,
            ...{
                '@nestjs/cli': '^7.5.1',
                '@nestjs/schematics': '^7.1.3',
                '@nestjs/testing': '^7.5.1',
                '@types/express': '^4.17.8',
                '@types/jest': '^26.0.15',
                '@types/supertest': '^2.0.10',
                jest: '^26.6.3',
                supertest: '^6.0.0',
                'ts-jest': '^26.4.3',
                'ts-loader': '^8.0.8',
                'ts-node': '^9.0.0',
                'tsconfig-paths': '^3.9.0',
            },
        };
    }

    /**
     * Object of the scripts.
     * @function scripts
     * @memberof NestService
     * @returns {Record<string, string>} Object of the scripts.
     */
    get scripts(): Record<string, string> {
        return {
            ...super.scripts,
            ...{
                prebuild: 'rimraf dist',
                build: 'nest build',
                format: 'prettier --write "src/**/*.ts" "test/**/*.ts"',
                start: 'nest start',
                'start:dev': 'nest start --watch',
                'start:debug': 'nest start --debug --watch',
                'start:prod': 'node dist/main',
                lint: 'eslint "{src,apps,libs,test}/**/*.ts" --fix',
                test: 'jest',
                'test:watch': 'jest --watch',
                'test:cov': 'jest --coverage',
                'test:debug':
                    'node --inspect-brk -r tsconfig-paths/register -r ts-node/register node_modules/.bin/jest --runInBand',
                'test:e2e': 'jest --config ./test/jest-e2e.json',
            },
        };
    }

    /**
     * Construct a package.json object.
     * @function makePackageContent
     * @memberof Typescript
     * @returns {PackageJSONType} Package.json object.
     */
    makePackageContent(): PackageJSONType {
        return {
            ...super.makePackageContent(),
            ...{
                jest: {
                    moduleFileExtensions: ['js', 'json', 'ts'],
                    rootDir: 'src',
                    testRegex: '.*\\.spec\\.ts$',
                    transform: {
                        '^.+\\.(t|j)s$': 'ts-jest',
                    },
                    collectCoverageFrom: ['**/*.(t|j)s'],
                    coverageDirectory: '../coverage',
                    testEnvironment: 'node',
                },
            },
        };
    }

    /**
     * Create the `nest-cli.json` file.
     * @function createNestCLIJSON
     * @memberof NestService
     * @returns {void}
     */
    createNestCLIJSON(): void {
        writeFileSync(
            join(this.serviceDirectory, 'nest-cli.json'),
            JSON.stringify(
                {
                    collection: '@nestjs/schematics',
                    sourceRoot: 'src',
                },
                null,
                4,
            ),
        );
    }

    /**
     * Runs the post initialization commands.
     *
     * 1. Calls Typescript post init commands.
     *    These can be found at: https://nix2io.github.io/service-plugin-typescript/classes/_classes_typescriptservice_.typescriptservice.html#postinit
     * 2. Create nest-cli.json.
     * @function postInit
     * @memberof NestService
     * @returns {void}
     */
    postInit(): void {
        super.postInit();
        this.createNestCLIJSON();
    }

    /**
     * Create the initial app.
     *
     * This does not call the parent method because nest uses `main.ts`, rather than `index.ts`.
     */
    createSourceFiles(): void {
        const sourceDir = this.createSourceDirectory();
        // Create the main.ts
        writeFileSync(join(sourceDir, 'main.ts'), MAIN_TEMPLATE);
        // app.module.ts
        writeFileSync(join(sourceDir, 'app.module.ts'), APP_MODULE_TEMPLATE);
        writeFileSync(join(sourceDir, 'app.service.ts'), APP_SERVICE_TEMPLATE);
        writeFileSync(
            join(sourceDir, 'app.controller.ts'),
            APP_CONTROLLER_TEMPLATE,
        );
    }
}
