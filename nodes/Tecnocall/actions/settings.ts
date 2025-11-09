/**
 * Settings operations handler
 */

import type { IExecuteFunctions, INodeExecutionData, IDataObject } from 'n8n-workflow';
import { NodeOperationError } from 'n8n-workflow';
import { tecnocallApiRequest, buildQueryString } from '../utils';

/**
 * Get all settings
 */
export async function getAllSettings(
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
            endpoint: '/api/bot/settings',
            qs,
        }, index);

        // Handle different response formats
        let items: IDataObject[] = [];
        if (Array.isArray(response)) {
            items = response;
        } else if (response.data && Array.isArray(response.data)) {
            items = response.data as IDataObject[];
        } else {
            items = [response];
        }

        return items.map((item) => ({
            json: item,
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
            `Failed to get settings: ${(error as Error).message}`,
            { itemIndex: index },
        );
    }
}
