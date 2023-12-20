import localforage from "localforage";
import { matchSorter } from "match-sorter";
import sortBy from "sort-by";
import { getEcurie } from "./ecuries";

export async function getSaisons(query) {
  await fakeNetwork(`getSaisons:${query}`);
  let saisons = await localforage.getItem("saisons");
  if (!saisons) saisons = [];

  // TODO : dépendance cyclique
  // Récupération des écuries pour chaque pilote
  /* const saisonsWithEcuries = await Promise.all(
    saisons.map(async (pilote) => {
      // Récupération écurie du pilote
      let ecurie = await getEcurie(pilote.idEcurie);
      pilote.ecurie = ecurie;

      return pilote;
    })
  ); */ 

  if (query) {
    saisons = matchSorter(saisons, query, { keys: ["prenom", "nom"] });
  }
  
  return saisons.sort(sortBy("nom", "createdAt"));
}

export async function createSaison() {
  await fakeNetwork();
  let id = Math.random().toString(36).substring(2, 9);
  let pilote = { id, createdAt: Date.now() };
  let saisons = await getSaisons();
  saisons.unshift(pilote);
  await set(saisons);
  return pilote;
}

export async function getSaison(id) {
  await fakeNetwork(`pilote:${id}`);
  let saisons = await localforage.getItem("saisons");
  let pilote = saisons.find(pilote => pilote.id === id);

  // Récupération écurie du pilote
  if (pilote) {
    let ecurie = await getEcurie(pilote.idEcurie);
    pilote.ecurie = ecurie;
  }

  return pilote ?? null;
}

export async function updateSaison(id, updates) {
  await fakeNetwork();
  let saisons = await localforage.getItem("saisons");
  let pilote = saisons.find(pilote => pilote.id === id);
  if (!pilote) throw new Error("No pilote found for", id);
  Object.assign(pilote, updates);
  await set(saisons);
  return pilote;
}

export async function deleteSaison(id) {
  let saisons = await localforage.getItem("saisons");
  let index = saisons.findIndex(pilote => pilote.id === id);
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