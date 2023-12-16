import localforage from "localforage";
import { matchSorter } from "match-sorter";
import sortBy from "sort-by";

export async function getEcuries(query) {
  await fakeNetwork(`getEcuries:${query}`);
  let ecuries = await localforage.getItem("ecuries");
  if (!ecuries) ecuries = [];
  if (query) {
    ecuries = matchSorter(ecuries, query, { keys: ["first", "last"] });
  }
  return ecuries.sort(sortBy("last", "createdAt"));
}

export async function createEcurie() {
  await fakeNetwork();
  let id = Math.random().toString(36).substring(2, 9);
  let ecurie = { id, createdAt: Date.now() };
  let ecuries = await getEcuries();
  ecuries.unshift(ecurie);
  await set(ecuries);
  return ecurie;
}

export async function getEcurie(id) {
  await fakeNetwork(`ecurie:${id}`);
  let ecuries = await localforage.getItem("ecuries");
  let ecurie = ecuries.find(ecurie => ecurie.id === id);
  return ecurie ?? null;
}

export async function updateEcurie(id, updates) {
  await fakeNetwork();
  let ecuries = await localforage.getItem("ecuries");
  let ecurie = ecuries.find(ecurie => ecurie.id === id);
  if (!ecurie) throw new Error("No ecurie found for", id);
  Object.assign(ecurie, updates);
  await set(ecuries);
  return ecurie;
}

export async function deleteEcurie(id) {
  let ecuries = await localforage.getItem("ecuries");
  let index = ecuries.findIndex(ecurie => ecurie.id === id);
  if (index > -1) {
    ecuries.splice(index, 1);
    await set(ecuries);
    return true;
  }
  return false;
}

function set(ecuries) {
  return localforage.setItem("ecuries", ecuries);
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