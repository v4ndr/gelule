const whitelist = [
  {
    domain: 'www.google.fr',
    parsingScheme: '(?<=\\?q=)(.*?)(?=&)',
  },
  {
    domain: 'www.google.com',
    parsingScheme: '(?<=\\?q=)(.*?)(?=&)',
  },
  {
    domain: 'www.dermatoclic.com',
    parsingScheme: '(?<=search-results-page\\/)(.*)',
  },
  {
    domain: 'www.has-sante.fr',
    parsingScheme: '(?<=resultat-de-recherche\\?text=)(.*?)(?=&)',
  },
  {
    domain: 'www.bing.com',
    parsingScheme: '(?<=\\?q=)(.*?)(?=&)',
  },
  {
    domain: 'www.bing.fr',
    parsingScheme: '(?<=\\?q=)(.*?)(?=&)',
  },
  {
    domain: 'www.ecosia.org',
    parsingScheme: '(?<=\\?q=)(.*)',
  },
  {
    domain: 'fr.search.yahoo.com',
    parsingScheme: '(?<=\\?p=)(.*?)(?=&)',
  },
  {
    domain: 'search.yahoo.com',
    parsingScheme: '(?<=\\?p=)(.*?)(?=&)',
  },
  {
    domain: 'www.ebmfrance.net',
    parsingScheme: '(?<=\\?k=)(.*)',
  },
  {
    domain: 'www.minerva-ebm.be',
    parsingScheme: '(?<=\\?key=)(.*)',
  },
  {
    domain: 'www.cochrane.org',
    parsingScheme: '(?<=search\\/site\\/)(.*)',
  },
  {
    domain: 'pubmed.ncbi.nlm.nih.gov',
    parsingScheme: '(?<=\\?term=)(.*)',
  },
  {
    domain: 'scholar.google.com',
    parsingScheme: '(?<=&q=)(.*?)(?=&)',
  },
  {
    domain: 'doccismef.chu-rouen.fr',
    parsingScheme: '(?<=&q=)(.*)',
  },
];

export default whitelist;
