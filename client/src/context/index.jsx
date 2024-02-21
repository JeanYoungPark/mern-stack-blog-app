import { createContext, useState } from "react";

export const GLobalContext = createContext(null)

export default function GlobalState({children}){
    const [formData, setFormData] = useState({
        title: '',
        description: ''
    })

    const [blogList, setBlogList] = useState([]);
    const [pending, setPending] = useState(false);
    const [isEdit, setIsEdit] = useState([])

    return <GLobalContext.Provider value={{formData, setFormData, blogList, setBlogList, pending, setPending, isEdit, setIsEdit}}>{children}</GLobalContext.Provider>
}

