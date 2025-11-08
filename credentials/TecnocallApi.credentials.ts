import type {
	IAuthenticateGeneric,
	Icon,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class TecnocallApi implements ICredentialType {
	name = 'tecnocallApi';

	displayName = 'Tecnocall API';

	documentationUrl = 'https://github.com/Pixlink-Team/n8n-nodes-tecnocall';

	icon: Icon = { light: 'file:../icons/tecnocall.svg', dark: 'file:../icons/tecnocall.dark.svg' };

	properties: INodeProperties[] = [
		{
			displayName: 'Base URL',
			name: 'baseUrl',
			type: 'string',
			default: 'https://api.tecnocall.com',
			placeholder: 'https://api.tecnocall.com',
			description: 'The base URL of your Tecnocall API instance',
			required: true,
		},
		{
			displayName: 'Bot Token',
			name: 'botToken',
			type: 'string',
			typeOptions: { password: true },
			default: '',
			placeholder: 'your-bot-token',
			description: 'The bot token for authentication',
			required: true,
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				Authorization: '=Bearer {{$credentials?.botToken}}',
			},
		},
	};

	test: ICredentialTestRequest = {
		request: {
			baseURL: '={{$credentials?.baseUrl}}',
			url: '/api/bot/me',
			method: 'GET',
		},
	};
}
