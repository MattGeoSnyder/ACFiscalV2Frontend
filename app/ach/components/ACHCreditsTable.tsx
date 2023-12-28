import  { API_BASE_URL } from '@/app/constants';

type Credits = {
  credits: Array<any>;
}

export default async function ACHCreditsTable() {

  try {
    const res: any = await fetch(`${API_BASE_URL}/ach?outstanding=true`)  
    const credits = await res.json();
    console.log(credits)
  } catch (error) {
    console.log(error);  
  }

  return (
    <div>
      <table>
        <thead>
        </thead>
      </table>
    </div>
  )
}
