import { Button } from "@/components/ui/button";
import { useCallback, useEffect, useMemo, useState } from "react";
import { ProblemsGroupView } from "./groupView";
import { ProblemsListView } from "./listView";
import { Group, List, Shuffle, Star } from "lucide-react";
import { loadUserProgress, saveUserProgress } from "@/lib/utils";
import { CombinedProblem, UserProgressStorage } from "@/types/storage";
import { Problems } from "@/data/problems";
import { Category } from "@/types/problem";
import { Badge, BadgeVariantType } from "@/components/ui/badge";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { Link } from "@tanstack/react-router";
import { Checkbox } from "@/components/ui/checkbox";

const columnHelper = createColumnHelper<CombinedProblem>()

export const ProblemList = () => {
  const [groupView, setGroupView] = useState(true);
  const [userProgress, setUserProgress] = useState<UserProgressStorage>(loadUserProgress());
  const [combinedData, setCombinedData] = useState<CombinedProblem[]>([]);

  useEffect(() => {
    const loadedProgress = loadUserProgress();
    setUserProgress(loadedProgress);

    const merged = Problems.map(problem => ({
      ...problem,
      starred: loadedProgress[problem.id]?.starred || false,
      done: loadedProgress[problem.id]?.done || false,
    }));
    setCombinedData(merged);
  }, [])


  useEffect(() => {
    saveUserProgress(userProgress)
    setCombinedData(prevCombinedData =>
      prevCombinedData.map(problem => ({
        ...problem,
        starred: userProgress[problem.id]?.starred || false,
        done: userProgress[problem.id]?.done || false,
      }))
    );
  }, [userProgress])

  const handleToggleStarred = useCallback((problemId: string) => {
    setUserProgress(prevProgress => {
      const currentProblemProgress = prevProgress[problemId] || { marked: false, done: false };
      return {
        ...prevProgress,
        [problemId]: {
          ...currentProblemProgress,
          starred: !currentProblemProgress.starred,
        },
      };
    });
  }, []);

  const handleToggleDone = useCallback((problemId: string) => {
    setUserProgress(prevProgress => {
      const currentProblemProgress = prevProgress[problemId] || { starred: false, done: false };
      return {
        ...prevProgress,
        [problemId]: {
          ...currentProblemProgress,
          done: !currentProblemProgress.done,
        },
      };
    });
  }, []);


  const groupedData = useMemo(() => {
    if (!groupView) return null; // Only compute if needed

    return combinedData.reduce((acc, problem) => {
      const category = problem.category;
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(problem);
      return acc;
    }, {} as Record<Category, CombinedProblem[]>);
  }, [combinedData, groupView]);


  const columns = [

    columnHelper.accessor('done', {
      header: () => <div className="text-center">Marked</div>,
      cell: ({ row, getValue }) => {
        return (
          <div className=" flex flex-row justify-center items-center">
            <Checkbox className="hover:cursor-crosshair"
              checked={getValue()}
              onCheckedChange={() => {
                row.toggleSelected(!getValue())
                handleToggleDone(row.original.id)
              }}
              aria-label="Select row"
            />
          </div>
        )
      }
    }),

    columnHelper.accessor('starred', {
      header: () => <div className="text-center">Starred</div>,
      cell: ({ row, getValue }) => {
        return (
          <div className=" flex flex-row justify-center items-center">
            <Star
              onClick={() => handleToggleStarred(row.original.id)}
              className={"text-yellow-400 hover:cursor-crosshair"}
              fill={getValue() ? "oklch(85.2% 0.199 91.936)" : ""} />
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
        {groupView ? <ProblemsGroupView columns={columns as ColumnDef<CombinedProblem>[]} data={groupedData} /> : <ProblemsListView columns={columns as ColumnDef<CombinedProblem>[]} data={combinedData} />}
      </div>
    </div>
  )
}
