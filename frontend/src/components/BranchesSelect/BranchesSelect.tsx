import React, {FC, LegacyRef, useEffect, useState} from 'react';
import c from './BranchesSelect.module.scss'
import {IBranch} from "@/types/model.ts";
import BranchesSelectItem from "@components/BranchesSelectItem/BranchesSelectItem.tsx";
import {CSSTransition} from "react-transition-group";
import useOutsideClick from "@hooks/useOutsideClick.ts";
import {RoutePaths} from "@config/RoutePaths.ts";
import {createSearchParams, useLocation, useNavigate, useParams} from "react-router-dom";

interface BranchesSelectProps {
    branches: IBranch[]
    defaultSelectedBranch: IBranch
}

const BranchesListSelect: FC<BranchesSelectProps> = ({branches, defaultSelectedBranch}) => {
    const [isSelectVisible, setIsSelectVisible] = useState<boolean>(false);
    const [selectedBranch, setSelectedBranch] = useState<IBranch>(defaultSelectedBranch)
    const {companyId} = useParams()
    const navigate = useNavigate()
    const {pathname} = useLocation()
    const outsideClickRef: LegacyRef<HTMLDivElement> = useOutsideClick(() => {
        handleOutsideClick()
    })

    const handleOutsideClick = () => {
        closeSelect()
    }

    const handleOnItemClicked = (b: IBranch) => {
        if (selectedBranch.id === b.id) {
            return;
        }

        setSelectedBranch(b)
        closeSelect()
    }

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
                    <figure></figure>
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
                            <BranchesSelectItem title={b.title}/>
                        </li>
                    ))}
                </ul>
            </CSSTransition>
        </div>
    );
};

export default BranchesListSelect;