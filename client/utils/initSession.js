const initSession = (deviceId) => {
  const session = {
    timestamp: new Date().getTime(),
    duration: 0,
    deviceId,
    query: [],
    visitedDomains: [],
    rawHistory: [],
    satisfaction: null,
  };
  return session;
};

export default initSession;
