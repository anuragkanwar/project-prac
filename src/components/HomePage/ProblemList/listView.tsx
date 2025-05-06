import { DataTable } from "./commonTable/commonTableView"
import type { ColumnDef } from "@tanstack/react-table"
import { CombinedProblem } from "@/types/storage"

interface ProblemsListViewType {
  data: CombinedProblem[]
  columns: ColumnDef<CombinedProblem>[]
}

export const ProblemsListView: React.FC<ProblemsListViewType> = ({ columns, data }) => {
  return (
    <div className="w-full flex flex-col items-center justify-center gap-2 overflow-hidden">
      <DataTable isPaginated={true} data={data} columns={columns} />
    </div>
  )
}
