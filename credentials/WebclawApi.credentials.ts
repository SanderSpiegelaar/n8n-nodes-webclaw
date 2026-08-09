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
			baseURL: 'https://webclaw.api.sander.gg',
			url: '/health',
			method: 'GET',
		},
	};
}
