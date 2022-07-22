export const getHost = (context) => context.req.headers.host || null;
export const getOrigin = (context) => context.req.headers.origin || null;

export const iHostname = ['dood.eu.org', 'mdisk.eu.org'];
