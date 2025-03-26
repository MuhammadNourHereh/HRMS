import { createContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"


export const AppContext = createContext(null)




export function AppProvider({ children }) {
    const navigate = useNavigate()

    return (
        <AppContext.Provider value={{
            navigate,

        }}>
            {children}
        </AppContext.Provider>
    )
}