import localforage from "localforage";
import { matchSorter } from "match-sorter";
import sortBy from "sort-by";

export async function getCircuits(query) {
  await fakeNetwork(`getCircuits:${query}`);
  let circuits = await localforage.getItem("circuits");
  if (!circuits) circuits = [];

  if (query) {
    circuits = matchSorter(circuits, query, { keys: ["prenom", "nom"] });
  }
  
  return circuits.sort(sortBy("nom", "createdAt"));
}

export async function createCircuit() {
  await fakeNetwork();
  let id = Math.random().toString(36).substring(2, 9);
  let circuit = { id, createdAt: Date.now() };
  let circuits = await getCircuits();
  circuits.unshift(circuit);
  await set(circuits);
  return circuit;
}

export async function getCircuit(id) {
  await fakeNetwork(`circuit:${id}`);
  let circuits = await localforage.getItem("circuits");
  let circuit = circuits.find(circuit => circuit.id === id);

  return circuit ?? null;
}

export async function updateCircuit(id, updates) {
  await fakeNetwork();
  let circuits = await localforage.getItem("circuits");
  let circuit = circuits.find(circuit => circuit.id === id);
  if (!circuit) throw new Error("No circuit found for", id);
  Object.assign(circuit, updates);
  await set(circuits);
  return circuit;
}

export async function deleteCircuit(id) {
  let circuits = await localforage.getItem("circuits");
  let index = circuits.findIndex(circuit => circuit.id === id);
  if (index > -1) {
    circuits.splice(index, 1);
    await set(circuits);
    return true;
  }
  return false;
}

function set(circuits) {
  return localforage.setItem("circuits", circuits);
}

let fakeCache = {};

async function fakeNetwork(key) {
  if (!key) {
    fakeCache = {};
  }

  if (fakeCache[key]) {
    return;
  }

  fakeCache[key] = true;
  return new Promise(res => {
    setTimeout(res, Math.random() * 800);
  });
}