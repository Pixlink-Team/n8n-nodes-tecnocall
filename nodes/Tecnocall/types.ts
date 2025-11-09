/**
 * Type definitions for Tecnocall API
 */

import type { IDataObject } from 'n8n-workflow';

// Resource types
export type TecnocallResource = 'customer' | 'communication' | 'source' | 'status' | 'product' | 'settings';

// Operation types
export type CustomerOperation = 'create' | 'get' | 'getAll' | 'update' | 'delete';
export type CommunicationOperation = 'create' | 'get' | 'getAll';
export type SourceOperation = 'getAll';
export type StatusOperation = 'getAll';
export type ProductOperation = 'getAll';
export type SettingsOperation = 'getAll';

// Customer types
export interface TecnocallCustomer extends IDataObject {
	id?: string | number;
	name?: string;
	username?: string;
	phone?: string;
	email?: string;
	agent_code?: string;
	source_id?: number;
	product_id?: number;
	status_id?: number;
	created_at?: string;
	updated_at?: string;
}

export interface CreateCustomerParams {
	name?: string;
	username?: string;
	phone?: string;
	email?: string;
	agent_code?: string;
	source_id?: number;
	product_id?: number;
	status_id?: number;
}

export interface UpdateCustomerParams {
	customerId: string;
	name?: string;
	username?: string;
	phone?: string;
	email?: string;
	agent_code?: string;
	source_id?: number;
	product_id?: number;
	status_id?: number;
}

export interface GetCustomersParams {
	limit?: number;
	page?: number;
	search?: string;
	agent_code?: string;
	source_id?: number;
}

// Communication types
export interface TecnocallCommunication extends IDataObject {
	id?: string | number;
	type: string;
	agent_code: string;
	customer_code: string;
	data: string | IDataObject;
	created_at?: string;
	updated_at?: string;
}

export interface CreateCommunicationParams {
	type: string;
	agent_code: string;
	customer_code: string;
	data: string | IDataObject;
}

// Source types
export interface TecnocallSource extends IDataObject {
	id?: string | number;
	name?: string;
	description?: string;
	created_at?: string;
	updated_at?: string;
}

// Status types
export interface TecnocallStatus extends IDataObject {
	id?: string | number;
	name?: string;
	description?: string;
	created_at?: string;
	updated_at?: string;
}

// Product types
export interface TecnocallProduct extends IDataObject {
	id?: string | number;
	name?: string;
	description?: string;
	price?: number;
	created_at?: string;
	updated_at?: string;
}

// Settings types
export interface TecnocallSettings extends IDataObject {
	id?: string | number;
	key?: string;
	value?: string | number | boolean | IDataObject;
	description?: string;
	created_at?: string;
	updated_at?: string;
}

// API Response types
export interface ApiResponse<T = IDataObject> {
	success?: boolean;
	data?: T;
	message?: string;
	error?: string;
}

export interface PaginatedResponse<T = IDataObject> {
	data: T[];
	total?: number;
	page?: number;
	per_page?: number;
	last_page?: number;
}

// Request options
export interface RequestOptions {
	method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
	endpoint: string;
	body?: IDataObject;
	qs?: IDataObject;
}
