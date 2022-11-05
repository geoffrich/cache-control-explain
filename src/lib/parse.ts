export type CacheControl = Partial<{
	maxAge: number;
	sMaxAge: number;
	noCache: boolean;
	mustRevalidate: boolean;
	proxyRevalidate: boolean;
	noStore: boolean;
	private: boolean;
	public: boolean;
	mustUnderstand: boolean;
	noTransform: boolean;
	immutable: boolean;
	staleWhileRevalidate: number;
	staleIfError: number;
	maxStale: number;
	minFresh: number;
	onlyIfCached: boolean;
}>;

export function parseCacheControl(header: string): CacheControl {
	const result: CacheControl = {};
	for (const part of header.split(',')) {
		const [key, value] = part.split('=');
		switch (key.trim()) {
			case 'max-age':
				result.maxAge = parseNumber(value);
				break;
			case 's-maxage':
				result.sMaxAge = parseNumber(value);
				break;
			case 'no-cache':
				result.noCache = true;
				break;
			case 'must-revalidate':
				result.mustRevalidate = true;
				break;
			case 'proxy-revalidate':
				result.proxyRevalidate = true;
				break;
			case 'no-store':
				result.noStore = true;
				break;
			case 'private':
				result.private = true;
				break;
			case 'public':
				result.public = true;
				break;
			case 'must-understand':
				result.mustUnderstand = true;
				break;
			case 'no-transform':
				result.noTransform = true;
				break;
			case 'immutable':
				result.immutable = true;
				break;
			case 'stale-while-revalidate':
				result.staleWhileRevalidate = parseNumber(value);
				break;
			case 'stale-if-error':
				result.staleIfError = parseNumber(value);
				break;
			case 'max-stale':
				result.maxStale = parseNumber(value);
				break;
			case 'min-fresh':
				result.minFresh = parseNumber(value);
				break;
			case 'only-if-cached':
				result.onlyIfCached = true;
				break;
		}
	}

	return result;
}

export function secondsToString(seconds: number) {
	// adapted from https://stackoverflow.com/a/34270811/14808988
	var levels: [number, string][] = [
		[Math.floor(seconds / 31536000), 'years'],
		[Math.floor((seconds % 31536000) / 86400), 'days'],
		[Math.floor(((seconds % 31536000) % 86400) / 3600), 'hours'],
		[Math.floor((((seconds % 31536000) % 86400) % 3600) / 60), 'minutes'],
		[(((seconds % 31536000) % 86400) % 3600) % 60, 'seconds']
	];
	var returntext = '';

	for (var i = 0, max = levels.length; i < max; i++) {
		if (levels[i][0] === 0) continue;
		returntext +=
			' ' +
			levels[i][0] +
			' ' +
			(levels[i][0] === 1 ? levels[i][1].substring(0, levels[i][1].length - 1) : levels[i][1]);
	}
	return returntext.trim();
}

function parseNumber(s: string) {
	return parseInt(s);
}
