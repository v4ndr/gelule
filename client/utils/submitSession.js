const submitSession = (session) => {
  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');

  const raw = JSON.stringify(session);

  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow',
  };

  // fetch('https://www.gelule.vandr.fr/api/tracking/submit_session', requestOptions);
  fetch('http://localhost:3001/tracking/submit_session', requestOptions);
};

export default submitSession;
