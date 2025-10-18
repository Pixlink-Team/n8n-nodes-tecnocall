import { NodeConnectionTypes, type INodeType, type INodeTypeDescription } from 'n8n-workflow';
import { createCustomer } from './customer/createCustomer';

export class Tecnocall implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Tecnocall',
		name: 'tecnocall',
		icon: { light: 'file:../../icons/tecnocall.svg', dark: 'file:../../icons/tecnocall.dark.svg' },
		group: ['input'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Consume issues from the Tecnocall API',
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
			},
		},
		properties: [],
	};

	methods = {
		listSearch: {
			createCustomer,
		},
	};
}
