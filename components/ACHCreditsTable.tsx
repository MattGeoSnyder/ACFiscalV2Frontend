import  { API_BASE_URL } from '@/app/constants';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
type SearchParams = { [key: string]: string | undefined }

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD'
})

export default async function ACHCreditsTable({ searchParams }: SearchParams ) {
  const params = new URLSearchParams(searchParams);

  const columns: { key: string, label: string }[] = [
    {key: 'received', label: "Received"}, 
    {key: "fund", label: "Fund"},
    {key: "amount", label: 'Amount'},
    {key: 'description', label: "Description"}
  ]

  type Credit = { id: number, received: string, fund: number, amount_in_cents: number, description: string}


  const res: any = await fetch(`${API_BASE_URL}/ach?outstanding=true&limit=10&${params.toString()}`)  
  const credits: { ach_credits: Credit[] } = await res.json();

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Received</TableHead>
          <TableHead>Fund</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>Description</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {credits.ach_credits.map((credit: Credit) => (
          <TableRow>
            <TableCell>{credit.received}</TableCell>
            <TableCell>{credit.fund}</TableCell>
            <TableCell>{formatter.format(credit.amount_in_cents)}</TableCell>
            <TableCell>{credit.description}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )

}
