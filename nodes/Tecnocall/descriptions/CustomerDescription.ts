/**
 * Properties for Customer operations
 */

import type { INodeProperties } from 'n8n-workflow';

export const customerOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['customer'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create a new customer',
				action: 'Create a customer',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get a customer by ID',
				action: 'Get a customer',
			},
			{
				name: 'Get Many',
				value: 'getAll',
				description: 'Get many customers',
				action: 'Get many customers',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update a customer',
				action: 'Update a customer',
			},
		],
		default: 'create',
		required: true,
	},
];

export const customerFields: INodeProperties[] = [
	// ========================================
	//         Customer: create
	// ========================================
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['customer'],
				operation: ['create'],
			},
		},
		options: [
			{
				displayName: 'Agent Code',
				name: 'agent_code',
				type: 'string',
				default: '',
				description: 'Agent code associated with the customer',
			},
			{
				displayName: 'Email',
				name: 'email',
				type: 'string',
				placeholder: 'name@email.com',
				default: '',
				description: 'Customer email address',
			},
			{
				displayName: 'Name',
				name: 'name',
				type: 'string',
				default: '',
				description: 'Customer full name',
			},
			{
				displayName: 'Phone',
				name: 'phone',
				type: 'string',
				default: '',
				description: 'Customer phone number',
			},
			{
				displayName: 'Source ID',
				name: 'source_id',
				type: 'number',
				default: 0,
				description: 'Source identifier for the customer (e.g., website, app)',
			},
			{
				displayName: 'Username',
				name: 'username',
				type: 'string',
				default: '',
				description: 'Customer username',
			},
		],
	},

	// ========================================
	//         Customer: get
	// ========================================
	{
		displayName: 'Customer ID',
		name: 'customerId',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['customer'],
				operation: ['get'],
			},
		},
		description: 'ID of the customer to retrieve',
	},

	// ========================================
	//         Customer: getAll
	// ========================================
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				resource: ['customer'],
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
				resource: ['customer'],
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
				resource: ['customer'],
				operation: ['getAll'],
			},
		},
		options: [
			{
				displayName: 'Search',
				name: 'search',
				type: 'string',
				default: '',
				description: 'Search customers by name, email, or phone',
			},
			{
				displayName: 'Agent Code',
				name: 'agent_code',
				type: 'string',
				default: '',
				description: 'Filter by agent code',
			},
			{
				displayName: 'Source ID',
				name: 'source_id',
				type: 'number',
				default: 0,
				description: 'Filter by source ID',
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
		],
	},

	// ========================================
	//         Customer: update
	// ========================================
	{
		displayName: 'Customer ID',
		name: 'customerId',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['customer'],
				operation: ['update'],
			},
		},
		description: 'ID of the customer to update',
	},
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['customer'],
				operation: ['update'],
			},
		},
		options: [
			{
				displayName: 'Agent Code',
				name: 'agent_code',
				type: 'string',
				default: '',
				description: 'Agent code associated with the customer',
			},
			{
				displayName: 'Email',
				name: 'email',
				type: 'string',
				placeholder: 'name@email.com',
				default: '',
				description: 'Customer email address',
			},
			{
				displayName: 'Name',
				name: 'name',
				type: 'string',
				default: '',
				description: 'Customer full name',
			},
			{
				displayName: 'Phone',
				name: 'phone',
				type: 'string',
				default: '',
				description: 'Customer phone number',
			},
			{
				displayName: 'Source ID',
				name: 'source_id',
				type: 'number',
				default: 0,
				description: 'Source identifier for the customer',
			},
			{
				displayName: 'Username',
				name: 'username',
				type: 'string',
				default: '',
				description: 'Customer username',
			},
		],
	},
];
