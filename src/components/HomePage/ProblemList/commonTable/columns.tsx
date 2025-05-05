import { Badge, type BadgeVariantType } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import type { Problem } from "@/types/problem"
import { Link } from "@tanstack/react-router"
import { createColumnHelper } from "@tanstack/react-table"
import { Star } from "lucide-react"
import { useState } from "react"

const columnHelper = createColumnHelper<Problem>()

export const Columns = [

  columnHelper.display({
    id: "checked",
    header: () => <div className="text-center">Marked</div>,
    cell: ({ row }) => {
      return (
        <div className=" flex flex-row justify-center items-center">
          <Checkbox className="hover:cursor-crosshair"
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
          />
        </div>
      )
    }
  }),

  columnHelper.display({
    id: "star",
    header: () => <div className="text-center">Starred</div>,
    cell: ({ }) => {
      const [isStarred, setIsStarred] = useState(false);
      return (
        <div className=" flex flex-row justify-center items-center">
          <Star onClick={() => setIsStarred((val) => !val)} className={"text-yellow-400 hover:cursor-crosshair"} fill={isStarred ? "oklch(85.2% 0.199 91.936)" : ""} />
        </div>
      )
    }
  }),

  columnHelper.accessor('title', {
    header: "Problem",
    cell: ({ row }) => {
      return (
        <Link className="hover:text-blue-600" target="_blank" to={row.original.url} >{row.original.title}</Link>
      )
    }
  }),

  columnHelper.accessor('concept_difficulty', {
    header: () => <div className="text-center">Concept</div>,
    cell: ({ getValue }) => {
      return (
        <div className="flex flex-row justify-center items-center">
          <Badge variant={`difficulty_${getValue().toLowerCase()}` as BadgeVariantType} >{getValue()}</Badge>
        </div>
      )
    }
  }),

  columnHelper.accessor('code_difficulty', {
    header: () => <div className="text-center">Code</div>,
    cell: ({ getValue }) => {
      return (
        <div className="flex flex-row justify-center items-center">
          <Badge variant={`difficulty_${getValue().toLowerCase()}` as BadgeVariantType} >{getValue()}</Badge>
        </div>)
    }
  })

]
