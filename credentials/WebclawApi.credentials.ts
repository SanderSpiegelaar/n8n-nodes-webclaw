import type {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	Icon,
	INodeProperties,
} from 'n8n-workflow';

export class WebclawApi implements ICredentialType {
	name = 'webclawApi';

	displayName = 'Webclaw API';

	icon: Icon = {
		light: 'file:../nodes/Webclaw/webclaw.svg',
		dark: 'file:../nodes/Webclaw/webclaw.dark.svg',
	};

	documentationUrl = 'https://github.com/SanderSpiegelaar/n8n-nodes-webclaw#credentials';

	properties: INodeProperties[] = [
		{
			displayName: 'Base URL',
			name: 'baseUrl',
			type: 'string',
			default: 'https://api.webclaw.io/v1',
			required: true,
			placeholder: 'https://api.example.com/v1',
			description: 'The base URL of the Webclaw API, without a trailing slash',
		},
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			typeOptions: {
				password: true,
			},
			default: '',
			required: true,
			description: 'The API key used to authenticate with Webclaw',
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				Authorization: '=Bearer {{$credentials.apiKey}}',
			},
		},
	};

	test: ICredentialTestRequest = {
		request: {
			baseURL: '={{$credentials.baseUrl.replace(/\\/v1\\/?$/, "")}}',
			url: '/health',
			method: 'GET',
		},
	};
}
