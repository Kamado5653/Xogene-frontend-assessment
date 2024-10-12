import { useParams } from "react-router-dom";
import { getRelatedNDCs, getRelatedRxcuiInfo } from "../api/searchDrugs";
import { useEffect, useState } from "react";

async function fetchData(id?: string) {
  if (!id) return {};

  const rxinfo = await getRelatedRxcuiInfo(id);
  const rxinfo_filtered = rxinfo.allRelatedGroup.conceptGroup
    .find((x: any) => x.tty === "SBD")
    ?.conceptProperties.at(0);

  const ndc_resp = await getRelatedNDCs(id);
  const related_ndcs = ndc_resp.ndcGroup.ndcList.ndc;

  return {
    related_ndcs,
    rxinfo: rxinfo_filtered,
  };
}

const DrugViewPage = () => {
  const [data, setData] = useState<any>({});
  const params = useParams();
  const rxcui = params.id;

  useEffect(() => {
    if (!rxcui) return;
    fetchData(rxcui).then(setData);
  }, [rxcui]);

  return (
    <main className="container mx-auto space-y-6">
      <h1 className="text-3xl font-bold">Drug View - {rxcui}</h1>

      {data && (
        <div className="space-y-4">
          <section className="grid grid-cols-4 gap-2 justify-items-start">
            <div>ID</div>
            <div className="col-span-3">{rxcui}</div>
            <div>Name</div>
            <div className="col-span-3">{data.rxinfo?.name}</div>
            <div>Synonym</div>
            <div className="col-span-3">{data.rxinfo?.synonym}</div>
            <div>Language</div>
            <div className="col-span-3">{data.rxinfo?.language}</div>
          </section>
          <section className="flex gap-3 flex-wrap">
            <h2 className="font-bold">Related NDCs</h2>
            {data.related_ndcs?.map((ndc: string) => (
              <span className="px-4 py-1 rounded-full bg-indigo-500 text-white text-sm">
                {ndc}
              </span>
            ))}
          </section>
        </div>
      )}

      {/* <pre className="text-wrap">{JSON.stringify(data, null, 4)}</pre> */}
    </main>
  );
};

export default DrugViewPage;
