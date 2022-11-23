const closeSession = (ses, satisfaction) => {
  const session = ses;
  const startDate = new Date(session.timestamp);
  session.duration = (new Date().getTime() - session.timestamp) / 1000;
  session.timestamp = startDate.toLocaleString();
  session.satisfaction = satisfaction;
  return session;
};

export default closeSession;
