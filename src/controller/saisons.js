import localforage from "localforage";
import { matchSorter } from "match-sorter";
import sortBy from "sort-by";

export async function getSaisons(query) {
  await fakeNetwork(`getSaisons:${query}`);
  let saisons = await localforage.getItem("saisons");
  if (!saisons) saisons = [];

  if (query) {
    saisons = matchSorter(saisons, query, { keys: ["prenom", "nom"] });
  }

  console.log(saisons.length);
  
  return saisons.sort(sortBy("nom", "createdAt"));
}

export async function createSaison() {
  await fakeNetwork();
  let id = Math.random().toString(36).substring(2, 9);
  let saison = { id, createdAt: Date.now() };
  let saisons = await getSaisons();
  saisons.unshift(saison);
  await set(saisons);
  return saison;
}

export async function getSaison(id) {
  await fakeNetwork(`saison:${id}`);
  let saisons = await localforage.getItem("saisons");
  let saison = saisons.find(saison => saison.id === id);

  return saison ?? null;
}

export async function updateSaison(id, updates) {
  await fakeNetwork();
  let saisons = await localforage.getItem("saisons");
  let saison = saisons.find(saison => saison.id === id);
  if (!saison) throw new Error("No saison found for", id);
  Object.assign(saison, updates);
  await set(saisons);
  return saison;
}

export async function deleteSaison(id) {
  let saisons = await localforage.getItem("saisons");
  let index = saisons.findIndex(saison => saison.id === id);
  if (index > -1) {
    saisons.splice(index, 1);
    await set(saisons);
    return true;
  }
  return false;
}

function set(saisons) {
  return localforage.setItem("saisons", saisons);
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