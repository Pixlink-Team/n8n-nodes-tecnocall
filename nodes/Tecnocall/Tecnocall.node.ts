import {
	NodeConnectionTypes,
	type IExecuteFunctions,
	type ILoadOptionsFunctions,
	type INodeListSearchResult,
	type INodeExecutionData,
	type INodeType,
	type INodeTypeDescription,
} from 'n8n-workflow';

import { router } from './router';
import { customerOperations, customerFields } from './descriptions/CustomerDescription';
import { communicationOperations, communicationFields } from './descriptions/CommunicationDescription';
import { sourceOperations, sourceFields } from './descriptions/SourceDescription';
import { statusOperations, statusFields } from './descriptions/StatusDescription';
import { productOperations, productFields } from './descriptions/ProductDescription';
import { tecnocallApiRequest } from './utils';

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
						name: 'Communication',
						value: 'communication',
					},
					{
						name: 'Customer',
						value: 'customer',
					},
					{
						name: 'Product',
						value: 'product',
					},
					{
						name: 'Source',
						value: 'source',
					},
					{
						name: 'Status',
						value: 'status',
					},
				],
				default: 'customer',
				required: true,
			},
			...customerOperations,
			...communicationOperations,
			...sourceOperations,
			...statusOperations,
			...productOperations,
			...customerFields,
			...communicationFields,
			...sourceFields,
			...statusFields,
			...productFields,
		],
	};

	methods = {
		listSearch: {
			async sourceSearch(
				this: ILoadOptionsFunctions,
			): Promise<INodeListSearchResult> {
				const response = await tecnocallApiRequest.call(this as unknown as IExecuteFunctions, {
					method: 'GET',
					endpoint: '/api/bot/sources',
				});
				const sources = Array.isArray(response.data) ? response.data : [];
				return {
					results: sources.map((source: import('./types').TecnocallSource) => ({
						name: source.name || `Source ${source.id}`,
						value: String(source.id),
					})),
				};
			},
			async statusSearch(
				this: ILoadOptionsFunctions,
			): Promise<INodeListSearchResult> {
				const response = await tecnocallApiRequest.call(this as unknown as IExecuteFunctions, {
					method: 'GET',
					endpoint: '/api/bot/statuses',
				});
				const statuses = Array.isArray(response.data) ? response.data : [];
				return {
					results: statuses.map((status: import('./types').TecnocallStatus) => ({
						name: status.name || `Status ${status.id}`,
						value: String(status.id),
					})),
				};
			},
			async productSearch(
				this: ILoadOptionsFunctions,
			): Promise<INodeListSearchResult> {
				const response = await tecnocallApiRequest.call(this as unknown as IExecuteFunctions, {
					method: 'GET',
					endpoint: '/api/bot/products',
				});
				const products = Array.isArray(response.data) ? response.data : [];
				return {
					results: products.map((product: import('./types').TecnocallProduct) => ({
						name: product.name || `Product ${product.id}`,
						value: String(product.id),
					})),
				};
			},
		},
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		return await router.call(this);
	}
}
