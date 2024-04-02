import React, { ReactNode, createContext, useState } from "react"

interface usernameContextType {
    username: string;
    setUsername: React.Dispatch<string>;
}

export const UsernameContext = createContext<usernameContextType>({} as usernameContextType);