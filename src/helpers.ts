export function isCIDValid(cid: string): boolean {
	return cid.length < 50 && !!cid.match(/^[a-z0-9]+$/i);
}
