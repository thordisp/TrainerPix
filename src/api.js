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
export async function addExercise(userId, setNumber, repsNumber, workoutDescription, image1, image2) {
  const url = new URL(`/program`, apiUrl);
  const response = await fetch(url.href, {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userId,
      setNumber,
      repsNumber,
      workoutDescription,
      image1,
      image2
    })
  });

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

/**
 * Innskráning notanda
 * @param {*} username
 * @param {*} password
 */
export async function loginUser(username, password) {
  const url = new URL(`/users/login`, apiUrl);
  const response = await fetch(url.href, {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      password,
    })
  });

  const result = await response.json();

  return {
    ok: response.ok,
    data: result,
  };
}

/**
 * Nýskráning notanda
 * @param {*} username
 * @param {*} password
 * @param {*} email
 */
export async function registerUser(username, password, email) {
  const url = new URL(`/users/register`, apiUrl);
  const response = await fetch(url.href, {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      password,
      email,
    })
  });

  const result = await response.json();

  return {
    ok: response.ok,
    data: result,
  };
}