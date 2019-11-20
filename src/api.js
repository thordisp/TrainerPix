import 'isomorphic-fetch';

const { apiUrl } = require('./config');

/**
 * Býr til nýtt prógram.
 * @param {*} userId
 * @param {*} clientId
 * @param {*} link
 */
export async function addProgram(userId, clientId, name, link) {
  const url = new URL(`/program`, apiUrl);
  const response = await fetch(url.href, {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userId,
      clientId,
      name,
      link
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
export async function getProgram(clientId) {

  const url = new URL(`/client/programs/${clientId}`, apiUrl);
  const response = await fetch(url.href);
  const result = await response.json();

  return {
    ok: response.ok,
    data: result,
  };
}

/**
 * Baetir nyrri aefingu vid program.
 * @param {*} userId
 * @param {*} setNumber
 * @param {*} repsNumber
 * @param {*} workoutDescription
 */
export async function addExercise(programId, setNumber, repsNumber, workoutDescription, image1, image2) {
  const url = new URL(`/program/${programId}/add/`, apiUrl);
  const response = await fetch(url.href, {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      programId,
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


export async function getAccessToPrograms(pin) {
  const url = new URL(`/client/programs`, apiUrl);
  const response = await fetch(url.href, {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      pin
    })
  });

  const result = await response.json();

  return {
    ok: response.ok,
    data: result,
  };
}

/**
 * Skilar æfingum fyrir valið prógram.
 * @param {*} id userId
 */
export async function getExercises(userId, programId) {
  const url = new URL(`/client/programs/${userId}/${programId}`, apiUrl);
  const response = await fetch(url.href);
  const result = await response.json();

  return {
    ok: response.ok,
    data: result,
  };
}

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
 * Skilar lista af notendum
 */
export async function listClients() {
  const url = new URL(`/users`, apiUrl);
  const response = await fetch(url.href);
  const result = await response.json();

  return {
    ok: response.ok,
    data: result,
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

export async function newPin(pin, userId, programId) {
  const url = new URL(`/program/${programId}/add/${userId}`, apiUrl);
  const response = await fetch(url.href, {
    method: "PATCH",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      pin,
      userId,
      programId,
    })
  });

  const result = await response.json();

  return {
    ok: response.ok,
    result,
  };
}