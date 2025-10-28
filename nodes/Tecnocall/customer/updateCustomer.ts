import type {
	IDataObject,
	IExecuteFunctions,
	INodeExecutionData,
	INodeProperties,
} from 'n8n-workflow';

export async function updateCustomer(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
	const items = this.getInputData();
	const returnData: INodeExecutionData[] = [];

	for (let i = 0; i < items.length; i++) {
		try {
			const credentials = await this.getCredentials('tecnocallApi');
			const customerId = this.getNodeParameter('customerId', i) as string;
			const updateFields = this.getNodeParameter('updateFields', i) as IDataObject;

			const baseUrl = (credentials.baseUrl as string).replace(/\/$/, '');
			const url = `${baseUrl}/api/bot/customers/${customerId}`;

			const response = await this.helpers.httpRequest({
				method: 'PUT',
				url,
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
					Authorization: `Bearer ${credentials.botToken as string}`,
				},
				body: updateFields,
			});

			returnData.push({
				json: response as IDataObject,
				pairedItem: { item: i },
			});
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

export const updateCustomerProperties: INodeProperties[] = [
	{
		displayName: 'Customer ID',
		name: 'customerId',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['customer'],
				operation: ['updateCustomer'],
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
				operation: ['updateCustomer'],
			},
		},
		options: [
			{
				displayName: 'Name',
				name: 'name',
				type: 'string',
				default: '',
				description: 'Customer name',
			},
			{
				displayName: 'Phone',
				name: 'phone',
				type: 'string',
				default: '',
				description: 'Customer phone number',
			},
			{
				displayName: 'Email',
				name: 'email',
				type: 'string',
				default: '',
				placeholder: 'name@email.com',
				description: 'Customer email',
			},
			{
				displayName: 'Source',
				name: 'source_id',
				type: 'number',
				default: '',
				placeholder: 'Website',
				description: 'Source of the customer',
			},
		],
	},
];
