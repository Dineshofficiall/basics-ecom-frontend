// eslint-disable-next-line no-unused-vars
import React from 'react'
import { useDataContext } from '../useContext/DataContext'
import { Navigate } from 'react-router-dom';

export const RequiresAuth = ({children}) =>{
    const dataContext = useDataContext();

    if (dataContext.userObject === null){
        return <Navigate to='/' />
    }
    return children;
}

export default RequiresAuth