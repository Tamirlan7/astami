import React, {FC, HTMLAttributes} from 'react';
import c from './CompanyItem.module.scss'
import {ICompany} from "@/types/model.ts";
import NextIcon from '@assets/icons/next.svg?react'
import {useNavigate} from "react-router-dom";
import {RoutePaths} from "@config/RoutePaths.ts";

interface CompanyItemProps extends HTMLAttributes<HTMLDivElement> {
    company: ICompany
    isLastItem?: boolean
}

const CompanyItem: FC<CompanyItemProps> = ({company, isLastItem, ...props}) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigateToDashboard()
    }

    const navigateToDashboard = () => {
        navigate(RoutePaths.DASHBOARD.replace(':companyId', company.id.toString()))
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