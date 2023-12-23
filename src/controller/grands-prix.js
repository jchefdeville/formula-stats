import localforage from "localforage";
import { matchSorter } from "match-sorter";
import sortBy from "sort-by";

export async function getGrandsPrix(query) {
  await fakeNetwork(`getGrandsPrix:${query}`);
  let grandsPrix = await localforage.getItem("grands-prix");
  if (!grandsPrix) grandsPrix = [];

  if (query) {
    grandsPrix = matchSorter(grandsPrix, query, { keys: ["prenom", "nom"] });
  }
  
  return grandsPrix.sort(sortBy("nom", "createdAt"));
}

export async function createGrandPrix() {
  await fakeNetwork();
  let id = Math.random().toString(36).substring(2, 9);
  let grandPrix = { id, createdAt: Date.now() };
  let grandsPrix = await getGrandsPrix();
  grandsPrix.unshift(grandPrix);
  await set(grandsPrix);
  return grandPrix;
}

export async function getGrandPrix(id) {
  await fakeNetwork(`grandPrix:${id}`);
  let grandsPrix = await localforage.getItem("grands-prix");
  let grandPrix = grandsPrix.find(grandPrix => grandPrix.id === id);

  return grandPrix ?? null;
}

export async function updateGrandPrix(id, updates) {
  await fakeNetwork();
  let grandsPrix = await localforage.getItem("grands-prix");
  let grandPrix = grandsPrix.find(grandPrix => grandPrix.id === id);
  if (!grandPrix) throw new Error("No grandPrix found for", id);
  Object.assign(grandPrix, updates);
  await set(grandsPrix);
  return grandPrix;
}

export async function deleteGrandPrix(id) {
  let grandsPrix = await localforage.getItem("grands-prix");
  let index = grandsPrix.findIndex(grandPrix => grandPrix.id === id);
  if (index > -1) {
    grandsPrix.splice(index, 1);
    await set(grandsPrix);
    return true;
  }
  return false;
}

function set(grandsPrix) {
  return localforage.setItem("grands-prix", grandsPrix);
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