export interface IConfiguration<Body = {}> {
	method?: string, base?: string, url: string,
	headers?: { Authorization?: string },
	body?: Body,
}
