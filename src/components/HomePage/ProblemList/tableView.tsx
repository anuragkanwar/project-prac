import { Problems } from "@/data/problems"

export const ProblemsTableView = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-2 overflow-hidden">
      {Problems.map((problem) => {
        return (
          <div key={problem.id} className="flex flex-row justify-center items-center">
            <div>{problem.title}</div>
          </div>
        )
      }
      )}
    </div>
  )
}