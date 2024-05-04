import { createContext, useContext, useState } from "react";

const DataContext = createContext();

export const DataContextProvider = ({children})=>{
    // userId-obj
    const [userObject, updateUserObject] = useState(null);

    // each product id would store temporary if the user clicks it changes dynamically
    const [productId, updateProduct] = useState();

    // kartId
    const [kartObj, updateKartObj] = useState(null);

    // login
    const login = (obj)=>{
        updateUserObject(obj);
    }

    // logout
    const logout = ()=>{
        updateUserObject(null);
    }

    // updateProduct
    const addProduct = (id)=>{
        updateProduct(id);
    }

    // updateKartObj
    const isKartObjPresent = (kartObj) =>{
        updateKartObj(kartObj);
    }

    return (
        <DataContext.Provider value={{userObject, login, logout, productId, addProduct, kartObj, isKartObjPresent}}>
            {children}
        </DataContext.Provider>
    )
};

// retireve by this method
export const useDataContext = ()=>{
    return useContext(DataContext);
}