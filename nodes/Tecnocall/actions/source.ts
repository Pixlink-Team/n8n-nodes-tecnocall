/**
 * Source operations handler
 */

import type { IExecuteFunctions, INodeExecutionData, IDataObject } from 'n8n-workflow';
import { NodeOperationError } from 'n8n-workflow';
import { tecnocallApiRequest, buildQueryString } from '../utils';

/**
 * Get all sources
 */
export async function getAllSources(
	this: IExecuteFunctions,
	index: number,
): Promise<INodeExecutionData[]> {
	try {
		const returnAll = this.getNodeParameter('returnAll', index, false) as boolean;

		const qs = buildQueryString({
			limit: returnAll ? 1000 : (this.getNodeParameter('limit', index, 50) as number),
		});

		const response = await tecnocallApiRequest.call(this, {
			method: 'GET',
			endpoint: '/api/bot/sources',
			qs,
		}, index);

		// Handle different response formats
		let sources: IDataObject[] = [];
		if (Array.isArray(response)) {
			sources = response;
		} else if (response.data && Array.isArray(response.data)) {
			sources = response.data as IDataObject[];
		} else {
			sources = [response];
		}

		return sources.map((source) => ({
			json: source,
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
			`Failed to get sources: ${(error as Error).message}`,
			{ itemIndex: index },
		);
	}
}
