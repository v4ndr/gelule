const validateSession = (session) => {
  const schema = {
    duration: (val) => typeof val === 'number',
    query: (val) => Array.isArray(val),
    satisfaction: (val) => val === true || val === false,
    timestamp: (val) => typeof val === 'string',
    deviceId: (val) => typeof val === 'string',
    visitedDomains: (val) => Array.isArray(val),
  };

  const validate = (o, sch) => Object
    .keys(sch)
    .filter((key) => !sch[key](o[key]))
    .map((key) => new Error(`${key} is invalid.`));

  const errors = validate(session, schema);

  if (errors.length > 0) {
    errors.forEach((e) => console.log(e));
  } else {
    return true;
  }
  return false;
};

module.exports = validateSession;
