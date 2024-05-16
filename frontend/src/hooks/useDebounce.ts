// import {useEffect, useRef, useState} from "react";
//
// export default function useDebounce(value, delay = 459) {
//     const [debouncedValue, setDebouncedValue] = useState('')
//     const timeoutId = useRef(null)
//
//     useEffect(() => {
//         timeoutId.current = setTimeout(() => {
//             setDebouncedValue(value)
//         }, delay)
//
//         return () => {
//             clearTimeout(timeoutId.current)
//         }
//
//     }, [value, delay]);
//
//     return debouncedValue;
// }