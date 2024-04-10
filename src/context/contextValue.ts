import { createContext } from "react";

import { IContext } from "./types";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
export const Context = createContext<IContext>({});
