import { Problems } from "@/data/problems"
import { Category } from "@/types/problem"
import { CombinedProblem } from "@/types/storage"
import { ColumnDef } from "@tanstack/react-table"
import { useMemo } from "react"
import { DataTable } from "./commonTable/commonTableView"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

interface ProblemsGroupViewType {
  data: Record<Category, CombinedProblem[]> | null
  columns: ColumnDef<CombinedProblem>[]
}

export const ProblemsGroupView: React.FC<ProblemsGroupViewType> = ({ columns, data }) => {

  if (data == null) {
    return <div>No data</div>
  }
  return (
    <div className="w-full flex flex-col items-center justify-center gap-2 overflow-hidden">
      <Accordion type="single" collapsible className="w-full">
        {Object.entries(data).map(([category, problemsInCategory]) => (
          <AccordionItem value={category}>
            <AccordionTrigger className={"hover:bg-accent hover:cursor-pointer"} >{category}</AccordionTrigger>
            <AccordionContent>
              {problemsInCategory.length > 0 ? (
                <DataTable isPaginated={false} data={problemsInCategory} columns={columns} />
              ) : (
                <p>No problems in this category.</p>
              )}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}
