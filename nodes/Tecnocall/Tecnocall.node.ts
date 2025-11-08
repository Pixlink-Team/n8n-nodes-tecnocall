import {
	NodeConnectionTypes,
	type IExecuteFunctions,
	type INodeExecutionData,
	type INodeType,
	type INodeTypeDescription,
} from 'n8n-workflow';

import { router } from './router';
import { customerOperations, customerFields } from './descriptions/CustomerDescription';
import { communicationOperations, communicationFields } from './descriptions/CommunicationDescription';
import { sourceOperations, sourceFields } from './descriptions/SourceDescription';

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
						name: 'Source',
						value: 'source',
					},
				],
				default: 'customer',
				required: true,
			},
			...customerOperations,
			...communicationOperations,
			...sourceOperations,
			...customerFields,
			...communicationFields,
			...sourceFields,
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		return await router.call(this);
	}
}
