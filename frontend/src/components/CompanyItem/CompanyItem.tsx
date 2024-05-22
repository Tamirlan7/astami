import React, {FC, HTMLAttributes} from 'react';
import c from './CompanyItem.module.scss'
import {ICompany} from "@/types/model.ts";
import NextIcon from '@assets/icons/next.svg?react'
import {createSearchParams, useNavigate} from "react-router-dom";
import {RoutePaths} from "@config/RoutePaths.ts";
import {useAppDispatch} from "@hooks/reduxHooks.ts";

interface CompanyItemProps extends HTMLAttributes<HTMLDivElement> {
    company: ICompany
    isLastItem?: boolean
}

const CompanyItem: FC<CompanyItemProps> = ({company, isLastItem, ...props}) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const handleClick = () => {
        navigateToControlPanel()
    }

    const navigateToControlPanel = () => {
        const companyId = company.id.toString()
        let branchId: string;

        if (company.lastRequestBranch) {
            branchId = company.lastRequestBranch.id.toString();
        } else if (company.branches.length) {
            dispatch(updateLastRequestedBranchThunk(companyId, branchId))
            branchId = company.branches[0].id.toString();
        } else {
            navigate({
                pathname: RoutePaths.BRANCH_FORM,
                search: createSearchParams({
                    companyId: companyId,
                }).toString(),
            })

            return;
        }

        navigate(RoutePaths.RECORDS
            .replace(':companyId', companyId)
            .replace(':branchId', branchId)
        )
    }

    return (
        <div {...props}
             className={`${c.item} ${isLastItem && c.last}`}
             onClick={handleClick}
        >
            <h5 className={c.title}>{company.title}</h5>

            <figure className={c.icon}>
                <NextIcon/>
            </figure>
        </div>
    )
}

export default CompanyItem;