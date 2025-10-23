import type {
	IDataObject,
	IExecuteFunctions,
	INodeExecutionData,
	INodeProperties,
} from 'n8n-workflow';

export async function createCommunication(
	this: IExecuteFunctions,
): Promise<INodeExecutionData[][]> {
	const items = this.getInputData();
	const returnData: INodeExecutionData[] = [];

	for (let i = 0; i < items.length; i++) {
		try {
			const credentials = await this.getCredentials('tecnocallApi');
			
			const type = this.getNodeParameter('type', i) as string;
			const agentCode = this.getNodeParameter('agentCode', i) as string;
			const customerCode = this.getNodeParameter('customerCode', i) as string;
			const data = this.getNodeParameter('data', i) as string;

			// Parse data if it's a JSON string
			let parsedData: IDataObject;
			try {
				parsedData = JSON.parse(data);
			} catch (error) {
				throw new Error(`Invalid JSON in data field: ${(error as Error).message}`);
			}

			const baseUrl = (credentials.baseUrl as string).replace(/\/$/, '');
			const url = `${baseUrl}/api/bot/communications`;

			const body = {
				type,
				agentCode,
				customerCode,
				data: parsedData,
			};

			const response = await this.helpers.httpRequest({
				method: 'POST',
				url,
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
					Authorization: `Bearer ${credentials.botToken as string}`,
				},
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
}

export const createCommunicationProperties: INodeProperties[] = [
	{
		displayName: 'Type',
		name: 'type',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['communication'],
				operation: ['createCommunication'],
			},
		},
		description: 'Type of the communication',
	},
	{
		displayName: 'Agent Code',
		name: 'agentCode',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['communication'],
				operation: ['createCommunication'],
			},
		},
		description: 'Code of the agent',
	},
	{
		displayName: 'Customer Code',
		name: 'customerCode',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['communication'],
				operation: ['createCommunication'],
			},
		},
		description: 'Code of the customer',
	},
	{
		displayName: 'Data',
		name: 'data',
		type: 'json',
		default: '{}',
		required: true,
		displayOptions: {
			show: {
				resource: ['communication'],
				operation: ['createCommunication'],
			},
		},
		description: 'Communication data in JSON format',
	},
];
