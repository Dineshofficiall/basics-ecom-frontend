import { createContext, useContext, useState } from "react";
import { json } from "react-router-dom";

const DataContext = createContext();

export const DataContextProvider = ({children})=>{
    // userId-obj
    
    const [userObject, updateUserObject] = useState(JSON.parse(localStorage.getItem('user')) ?? null);

    // each product id would store temporary if the user clicks it changes dynamically
    const [productId, updateProduct] = useState();

    // kartId
    const [kartObj, updateKartObj] = useState(null);

    // login
    const login = (obj)=>{
        console.log('calling login...', obj);
        localStorage.setItem('user', JSON.stringify(obj));
        updateUserObject(obj);
    }

    // logout
    const logout = ()=>{
        console.log('calling logout...');
        localStorage.removeItem('user');
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