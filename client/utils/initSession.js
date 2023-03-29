const initSession = (anonId) => {
  const session = {
    timestamp: new Date().getTime(),
    duration: 0,
    anonId,
    query: [],
    visitedDomains: [],
    rawHistory: [],
    satisfaction: null,
  };
  return session;
};

export default initSession;
