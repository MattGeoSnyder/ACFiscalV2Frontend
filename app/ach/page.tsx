import { useSearchParams } from "next/navigation";
import ACHCreditsTable from "../../components/ACHCreditsTable"
import { API_BASE_URL } from "@/app/constants";
import { Suspense } from "react";
import { ACHSearchForm } from "@/components/ACHSearchForm";

type SearchParams = { [key: string]: string | undefined }

// export async function getServerSideProps() {
//   const res = await fetch(`${API_BASE_URL}/ach?outstanding=true`)  
//   const credits = await res.json();
//   console.log(credits)
//   return { props: { credits }}
// }

export default function AchPage({ searchParams }: SearchParams) {
  console.log(searchParams);
  return (
    <div className="flex flex-col items-center">
      <ACHSearchForm />
      <div className="lg:w-5/6 flex-1">
        <ACHCreditsTable searchParams={searchParams}/>
      </div>
    </div>
  )
}
