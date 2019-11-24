function isEmpty(s) {
  return s != null && !s;
}

function isInt(i) {
  return i !== '' && Number.isInteger(Number(i));
}

function isString(s) {
  return typeof s === 'string';
}

function isBoolean(b) {
  return typeof b === 'boolean';
}

function lengthValidationError(s, min, max) {

  const minMsg = min ? `að minnsta kosti ${min} stafir` : '';
  const maxMsg = max ? `í mesta lagi ${max} stafir` : '';
  const msg = [minMsg, maxMsg].filter(Boolean).join(', og ');

  return `verður að vera ${msg}.`;
}

function isNotEmptyString(s, { min = undefined, max = undefined } = {}) {
  if (typeof s !== 'string' || s.length === 0) {
    return false;
  }

  if (max && s.length > max) {
    return false;
  }

  if (min && s.length < min) {
    return false;
  }

  return true;
}

function toPositiveNumberOrDefault(value, defaultValue) {
  const cast = Number(value);
  const clean = Number.isInteger(cast) && cast > 0 ? cast : defaultValue;

  return clean;
}

module.exports = {
  isEmpty,
  isString,
  isBoolean,
  isInt,
  isNotEmptyString,
  toPositiveNumberOrDefault,
  lengthValidationError,
};
