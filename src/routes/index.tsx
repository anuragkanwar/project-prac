import { ProblemList } from '@/components/HomePage/ProblemList'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  return (
    <div className="w-full flex flex-col">
      <ProblemList />
    </div >
  )
}
