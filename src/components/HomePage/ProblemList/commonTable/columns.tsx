import { Badge, type BadgeVariantType } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import type { Problem } from "@/types/problem"
import { Link } from "@tanstack/react-router"
import { createColumnHelper } from "@tanstack/react-table"

const columnHelper = createColumnHelper<Problem>()

export const Columns = [

  columnHelper.display({
    id: "checked",
    cell: ({ }) => {
      return (
        <Checkbox />
      )
    }
  }),

  columnHelper.accessor('title', {
    cell: ({ row }) => {
      return (
        <Link className="block hover:text-blue-600" target="_blank" to={row.original.url} >{row.original.title}</Link>
      )
    }
  }),

  columnHelper.accessor('concept_difficulty', {
    cell: ({ getValue }) => {
      return (
        <Badge variant={`difficulty_${getValue().toLowerCase()}` as BadgeVariantType} >{getValue()}</Badge>
      )
    }
  }),

  columnHelper.accessor('code_difficulty', {
    cell: ({ getValue }) => {
      return (
        <Badge variant={`difficulty_${getValue().toLowerCase()}` as BadgeVariantType} >{getValue()}</Badge>
      )
    }
  })

]
