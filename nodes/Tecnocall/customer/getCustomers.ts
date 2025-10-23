import type {
	IDataObject,
	IExecuteFunctions,
	INodeExecutionData,
	INodeProperties,
} from 'n8n-workflow';

export async function getCustomers(
	this: IExecuteFunctions,
): Promise<INodeExecutionData[][]> {
	const items = this.getInputData();
	const returnData: INodeExecutionData[] = [];

	for (let i = 0; i < items.length; i++) {
		try {
			const limit = this.getNodeParameter('limit', i, 50) as number;
			const filters = this.getNodeParameter('filters', i, {}) as IDataObject;

			const response = await this.helpers.httpRequest({
				method: 'GET',
				url: '/api/bot/customers',
				qs: {
					limit,
					...filters,
				},
			});

			const customers = Array.isArray(response) ? response : [response];
			
			for (const customer of customers) {
				returnData.push({
					json: customer as IDataObject,
					pairedItem: { item: i },
				});
			}
		} catch (error) {
			if (this.continueOnFail()) {
				returnData.push({
					json: { error: (error as Error).message },
					pairedItem: { item: i },
				});
				continue;
			}
			throw error;
		}
	}

	return [returnData];
}

export const getCustomersProperties: INodeProperties[] = [
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		default: 50,
		description: 'Max number of results to return',
		displayOptions: {
			show: {
				resource: ['customer'],
				operation: ['getCustomers'],
			},
		},
		typeOptions: {
			minValue: 1,
			maxValue: 1000,
		},
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
				operation: ['getCustomers'],
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
		],
	},
];
