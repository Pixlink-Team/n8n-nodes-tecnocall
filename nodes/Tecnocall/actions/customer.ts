/**
 * Customer operations handler
 */

import type { IExecuteFunctions, INodeExecutionData, IDataObject } from 'n8n-workflow';
import { NodeOperationError } from 'n8n-workflow';
import type { CreateCustomerParams, UpdateCustomerParams, GetCustomersParams } from '../types';
import { tecnocallApiRequest, cleanObject, buildQueryString } from '../utils';

/**
 * Create a new customer
 */
export async function createCustomer(
	this: IExecuteFunctions,
	index: number,
): Promise<INodeExecutionData> {
	try {
		const additionalFields = this.getNodeParameter('additionalFields', index, {}) as IDataObject;

		const body: CreateCustomerParams = cleanObject({
			name: additionalFields.name as string,
			username: additionalFields.username as string,
			phone: additionalFields.phone as string,
			email: additionalFields.email as string,
			agent_code: additionalFields.agent_code as string,
			source_id: additionalFields.source_id as number,
		});

		const response = await tecnocallApiRequest.call(this, {
			method: 'POST',
			endpoint: '/api/bot/customers',
			body: body as IDataObject,
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
			`Failed to create customer: ${(error as Error).message}`,
			{ itemIndex: index },
		);
	}
}

/**
 * Get a customer by ID
 */
export async function getCustomer(
	this: IExecuteFunctions,
	index: number,
): Promise<INodeExecutionData> {
	try {
		const customerId = this.getNodeParameter('customerId', index) as string;

		if (!customerId) {
			throw new Error('Customer ID is required');
		}

		const response = await tecnocallApiRequest.call(this, {
			method: 'GET',
			endpoint: `/api/bot/customers/${customerId}`,
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
			`Failed to get customer: ${(error as Error).message}`,
			{ itemIndex: index },
		);
	}
}

/**
 * Get all customers with optional filters
 */
export async function getAllCustomers(
	this: IExecuteFunctions,
	index: number,
): Promise<INodeExecutionData[]> {
	try {
		const returnAll = this.getNodeParameter('returnAll', index, false) as boolean;
		const filters = this.getNodeParameter('filters', index, {}) as IDataObject;

		const qs: GetCustomersParams = buildQueryString({
			limit: returnAll ? 1000 : (this.getNodeParameter('limit', index, 50) as number),
			page: filters.page as number,
			search: filters.search as string,
			agent_code: filters.agent_code as string,
			source_id: filters.source_id as number,
		});

		const response = await tecnocallApiRequest.call(this, {
			method: 'GET',
			endpoint: '/api/bot/customers',
			qs: qs as IDataObject,
		}, index);

		// Handle different response formats
		let customers: IDataObject[] = [];
		if (Array.isArray(response)) {
			customers = response;
		} else if (response.data && Array.isArray(response.data)) {
			customers = response.data as IDataObject[];
		} else {
			customers = [response];
		}

		return customers.map((customer) => ({
			json: customer,
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
			`Failed to get customers: ${(error as Error).message}`,
			{ itemIndex: index },
		);
	}
}

/**
 * Update an existing customer
 */
export async function updateCustomer(
	this: IExecuteFunctions,
	index: number,
): Promise<INodeExecutionData> {
	try {
		const customerId = this.getNodeParameter('customerId', index) as string;
		const updateFields = this.getNodeParameter('updateFields', index, {}) as IDataObject;

		if (!customerId) {
			throw new Error('Customer ID is required');
		}

		const body: Partial<UpdateCustomerParams> = cleanObject({
			name: updateFields.name as string,
			username: updateFields.username as string,
			phone: updateFields.phone as string,
			email: updateFields.email as string,
			agent_code: updateFields.agent_code as string,
			source_id: updateFields.source_id as number,
		});

		if (Object.keys(body).length === 0) {
			throw new Error('At least one field must be provided to update');
		}

		const response = await tecnocallApiRequest.call(this, {
			method: 'PUT',
			endpoint: `/api/bot/customers/${customerId}`,
			body,
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
			`Failed to update customer: ${(error as Error).message}`,
			{ itemIndex: index },
		);
	}
}
