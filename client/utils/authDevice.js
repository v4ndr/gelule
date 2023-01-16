const authDevice = (pinCode, deviceId, callback) => {
  const cred = { pinCode, deviceId };

  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');

  const raw = JSON.stringify(cred);

  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow',
  };
  fetch('http://localhost:3001/auth/query_pin', requestOptions)
    .then((response) => response.text())
    .then((result) => callback(result))
    .catch((error) => callback(error));
};

export default authDevice;
