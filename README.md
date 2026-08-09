# n8n-nodes-webclaw

This package provides an [n8n](https://n8n.io/) community node for the Webclaw API. Use it to scrape, crawl, map, summarize, and extract structured data from websites in n8n workflows.

## Installation

Follow the [n8n community node installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) and install `n8n-nodes-webclaw`.

## Operations

- **Batch Scrape**: Scrape multiple URLs concurrently in one request.
- **Crawl**: Crawl a website with configurable depth, page limit, and sitemap usage.
- **Extract**: Extract information from a page using either a natural-language prompt or a JSON Schema.
- **Healthcheck**: Check the availability of the Webclaw API.
- **Map**: Discover URLs on a website.
- **Scrape**: Scrape a single page in Markdown, LLM, or JSON format and optionally exclude CSS selectors.
- **Summarize**: Summarize a page with a configurable sentence limit.

## Credentials

Create a **Webclaw API** credential, configure the Webclaw API base URL, and enter your API key. The default base URL is `https://api.webclaw.io/v1`. The API key is stored securely by n8n and sent with each request using the `Authorization: Bearer <API key>` header.

## Compatibility

The node is built with n8n node API version 1 and tested against `n8n-workflow` 2.33.2.

## Usage

Add the **Webclaw** node to a workflow, choose an operation, and provide the requested URL or URLs. The node sends requests to the base URL configured in the selected credential and returns the API response as n8n items.

For extraction, choose one of these methods:

- **Prompt**: Describe the information you want Webclaw to extract.
- **JSON Schema**: Supply a valid JSON Schema defining the expected output.

## Development

```sh
npm install
npm run lint
npm run build
npm run dev
```

## Resources

- [n8n community nodes documentation](https://docs.n8n.io/integrations/community-nodes/)
- [Webclaw OpenAPI specification](./webclaw.yaml)

## Version history

See [CHANGELOG.md](./CHANGELOG.md).
