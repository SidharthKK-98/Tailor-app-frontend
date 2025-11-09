import { createContext, useContext, useState } from "react";


export const AddedItemContext=createContext()

export const useAddedItemContext=()=>{
    return useContext(AddedItemContext)
}

export const AddedItemContextProvider=({children})=>{

    const [addedItem,setAddedItem]=useState([])

    return <AddedItemContext.Provider value={{addedItem,setAddedItem}}>
            {children}
    </AddedItemContext.Provider>
}