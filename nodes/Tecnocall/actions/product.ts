/**
 * Product operations handler
 */

import type { IExecuteFunctions, INodeExecutionData, IDataObject } from 'n8n-workflow';
import { NodeOperationError } from 'n8n-workflow';
import { tecnocallApiRequest, buildQueryString } from '../utils';

/**
 * Get all products
 */
export async function getAllProducts(
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
			endpoint: '/api/bot/products',
			qs,
		}, index);

		// Handle different response formats
		let products: IDataObject[] = [];
		if (Array.isArray(response)) {
			products = response;
		} else if (response.data && Array.isArray(response.data)) {
			products = response.data as IDataObject[];
		} else {
			products = [response];
		}

		return products.map((product) => ({
			json: product,
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
			`Failed to get products: ${(error as Error).message}`,
			{ itemIndex: index },
		);
	}
}
