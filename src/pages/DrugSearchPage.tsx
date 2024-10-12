import { useEffect, useState } from "react";
// import ComboBox from "../components/ComboBox";
import useApi from "../hooks/useApi";
import { searchDrugByKeyword } from "../api/searchDrugs";

const DrugSearchPage = () => {
  async function fetchData(kw: string) {
    if (!kw) return [];
    const resp = await searchDrugByKeyword(kw);
    // console.log(resp);
    const listitem = resp.drugGroup.conceptGroup.filter(
      (x: any) => x.tty === "SBD"
    );
    const list = listitem.at(0)?.conceptProperties;
    return list ?? [];
  }

  const [keyword, setKeyword] = useState("cymbalta");
  const [list, setList] = useState([]);

  return (
    <div>
      <h1>Search Drugs</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          fetchData(keyword).then(setList);
        }}
        className="flex items-center gap-4"
      >
        <input
          type="text"
          name=""
          id=""
          className="w-full px-4 py-1 rounded-md"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value || "")}
        />
        <button
          type="submit"
          className="px-2 py-1 rounded-md bg-indigo-500 text-white"
        >
          Search
        </button>
      </form>
      {/* {JSON.stringify(list)} */}
      <div className="grid grid-cols-4">
        {list.map((val: any) => (
          <a
            className="w-full h-auto py-6 flex flex-col items-start justify-start"
            href={`/drugs/${val.rxcui}`}
          >
            <h2>{val.name}</h2>
            <p>{val.synonym}</p>
          </a>
        ))}
      </div>
      {/* <ComboBox
        values={[]}
        query={keyword}
        setQuery={setKeyword}
        onSelectedChange={(val) => {
          console.log(val);
        }}
      /> */}
    </div>
  );
};

export default DrugSearchPage;
