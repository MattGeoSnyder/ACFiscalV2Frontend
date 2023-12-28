import ACHCreditsTable from "./components/ACHCreditsTable"
import { API_BASE_URL } from "@/app/constants";

type Credits = {
  credits: Array<any>;
}

// export async function getServerSideProps() {
//   const res = await fetch(`${API_BASE_URL}/ach?outstanding=true`)  
//   const credits = await res.json();
//   console.log(credits)
//   return { props: { credits }}
// }

export default function AchPage() {

  return (
    <div className="w-full h-full flex flex-col items-center">
      <form>
        <input name=""></input>
      </form>
      <ACHCreditsTable />
    </div>
  )
}
