import type {
	IDataObject,
	IExecuteFunctions,
	INodeExecutionData,
	INodeProperties,
} from 'n8n-workflow';

export const createCustomer = {
	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];

		for (let i = 0; i < items.length; i++) {
			try {
				const body = this.getNodeParameter('additionalFields', i, {}) as IDataObject;

				const response = await this.helpers.httpRequest({
					method: 'POST',
					url: '/api/bot/customers',
					body,
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
	},

	properties: [
		{
			displayName: 'Additional Fields',
			name: 'additionalFields',
			type: 'collection',
			placeholder: 'Add Field',
			default: {},
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
			],
		},
	] as INodeProperties[],
};
