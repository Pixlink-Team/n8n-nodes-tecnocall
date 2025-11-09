/**
 * Properties for Settings operations
 */

import type { INodeProperties } from 'n8n-workflow';

export const settingsOperations: INodeProperties[] = [
    {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: {
            show: {
                resource: ['settings'],
            },
        },
        options: [
            {
                name: 'Get Many',
                value: 'getAll',
                description: 'Get many settings',
                action: 'Get many settings',
            },
        ],
        default: 'getAll',
        required: true,
    },
];

export const settingsFields: INodeProperties[] = [
    // ========================================
    //         Settings: getAll
    // ========================================
    {
        displayName: 'Return All',
        name: 'returnAll',
        type: 'boolean',
        default: false,
        displayOptions: {
            show: {
                resource: ['settings'],
                operation: ['getAll'],
            },
        },
        description: 'Whether to return all results or only up to a given limit',
    },
    {
        displayName: 'Limit',
        name: 'limit',
        type: 'number',
        default: 50,
        displayOptions: {
            show: {
                resource: ['settings'],
                operation: ['getAll'],
                returnAll: [false],
            },
        },
        typeOptions: {
            minValue: 1,
            maxValue: 1000,
        },
        description: 'Max number of results to return',
    },
];
