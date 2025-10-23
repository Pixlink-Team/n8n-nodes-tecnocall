import type { ILoadOptionsFunctions, INodeParameters } from 'n8n-workflow';

export async function createCustomer(this: ILoadOptionsFunctions): Promise<INodeParameters> {
	const response = await this.helpers.httpRequest({
		method: 'POST',
		url: '/api/bot/customers',
		body: {
			// Add necessary customer data here
		},
	});
	return {
		results: response.data,
	};
}
