import { useRef, useState } from "react";
import {
  searchDrugByKeyword,
  searchSpellingSuggestions,
} from "../api/searchDrugs";

const DrugSearchPage = () => {
  async function fetchData(kw: string) {
    if (!kw) return [];
    const resp_set = {
      list: [],
      sugg_list: [],
    };
    const resp = await searchDrugByKeyword(kw);
    const listitem = resp.drugGroup.conceptGroup?.filter(
      (x: any) => x.tty === "SBD"
    );
    const list = listitem?.at(0)?.conceptProperties;

    if (!list) {
      const sugg_resp = await searchSpellingSuggestions(keyword);
      const sugg_list = sugg_resp.suggestionGroup?.suggestionList?.suggestion;
      resp_set.sugg_list = sugg_list;
    } else {
      resp_set.list = list;
    }

    return resp_set;
  }

  const [keyword, setKeyword] = useState("cymbalta");
  const [list, setList] = useState([]);
  const [suggestionList, setSuggestionList] = useState([]);
  const formRef = useRef<HTMLFormElement>();

  return (
    <div className="container mx-auto space-y-6">
      <h1 className="text-3xl font-bold">Search Drugs</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          fetchData(keyword).then((res: any) => {
            if (res.list) setList(res.list);
            if (res.sugg_list) setSuggestionList(res.sugg_list);
          });
        }}
        ref={(r) => {
          if (r) formRef.current = r;
        }}
        className="flex items-center gap-4"
      >
        <input
          type="text"
          name=""
          id=""
          className="w-full px-4 py-1 rounded-md shadow-md border border-gray-100"
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
      <div className="w-full flex gap-4 flex-wrap">
        {suggestionList.map((val: string) => (
          <button
            onClick={() => {
              setKeyword(val);
              fetchData(val).then((res: any) => {
                if (res.list) setList(res.list);
                if (res.sugg_list) setSuggestionList(res.sugg_list);
              });
            }}
            key={val}
            className="cursor-pointer bg-indigo-500 text-white text-sm px-4 py-1 rounded-full"
          >
            {val}
          </button>
        ))}
      </div>

      {/* {JSON.stringify(list)} */}
      <div className="grid grid-cols-4 gap-3">
        {list.map((val: any) => (
          <a
            key={val.rxcui}
            className="w-full h-auto flex flex-col items-start justify-start bg-indigo-50 px-3 py-3 rounded-lg hover:bg-indigo-100 space-y-3"
            href={`/drugs/${val.rxcui}`}
          >
            <h2 className="font-semibold text-sm">{val.synonym}</h2>
            <p className="font-thin text-xs">{val.name}</p>
          </a>
        ))}
      </div>
    </div>
  );
};

export default DrugSearchPage;
