import { Button } from "@/components/ui/button";
import { useState } from "react"
import { ProblemsTableView } from "./tableView";
import { ProblemsListView } from "./listView";
import { Group, List, Shuffle } from "lucide-react";

export const ProblemList = () => {
  const [groupView, setGroupView] = useState(true);

  return (
    <div className="w-full flex flex-col items-center justify-center gap-2 overflow-hidden">

      <div className="w-4/5 flex flex-row justify-between items-center rounded-md bg-accent p-2">
        <div></div>
        <div className="flex flex-row items-center gap-2 ">
          <Button size={"icon"} onClick={() => setGroupView((val) => !val)} >{groupView ? <Group /> : <List />}</Button>
          <Button size={"icon"} > <Shuffle /> </Button>
        </div>
      </div>
      <div className="w-4/5">
        {groupView ? <ProblemsTableView /> : <ProblemsListView />}
      </div>
    </div>
  )
}
