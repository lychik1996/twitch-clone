"use client";

import { useEffect, useState } from "react";

export const UseDebounce = (value:string,delay:number)=>{
    const [debouncedvalue, setDebouncedValue] = useState(value);

    useEffect(()=>{
        const handler = setTimeout(()=>{
            setDebouncedValue(value)
        },delay);
        return ()=>{
            clearTimeout(handler)
        }
    },[value,delay]);

    return debouncedvalue;
}