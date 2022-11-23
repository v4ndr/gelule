const domainIsDumb = (domain) => {
  const dumbDomains = ['newtab', 'extensions', '', 'settings'];
  return dumbDomains.includes(domain);
};

const domainIsUnique = (domain, session) => !session.visitedDomains.includes(domain);

const queryIsUnique = (query, session) => !session.query.some(
  (e) => ((e.domain === query.domain) && (e.keywords === query.keywords)),
);

const parseQuery = (url, domain, whitelist, whitelistDomains) => {
  const wlIndex = whitelistDomains.findIndex((e) => e === domain);
  if (wlIndex !== -1) {
    const { parsingScheme } = whitelist[wlIndex];
    let query = url.match(new RegExp(parsingScheme, 'gm'));
    if (query) {
      [query] = query;
      query = decodeURIComponent(query);
      query = query.replaceAll('+', ' ');
      return { domain, keywords: query };
    }
  }
  return null;
};

const handleEntry = (whitelist, whitelistDomains, url, session) => {
  const domain = new URL(url).hostname;
  session.rawHistory.push(url);
  if (!domainIsDumb(domain)) {
    if (domainIsUnique(domain, session)) {
      session.visitedDomains.push(domain);
    }
  }
  const query = parseQuery(url, domain, whitelist, whitelistDomains);
  if (query && queryIsUnique(query, session)) {
    session.query.push(query);
  }
  return session;
};

export default handleEntry;
