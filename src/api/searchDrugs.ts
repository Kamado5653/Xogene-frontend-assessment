import { getUrl } from "./_base";

export async function searchDrugByKeyword(keyword: string) {
  const resp = await fetch(getUrl(`/REST/drugs.json?name=${keyword}`));
  if (resp.status != 200) {
    throw new Error(resp.statusText);
  }
  return resp.json();
}

export async function searchSpellingSuggestions(keyword: string) {
  const resp = await fetch(
    getUrl(` /REST/spellingsuggestions.json?name=${keyword}`)
  );
  if (resp.status != 200) {
    throw new Error(resp.statusText);
  }
  return resp.json();
}

export async function getRelatedNDCs(rxcui: string) {
  const resp = await fetch(getUrl(`/REST/rxcui/${rxcui}/ndcs.json`));
  if (resp.status != 200) {
    throw new Error(resp.statusText);
  }
  return resp.json();
}

export async function getDrugByName(rxcui_name: string) {
  const resp = await fetch(
    getUrl(`/REST/rxcui.json?name=${rxcui_name}&search=0`)
  );
  if (resp.status != 200) {
    throw new Error(resp.statusText);
  }
  return resp.json();
}

export async function getRelatedRxcuiInfo(rxcui: string) {
  const resp = await fetch(getUrl(`/REST/rxcui/${rxcui}/allrelated.json`));
  if (resp.status != 200) {
    throw new Error(resp.statusText);
  }
  return resp.json();
}
