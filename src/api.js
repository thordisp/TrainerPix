import 'isomorphic-fetch';

const { apiUrl } = require('./config');

/**
 * Eyðir æfingu eftir id.
 * @param {*} id id æfingar.
 */
export async function deleteExercise(id) {
  const options = {
    method: 'DELETE',
  };

  const url = new URL(`/program/${id}`, apiUrl);
  const response = await fetch(url.href, options);

  const result = await response.text();

  return {
    ok: response.ok,
    result,
  };
}

/**
 * Baetir nyrri aefingu vid program.
 * @param {*} userId
 * @param {*} setNumber
 * @param {*} repsNumber
 * @param {*} workoutDescription
 */
export async function addExercise(userId, setNumber, repsNumber, workoutDescription) {
  const options = {
    body: JSON.stringify({
      userId,
      setNumber,
      repsNumber,
      workoutDescription,
    }),
    headers: {
      'content-type': 'application/json',
    },
    method: 'POST',
  };

  const url = new URL('/program', apiUrl);
  const response = await fetch(url.href, options);

  const result = await response.json();

  return {
    ok: response.ok,
    result,
  };
}

/**
 * Skilar prógrammi fyrir valinn notanda.
 * @param {*} id userId
 */
export async function getProgram(id) {

  const url = new URL(`/program/${id}`, apiUrl);
  const res = await fetch(url.href);
  const item = await res.json();

  return {
    ok: res.ok,
    result: item,
  };
}