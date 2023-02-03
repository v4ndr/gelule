/* eslint-disable no-restricted-syntax */
require('dotenv').config();
const Dashboard = require('../models/Dashboard');
const Auth = require('../models/Auth');

exports.monit = (req, res, next) => {
  Auth.getAuthorizedIds((authorizedIds) => {
    const nonNullAuthorizedIds = authorizedIds.filter((e) => e !== null);
    const numberOfConnections = nonNullAuthorizedIds.length;
    Dashboard.getSessionsData((sessionsData) => {
      const numberOfSessions = sessionsData.length;

      const domainsRaw = sessionsData.map((e) => e.domains);
      const domains = [];
      for (const domain of domainsRaw) for (const e of domain) domains.push(e);
      const domainsCount = [];
      for (const domain of domains) {
        const idx = domainsCount.findIndex((e) => e.domain === domain);
        if (idx === -1) {
          domainsCount.push({ domain, count: 1 });
        } else {
          domainsCount[idx].count += 1;
        }
      }
      domainsCount.sort((a, b) => b.count - a.count);

      const queriesRaw = sessionsData.map((e) => e.queries);
      const queries = [];
      for (const query of queriesRaw) for (const e of query) queries.push(e);
      const queriesWords = [];
      for (const query of queries) {
        const words = query.split(' ');
        for (const word of words) queriesWords.push(word);
      }
      const queriesCount = [];
      for (const query of queriesWords) {
        const idx = queriesCount.findIndex((e) => e.query === query);
        if (idx === -1) {
          queriesCount.push({ query, count: 1 });
        } else {
          queriesCount[idx].count += 1;
        }
      }
      queriesCount.sort((a, b) => b.count - a.count);

      const enginesRaw = sessionsData.map((e) => e.engines);
      const engines = [];
      for (const engine of enginesRaw) for (const e of engine) engines.push(e);
      const enginesCount = [];
      for (const engine of engines) {
        const idx = enginesCount.findIndex((e) => e.engine === engine);
        if (idx === -1) {
          enginesCount.push({ engine, count: 1 });
        } else {
          enginesCount[idx].count += 1;
        }
      }
      enginesCount.sort((a, b) => b.count - a.count);

      const satisfaction = sessionsData.map((e) => e.satisfaction);
      const satisfactionRate = Math.floor(
        (satisfaction.filter((e) => e).length / satisfaction.length) * 100,
      );

      Dashboard.getValidPins((validPins) => {
        res.render('dashboard', {
          numberOfConnections,
          numberOfSessions,
          domainsCount,
          queriesCount,
          enginesCount,
          satisfactionRate,
          validPins,
        });
      }, next);
    }, next);
  }, next);
};
