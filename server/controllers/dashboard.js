/* eslint-disable no-restricted-syntax */
require('dotenv').config();
const Dashboard = require('../models/Dashboard');

exports.monit = (req, res, next) => {
  Dashboard.getSessionsData((sessionsData, voidSessionsNumber) => {
    const numberOfSessions = sessionsData.length;
    Dashboard.getEnrollNumber((enrollNumber) => {
      Dashboard.getAnonNumber((anonNumber) => {
        Dashboard.getTallyTotal((tallyTotal) => {
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

          const satisfaction = sessionsData.map((e) => e.satisfaction);
          const satisfactionRate = Math.floor(
            (satisfaction.filter((e) => e).length / satisfaction.length) * 100,
          );

          res.render('dashboard', {
            numberOfSessions,
            domainsCount,
            queriesCount,
            enrollNumber,
            anonNumber,
            satisfactionRate,
            voidSessionsNumber,
            tallyTotal,
          });
        }, next);
      }, next);
    }, next);
  }, next);
};

exports.submitTally = (req, res, next) => {
  Dashboard.submitTally(() => {
    res.status(200).send('OK');
  }, next);
};
