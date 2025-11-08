/**
 * Properties for Communication operations
 */

import type { INodeProperties } from 'n8n-workflow';

export const communicationOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['communication'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create a new communication',
				action: 'Create a communication',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get a communication by ID',
				action: 'Get a communication',
			},
			{
				name: 'Get Many',
				value: 'getAll',
				description: 'Get many communications',
				action: 'Get many communications',
			},
		],
		default: 'create',
		required: true,
	},
];

export const communicationFields: INodeProperties[] = [
	// ========================================
	//         Communication: create
	// ========================================
	{
		displayName: 'Type',
		name: 'type',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['communication'],
				operation: ['create'],
			},
		},
		description: 'Type of the communication (e.g., call, message, email)',
	},
	{
		displayName: 'Agent Code',
		name: 'agentCode',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['communication'],
				operation: ['create'],
			},
		},
		description: 'Code of the agent handling the communication',
	},
	{
		displayName: 'Customer Code',
		name: 'customerCode',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['communication'],
				operation: ['create'],
			},
		},
		description: 'Code of the customer involved in the communication',
	},
	{
		displayName: 'Data',
		name: 'data',
		type: 'json',
		default: '{}',
		required: true,
		displayOptions: {
			show: {
				resource: ['communication'],
				operation: ['create'],
			},
		},
		description: 'Communication data in JSON format',
		placeholder: '{ "message": "Hello", "duration": 120 }',
	},

	// ========================================
	//         Communication: get
	// ========================================
	{
		displayName: 'Communication ID',
		name: 'communicationId',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['communication'],
				operation: ['get'],
			},
		},
		description: 'ID of the communication to retrieve',
	},

	// ========================================
	//         Communication: getAll
	// ========================================
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				resource: ['communication'],
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
				resource: ['communication'],
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
	{
		displayName: 'Filters',
		name: 'filters',
		type: 'collection',
		placeholder: 'Add Filter',
		default: {},
		displayOptions: {
			show: {
				resource: ['communication'],
				operation: ['getAll'],
			},
		},
		options: [
			{
				displayName: 'Agent Code',
				name: 'agent_code',
				type: 'string',
				default: '',
				description: 'Filter by agent code',
			},
			{
				displayName: 'Customer Code',
				name: 'customer_code',
				type: 'string',
				default: '',
				description: 'Filter by customer code',
			},
			{
				displayName: 'Page',
				name: 'page',
				type: 'number',
				default: 1,
				typeOptions: {
					minValue: 1,
				},
				description: 'Page number for pagination',
			},
			{
				displayName: 'Type',
				name: 'type',
				type: 'string',
				default: '',
				description: 'Filter by communication type',
			},
		],
	},
];
