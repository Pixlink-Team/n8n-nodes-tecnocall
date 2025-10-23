import {
	NodeConnectionTypes,
	NodeOperationError,
	type IExecuteFunctions,
	type INodeExecutionData,
	type INodeType,
	type INodeTypeDescription,
} from 'n8n-workflow';
import { createCustomer, createCustomerProperties } from './customer/createCustomer';
import { getCustomers, getCustomersProperties } from './customer/getCustomers';

export class Tecnocall implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Tecnocall',
		name: 'tecnocall',
		icon: { light: 'file:../../icons/tecnocall.svg', dark: 'file:../../icons/tecnocall.dark.svg' },
		group: ['input'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Tecnocall API',
		defaults: {
			name: 'Tecnocall',
		},
		usableAsTool: true,
		inputs: [NodeConnectionTypes.Main],
		outputs: [NodeConnectionTypes.Main],
		credentials: [
			{
				name: 'tecnocallApi',
				required: true,
			},
		],
		requestDefaults: {
			baseURL: '={{$credentials?.baseUrl}}',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				Authorization: '=Bearer {{$credentials?.botToken}}',
			},
		},
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Customer',
						value: 'customer',
					},
				],
				default: 'customer',
				required: true,
			},
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
						value: 'createCustomer',
						description: 'Create a new customer',
						action: 'Create a customer',
					},
					{
						name: 'Get',
						value: 'getCustomers',
						description: 'Get all customers',
						action: 'Get customers',
					},
				],
				default: 'createCustomer',
				required: true,
			},
			...createCustomerProperties,
			...getCustomersProperties,
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const resource = this.getNodeParameter('resource', 0) as string;
		const operation = this.getNodeParameter('operation', 0) as string;

		if (resource === 'customer') {
			if (operation === 'createCustomer') {
				return await createCustomer.call(this);
			}
			if (operation === 'getCustomers') {
				return await getCustomers.call(this);
			}
		}

		throw new NodeOperationError(
			this.getNode(),
			`The operation "${operation}" is not supported for resource "${resource}"`,
		);
	}
}
