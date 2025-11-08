/**
 * Communication operations handler
 */

import type { IExecuteFunctions, INodeExecutionData, IDataObject } from 'n8n-workflow';
import { NodeOperationError } from 'n8n-workflow';
import type { CreateCommunicationParams } from '../types';
import { tecnocallApiRequest, buildQueryString, safeJsonParse } from '../utils';

/**
 * Create a new communication
 */
export async function createCommunication(
	this: IExecuteFunctions,
	index: number,
): Promise<INodeExecutionData> {
	try {
		const type = this.getNodeParameter('type', index) as string;
		const agentCode = this.getNodeParameter('agentCode', index) as string;
		const customerCode = this.getNodeParameter('customerCode', index) as string;
		const data = this.getNodeParameter('data', index) as string;

		// Validate required fields
		if (!type || !agentCode || !customerCode) {
			throw new Error('Type, Agent Code, and Customer Code are required');
		}

		// Parse data if it's a JSON string
		let parsedData: IDataObject;
		if (typeof data === 'string') {
			parsedData = safeJsonParse(data);
		} else {
			parsedData = data as IDataObject;
		}

		const body: CreateCommunicationParams = {
			type,
			agent_code: agentCode,
			customer_code: customerCode,
			data: JSON.stringify(parsedData),
		};

		const response = await tecnocallApiRequest.call(this, {
			method: 'POST',
			endpoint: '/api/bot/communications',
			body: body as unknown as IDataObject,
		}, index);

		return {
			json: response,
			pairedItem: { item: index },
		};
	} catch (error) {
		if (this.continueOnFail()) {
			return {
				json: { error: (error as Error).message },
				pairedItem: { item: index },
			};
		}
		throw new NodeOperationError(
			this.getNode(),
			`Failed to create communication: ${(error as Error).message}`,
			{ itemIndex: index },
		);
	}
}

/**
 * Get a communication by ID
 */
export async function getCommunication(
	this: IExecuteFunctions,
	index: number,
): Promise<INodeExecutionData> {
	try {
		const communicationId = this.getNodeParameter('communicationId', index) as string;

		if (!communicationId) {
			throw new Error('Communication ID is required');
		}

		const response = await tecnocallApiRequest.call(this, {
			method: 'GET',
			endpoint: `/api/bot/communications/${communicationId}`,
		}, index);

		return {
			json: response,
			pairedItem: { item: index },
		};
	} catch (error) {
		if (this.continueOnFail()) {
			return {
				json: { error: (error as Error).message },
				pairedItem: { item: index },
			};
		}
		throw new NodeOperationError(
			this.getNode(),
			`Failed to get communication: ${(error as Error).message}`,
			{ itemIndex: index },
		);
	}
}

/**
 * Get all communications with optional filters
 */
export async function getAllCommunications(
	this: IExecuteFunctions,
	index: number,
): Promise<INodeExecutionData[]> {
	try {
		const returnAll = this.getNodeParameter('returnAll', index, false) as boolean;
		const filters = this.getNodeParameter('filters', index, {}) as IDataObject;

		const qs = buildQueryString({
			limit: returnAll ? 1000 : (this.getNodeParameter('limit', index, 50) as number),
			page: filters.page as number,
			type: filters.type as string,
			agent_code: filters.agent_code as string,
			customer_code: filters.customer_code as string,
		});

		const response = await tecnocallApiRequest.call(this, {
			method: 'GET',
			endpoint: '/api/bot/communications',
			qs,
		}, index);

		// Handle different response formats
		let communications: IDataObject[] = [];
		if (Array.isArray(response)) {
			communications = response;
		} else if (response.data && Array.isArray(response.data)) {
			communications = response.data as IDataObject[];
		} else {
			communications = [response];
		}

		return communications.map((communication) => ({
			json: communication,
			pairedItem: { item: index },
		}));
	} catch (error) {
		if (this.continueOnFail()) {
			return [{
				json: { error: (error as Error).message },
				pairedItem: { item: index },
			}];
		}
		throw new NodeOperationError(
			this.getNode(),
			`Failed to get communications: ${(error as Error).message}`,
			{ itemIndex: index },
		);
	}
}
