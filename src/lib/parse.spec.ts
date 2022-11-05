import { describe, expect, test } from 'vitest';
import { parseCacheControl, type CacheControl } from './parse';

describe('parseCacheControl', () => {
	test.each<[string, CacheControl]>([
		['max-age=604800', { maxAge: 604800 }],
		['s-maxage=604800', { sMaxAge: 604800 }],
		['no-cache', { noCache: true }],
		['max-age=604800, must-revalidate', { mustRevalidate: true, maxAge: 604800 }],
		['max-age=604800, proxy-revalidate', { proxyRevalidate: true, maxAge: 604800 }],
		['no-store', { noStore: true }],
		['private', { private: true }],
		['public', { public: true }],
		['must-understand, no-store', { mustUnderstand: true, noStore: true }],
		['no-transform', { noTransform: true }],
		['public, max-age=604800, immutable', { public: true, maxAge: 604800, immutable: true }],
		[
			'max-age=604800, stale-while-revalidate=86400',
			{ maxAge: 604800, staleWhileRevalidate: 86400 }
		],
		['max-age=604800, stale-if-error=86400', { maxAge: 604800, staleIfError: 86400 }],
		['max-stale=3600', { maxStale: 3600 }],
		['min-fresh=600', { minFresh: 600 }],
		['only-if-cached', { onlyIfCached: true }]
	])('%s', (header, expected) => {
		const result = parseCacheControl(header);
		expect(result).toEqual(expected);
	});
});
