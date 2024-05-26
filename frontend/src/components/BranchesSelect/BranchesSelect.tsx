import React, {FC, LegacyRef, useEffect, useRef, useState} from 'react';
import c from './BranchesSelect.module.scss'
import {IBranch} from "@/types/model.ts";
import BranchesSelectItem from "@components/BranchesSelectItem/BranchesSelectItem.tsx";
import {CSSTransition} from "react-transition-group";
import useOutsideClick from "@hooks/useOutsideClick.ts";
import {RoutePaths} from "@config/RoutePaths.ts";
import {createSearchParams, useLocation, useNavigate, useParams} from "react-router-dom";
import DropDownIcon from '@assets/icons/drop-down.svg?react';
import {useAppDispatch} from "@hooks/reduxHooks.ts";
import {updateLastRequestedBranchThunk} from "@thunks/branchThunk.ts";
import {changeCurrentBranch} from "@slices/companySlice.ts";

interface BranchesSelectProps {
    branches: IBranch[]
    defaultSelectedBranch: IBranch
}

const BranchesListSelect: FC<BranchesSelectProps> = ({branches, defaultSelectedBranch}) => {
    const [isSelectVisible, setIsSelectVisible] = useState<boolean>(false);
    const [selectedBranch, setSelectedBranch] = useState<IBranch>(defaultSelectedBranch)
    const {companyId} = useParams()
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const {pathname} = useLocation()
    const outsideClickRef: LegacyRef<HTMLDivElement> = useOutsideClick(() => {
        handleOutsideClick()
    })
    const [updateLastRequestedBranchTimeoutId, setUpdateLastRequestedBranchTimeoutId] = useState<{
        id: number | null,
        fired: boolean
    }>({
        id: null,
        fired: false
    });

    const handleOutsideClick = () => {
        closeSelect()
    }

    const handleOnItemClicked = (b: IBranch) => {
        if (selectedBranch.id === b.id) {
            return;
        }

        setSelectedBranch(b)
        dispatch(changeCurrentBranch(b))
        setUpdateLastRequestedBranchTimeoutId({
            fired: false,
            id: setTimeout(() => {
                dispatch(updateLastRequestedBranchThunk({
                    branchId: b.id,
                    companyId: b.companyId
                }))
                setUpdateLastRequestedBranchTimeoutId((prev) => ({...prev, fired: true}))
            }, 5000)
        })
        closeSelect();
    }

    useEffect(() => {
        if (updateLastRequestedBranchTimeoutId.id && updateLastRequestedBranchTimeoutId.fired) {
            clearTimeout(updateLastRequestedBranchTimeoutId.id)
        }

        return () => {
            if (updateLastRequestedBranchTimeoutId.id) {
                clearTimeout(updateLastRequestedBranchTimeoutId.id)
            }
        }
    }, [updateLastRequestedBranchTimeoutId]);

    const toggleSelect = () => {
        setIsSelectVisible(!isSelectVisible)
    }

    const closeSelect = () => {
        setIsSelectVisible(false)
    }

    const handleOnTitleClick = () => {
        toggleSelect()
    }

    const handleOnAddMoreClick = () => {
        if (companyId) {
            navigate({
                pathname: RoutePaths.BRANCH_FORM,
                search: createSearchParams({
                    companyId: companyId,
                    redirectBack: pathname
                }).toString(),
            })
        }
    }

    return (
        <div className={c.wrapper} ref={outsideClickRef}>
            <div className={c.title}>
                <div className={c['inner-title']} onClick={handleOnTitleClick}>
                    <span>{selectedBranch.title}</span>
                    <figure className={c.icon}><DropDownIcon/></figure>
                </div>
            </div>

            <CSSTransition
                in={isSelectVisible}
                timeout={{
                    enter: 250,
                    exit: 0
                }}
                classNames={{
                    enter: c['list-enter'],
                    enterDone: c['list-enter-done']
                }}
                unmountOnExit
                mountOnEnter
            >
                <ul className={c.list}>
                    <li onClick={handleOnAddMoreClick} className={`${c.item}`}>
                        <BranchesSelectItem title={'Добавить филиал +'}/>
                    </li>
                    {branches.map((b) => (
                        <li key={b.id} className={c.item} onClick={() => handleOnItemClicked(b)}>
                            <BranchesSelectItem selectedBranch={b.id === selectedBranch.id} title={b.title}/>
                        </li>
                    ))}
                </ul>
            </CSSTransition>
        </div>
    );
};

export default BranchesListSelect;