import { useParams } from "react-router-dom";
import { getRelatedNDCs } from "../api/searchDrugs";

async function fetchData(id?: string) {
  if (!id) return {};
  const resp = await getRelatedNDCs(id);
  // console.log(resp);
  return resp;
}

const DrugViewPage = () => {
  const params = useParams();
  console.log(params);
  const rxcui = params.id;
  const data = fetchData(rxcui);
  return (
    <main>
      <div>DrugViewPage - {rxcui}</div>
      <pre>{JSON.stringify(data)}</pre>
    </main>
  );
};

export default DrugViewPage;
