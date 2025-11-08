/**
 * Router for handling operations
 */

import type { IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';
import { NodeOperationError } from 'n8n-workflow';

// Customer operations
import {
	createCustomer,
	getCustomer,
	getAllCustomers,
	updateCustomer,
} from './actions/customer';

// Communication operations
import {
	createCommunication,
	getCommunication,
	getAllCommunications,
} from './actions/communication';

type OperationHandler = (
	this: IExecuteFunctions,
	index: number,
) => Promise<INodeExecutionData | INodeExecutionData[]>;

interface OperationMap {
	[resource: string]: {
		[operation: string]: OperationHandler;
	};
}

/**
 * Operation router
 * Maps resource + operation to the appropriate handler function
 */
const operationRouter: OperationMap = {
	customer: {
		create: createCustomer,
		get: getCustomer,
		getAll: getAllCustomers,
		update: updateCustomer,
	},
	communication: {
		create: createCommunication,
		get: getCommunication,
		getAll: getAllCommunications,
	},
};

/**
 * Execute the appropriate operation based on resource and operation parameters
 */
export async function router(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
	const items = this.getInputData();
	const returnData: INodeExecutionData[] = [];

	const resource = this.getNodeParameter('resource', 0) as string;
	const operation = this.getNodeParameter('operation', 0) as string;

	// Validate resource and operation
	if (!operationRouter[resource]) {
		throw new NodeOperationError(
			this.getNode(),
			`The resource "${resource}" is not supported`,
			{
				description: `Supported resources are: ${Object.keys(operationRouter).join(', ')}`,
			},
		);
	}

	if (!operationRouter[resource][operation]) {
		throw new NodeOperationError(
			this.getNode(),
			`The operation "${operation}" is not supported for resource "${resource}"`,
			{
				description: `Supported operations for ${resource} are: ${Object.keys(operationRouter[resource]).join(', ')}`,
			},
		);
	}

	// Get the handler for this resource/operation combination
	const handler = operationRouter[resource][operation];

	// Process each input item
	for (let i = 0; i < items.length; i++) {
		try {
			const result = await handler.call(this, i);

			// Handle both single and multiple results
			if (Array.isArray(result)) {
				returnData.push(...result);
			} else {
				returnData.push(result);
			}
		} catch (error) {
			// If continueOnFail is enabled, the error is already handled in the operation
			// Otherwise, rethrow it
			if (!this.continueOnFail()) {
				throw error;
			}
		}
	}

	return [returnData];
}
