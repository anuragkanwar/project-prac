import type { FC, ReactNode } from "react";
import { ScrollArea } from "../ui/scroll-area";
import { Header } from "./header";

interface BaseLayoutInterface {
  children: ReactNode;
}

export const BaseLayout: FC<BaseLayoutInterface> = ({ children }) => {
  return (
    <div className="h-screen w-screen max-h-screen max-w-screen flex flex-col overflow-hidden">
      <Header />
      <ScrollArea className="grow w-full min-h-0">
        {children}
      </ScrollArea>
    </div>
  )
}
