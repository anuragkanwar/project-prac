import { Button } from "@/components/ui/button";
import { useState } from "react"
import { ProblemsTableView } from "./tableView";
import { ProblemsListView } from "./listView";

export const ProblemList = () => {
  const [tableView, setTableView] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center gap-2 overflow-hidden">

      <div className="w-full flex flex-row items-center">
        <div></div>
        <div className="flex flex-row items-center gap-2">
          <Button onClick={()=>setTableView((val)=>!val)} >Change View</Button>
        </div>
      </div>
      {tableView ? <ProblemsTableView /> : <ProblemsListView/>}
    </div>
  )
}