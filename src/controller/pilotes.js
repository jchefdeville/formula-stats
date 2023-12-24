import localforage from "localforage";
import { matchSorter } from "match-sorter";
import sortBy from "sort-by";

export async function getPilotes(query) {
  await fakeNetwork(`getPilotes:${query}`);
  let pilotes = await localforage.getItem("pilotes");
  if (!pilotes) pilotes = [];

  if (query) {
    pilotes = matchSorter(pilotes, query, { keys: ["prenom", "nom"] });
  }
  
  return pilotes.sort(sortBy("nom", "createdAt"));
}

export async function createPilote() {
  await fakeNetwork();
  let id = Math.random().toString(36).substring(2, 9);
  let pilote = { id, createdAt: Date.now() };
  let pilotes = await getPilotes();
  pilotes.unshift(pilote);
  await set(pilotes);
  return pilote;
}

export async function getPilote(id) {
  await fakeNetwork(`pilote:${id}`);
  let pilotes = await localforage.getItem("pilotes");
  let pilote = pilotes.find(pilote => pilote.id === id);

  return pilote ?? null;
}

export async function updatePilote(id, updates) {
  await fakeNetwork();
  let pilotes = await localforage.getItem("pilotes");
  let pilote = pilotes.find(pilote => pilote.id === id);
  if (!pilote) throw new Error("No pilote found for", id);
  Object.assign(pilote, updates);
  await set(pilotes);
  return pilote;
}

export async function deletePilote(id) {
  let pilotes = await localforage.getItem("pilotes");
  let index = pilotes.findIndex(pilote => pilote.id === id);
  if (index > -1) {
    pilotes.splice(index, 1);
    await set(pilotes);
    return true;
  }
  return false;
}

function set(pilotes) {
  return localforage.setItem("pilotes", pilotes);
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