/**
 * Properties for Source operations
 */

import type { INodeProperties } from 'n8n-workflow';

export const sourceOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['source'],
			},
		},
		options: [
			{
				name: 'Get Many',
				value: 'getAll',
				description: 'Get many sources',
				action: 'Get many sources',
			},
		],
		default: 'getAll',
		required: true,
	},
];

export const sourceFields: INodeProperties[] = [
	// ========================================
	//         Source: getAll
	// ========================================
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				resource: ['source'],
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
				resource: ['source'],
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
