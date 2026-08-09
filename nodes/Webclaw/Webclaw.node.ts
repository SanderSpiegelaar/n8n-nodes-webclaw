import type { INodeProperties, INodeType, INodeTypeDescription } from 'n8n-workflow';
import { NodeConnectionTypes } from 'n8n-workflow';

const showForOperations = (...operations: string[]) => ({
	show: {
		resource: ['web'],
		operation: operations,
	},
});

const urlProperty: INodeProperties = {
	displayName: 'URL',
	name: 'url',
	type: 'string',
	default: '',
	placeholder: 'https://example.com',
	required: true,
	description: 'The URL of the page or website to process',
	displayOptions: showForOperations('crawl', 'extract', 'map', 'scrape', 'summarize'),
	routing: {
		request: {
			body: {
				url: '={{$value}}',
			},
		},
	},
};

export class Webclaw implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Webclaw',
		name: 'webclaw',
		icon: { light: 'file:webclaw.svg', dark: 'file:webclaw.dark.svg' },
		group: ['output'],
		version: 1,
		subtitle: '={{$parameter["operation"]}}',
		description: 'Scrape, crawl, map, summarize, and extract data from websites',
		defaults: {
			name: 'Webclaw',
		},
		usableAsTool: true,
		inputs: [NodeConnectionTypes.Main],
		outputs: [NodeConnectionTypes.Main],
		credentials: [
			{
				name: 'webclawApi',
				required: true,
			},
		],
		requestDefaults: {
			baseURL: '={{$credentials.baseUrl}}',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		},
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Web',
						value: 'web',
					},
				],
				default: 'web',
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['web'],
					},
				},
				options: [
					{
						name: 'Batch Scrape',
						value: 'batch',
						action: 'Scrape multiple ur ls',
						description: 'Scrape multiple URLs concurrently',
						routing: {
							request: {
								method: 'POST',
								url: '/batch',
							},
						},
					},
					{
						name: 'Crawl',
						value: 'crawl',
						action: 'Crawl a website',
						description: 'Crawl pages from a website',
						routing: {
							request: {
								method: 'POST',
								url: '/crawl',
							},
						},
					},
					{
						name: 'Extract',
						value: 'extract',
						action: 'Extract structured data',
						description: 'Extract data using a prompt or JSON Schema',
						routing: {
							request: {
								method: 'POST',
								url: '/extract',
							},
						},
					},
					{
						name: 'Healthcheck',
						value: 'healthcheck',
						action: 'Check API health',
						description: 'Check whether the Webclaw API is healthy',
						routing: {
							request: {
								method: 'GET',
								url: '={{$credentials.baseUrl.replace(/\\/v1\\/?$/, "") + "/health"}}',
							},
						},
					},
					{
						name: 'Map',
						value: 'map',
						action: 'Map a website',
						description: 'Discover URLs on a website',
						routing: {
							request: {
								method: 'POST',
								url: '/map',
							},
						},
					},
					{
						name: 'Scrape',
						value: 'scrape',
						action: 'Scrape a page',
						description: 'Scrape content from a single page',
						routing: {
							request: {
								method: 'POST',
								url: '/scrape',
							},
						},
					},
					{
						name: 'Summarize',
						value: 'summarize',
						action: 'Summarize a page',
						description: 'Summarize content from a page',
						routing: {
							request: {
								method: 'POST',
								url: '/summarize',
							},
						},
					},
				],
				default: 'scrape',
			},
			urlProperty,
			{
				displayName: 'URLs',
				name: 'urls',
				type: 'string',
				typeOptions: {
					multipleValues: true,
					multipleValueButtonText: 'Add URL',
				},
				default: [],
				required: true,
				placeholder: 'https://example.com',
				description: 'The URLs to scrape',
				displayOptions: showForOperations('batch'),
				routing: {
					request: {
						body: {
							urls: '={{$value}}',
						},
					},
				},
			},
			{
				displayName: 'Formats',
				name: 'formats',
				type: 'multiOptions',
				options: [
					{
						name: 'JSON',
						value: 'json',
					},
					{
						name: 'LLM',
						value: 'llm',
					},
					{
						name: 'Markdown',
						value: 'markdown',
					},
				],
				default: ['markdown'],
				description: 'The output formats to request',
				displayOptions: showForOperations('batch', 'scrape'),
				routing: {
					request: {
						body: {
							formats: '={{$value}}',
						},
					},
				},
			},
			{
				displayName: 'Exclude Selectors',
				name: 'excludeSelectors',
				type: 'string',
				typeOptions: {
					multipleValues: true,
					multipleValueButtonText: 'Add Selector',
				},
				default: [],
				placeholder: 'nav',
				description: 'CSS selectors to exclude from the scraped content',
				displayOptions: showForOperations('scrape'),
				routing: {
					request: {
						body: {
							exclude_selectors: '={{$value}}',
						},
					},
				},
			},
			{
				displayName: 'Maximum Depth',
				name: 'maxDepth',
				type: 'number',
				typeOptions: {
					minValue: 0,
					numberPrecision: 0,
				},
				default: 3,
				description: 'Maximum number of link levels to crawl',
				displayOptions: showForOperations('crawl'),
				routing: {
					request: {
						body: {
							max_depth: '={{$value}}',
						},
					},
				},
			},
			{
				displayName: 'Maximum Pages',
				name: 'maxPages',
				type: 'number',
				typeOptions: {
					minValue: 1,
					numberPrecision: 0,
				},
				default: 50,
				description: 'Maximum number of pages to crawl',
				displayOptions: showForOperations('crawl'),
				routing: {
					request: {
						body: {
							max_pages: '={{$value}}',
						},
					},
				},
			},
			{
				displayName: 'Use Sitemap',
				name: 'useSitemap',
				type: 'boolean',
				default: true,
				description: 'Whether to use the website sitemap while crawling',
				displayOptions: showForOperations('crawl'),
				routing: {
					request: {
						body: {
							use_sitemap: '={{$value}}',
						},
					},
				},
			},
			{
				displayName: 'Concurrency',
				name: 'concurrency',
				type: 'number',
				typeOptions: {
					minValue: 1,
					numberPrecision: 0,
				},
				default: 5,
				description: 'Maximum number of URLs to scrape at the same time',
				displayOptions: showForOperations('batch'),
				routing: {
					request: {
						body: {
							concurrency: '={{$value}}',
						},
					},
				},
			},
			{
				displayName: 'Maximum Sentences',
				name: 'maxSentences',
				type: 'number',
				typeOptions: {
					minValue: 1,
					numberPrecision: 0,
				},
				default: 5,
				description: 'Maximum number of sentences in the summary',
				displayOptions: showForOperations('summarize'),
				routing: {
					request: {
						body: {
							max_sentences: '={{$value}}',
						},
					},
				},
			},
			{
				displayName: 'Extraction Method',
				name: 'extractionMethod',
				type: 'options',
				options: [
					{
						name: 'Prompt',
						value: 'prompt',
						description: 'Describe the information to extract',
					},
					{
						name: 'JSON Schema',
						value: 'schema',
						description: 'Define the desired output structure with JSON Schema',
					},
				],
				default: 'prompt',
				displayOptions: showForOperations('extract'),
			},
			{
				displayName: 'Prompt',
				name: 'prompt',
				type: 'string',
				typeOptions: {
					rows: 4,
				},
				default: '',
				required: true,
				placeholder: 'Extract all service information',
				description: 'Instructions describing the information to extract',
				displayOptions: {
					show: {
						resource: ['web'],
						operation: ['extract'],
						extractionMethod: ['prompt'],
					},
				},
				routing: {
					request: {
						body: {
							prompt: '={{$value}}',
						},
					},
				},
			},
			{
				displayName: 'JSON Schema',
				name: 'schema',
				type: 'json',
				default: '{\n  "type": "object",\n  "properties": {}\n}',
				required: true,
				description: 'JSON Schema describing the data to extract',
				displayOptions: {
					show: {
						resource: ['web'],
						operation: ['extract'],
						extractionMethod: ['schema'],
					},
				},
				routing: {
					request: {
						body: {
							schema: '={{$value}}',
						},
					},
				},
			},
		],
	};
}
