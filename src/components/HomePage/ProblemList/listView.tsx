import { Problems } from "@/data/problems"
import { DataTable } from "./commonTable/commonTableView"
import { Columns } from "./commonTable/columns"
import type { ColumnDef } from "@tanstack/react-table"
import type { Problem } from "@/types/problem"

export const ProblemsListView = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center gap-2 overflow-hidden">
      <DataTable isPaginated={true} data={Problems} columns={Columns as ColumnDef<Problem>[]} />
    </div>
  )
}
