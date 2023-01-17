const submitSession = (session, callback) => {
  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');

  const raw = JSON.stringify(session);

  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow',
  };

  fetch('https://www.gelule.vandr.fr/api/tracking/submit_session', requestOptions)
    .then((response) => response.text())
    .then((result) => callback(result))
    .catch((error) => callback(error));
};

export default submitSession;
