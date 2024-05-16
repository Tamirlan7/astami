// import {useCallback, useEffect} from "react";
// import {useDispatch} from "react-redux";
// import {getAllCollectionsThunk} from "../thunks/collectionThunks";
// import {getAllClothingTypesThunk} from "../thunks/clothingTypeThunks";
// import {changeDeviceSize} from "../slices/appSlice";
//
// export default function useInitialize() {
//     const dispatch = useDispatch()
//
//     const handleResize = useCallback(() => {
//         dispatch(changeDeviceSize({
//             width: window.innerWidth,
//             height: window.innerHeight,
//         }))
//     }, [dispatch])
//
//     useEffect(() => {
//         dispatch(getAllCollectionsThunk())
//         dispatch(getAllClothingTypesThunk())
//
//         window.addEventListener('resize', handleResize)
//
//         handleResize()
//
//         return () => {
//             window.removeEventListener('resize', handleResize)
//         }
//     }, [dispatch, handleResize]);
//
// }