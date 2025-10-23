import type { ILoadOptionsFunctions, INodeParameters } from 'n8n-workflow';

export async function getCustomers(this: ILoadOptionsFunctions): Promise<INodeParameters> {
	const response = await this.helpers.httpRequest({
		method: 'GET',
		url: '/api/bot/customers',
	});
	return {
		results: response.data,
	};
}
