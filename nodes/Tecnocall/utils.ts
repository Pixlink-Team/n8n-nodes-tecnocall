/**
 * Utility functions for Tecnocall node
 */

import type { IExecuteFunctions, IDataObject, IHttpRequestOptions } from 'n8n-workflow';
import { NodeOperationError } from 'n8n-workflow';
import type { RequestOptions } from './types';

/**
 * Make an authenticated API request to Tecnocall
 */
export async function tecnocallApiRequest(
	this: IExecuteFunctions,
	options: RequestOptions,
	itemIndex = 0,
): Promise<IDataObject> {
	try {
		const credentials = await this.getCredentials('tecnocallApi');
		const baseUrl = (credentials.baseUrl as string).replace(/\/$/, '');

		const requestOptions: IHttpRequestOptions = {
			method: options.method,
			url: `${baseUrl}${options.endpoint}`,
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				Authorization: `Bearer ${credentials.botToken as string}`,
			},
			json: true,
		};

		if (options.body) {
			requestOptions.body = options.body;
		}

		if (options.qs) {
			requestOptions.qs = options.qs;
		}

		const response = await this.helpers.httpRequest(requestOptions);
		return response as IDataObject;
	} catch (error) {
		const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
		throw new NodeOperationError(
			this.getNode(),
			`Tecnocall API request failed: ${errorMessage}`,
			{
				itemIndex,
				description: 'Check your credentials and endpoint configuration',
			},
		);
	}
}

/**
 * Validate required fields
 */
export function validateRequiredFields(
	fields: Record<string, unknown>,
	requiredFields: string[],
): void {
	const missingFields = requiredFields.filter((field) => !fields[field]);

	if (missingFields.length > 0) {
		throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
	}
}

/**
 * Clean undefined values from object
 */
export function cleanObject(obj: IDataObject): IDataObject {
	const cleaned: IDataObject = {};

	for (const [key, value] of Object.entries(obj)) {
		if (value !== undefined && value !== null && value !== '') {
			cleaned[key] = value;
		}
	}

	return cleaned;
}

/**
 * Parse JSON string safely
 */
export function safeJsonParse(jsonString: string): IDataObject {
	try {
		return JSON.parse(jsonString) as IDataObject;
	} catch (error) {
		const errorMessage = error instanceof Error ? error.message : 'Invalid JSON';
		throw new Error(`Failed to parse JSON: ${errorMessage}`);
	}
}

/**
 * Build query string parameters
 */
export function buildQueryString(params: IDataObject): IDataObject {
	return cleanObject(params);
}

/**
 * Handle API errors with context
 */
export function handleApiError(
	error: Error,
	operation: string,
	resource: string,
	itemIndex = 0,
): NodeOperationError {
	const errorMessage = error.message || 'Unknown error';

	return new NodeOperationError(
		{} as any, // eslint-disable-line @typescript-eslint/no-explicit-any
		`Failed to ${operation} ${resource}: ${errorMessage}`,
		{
			itemIndex,
			description: 'Check your input parameters and try again',
		},
	);
}
