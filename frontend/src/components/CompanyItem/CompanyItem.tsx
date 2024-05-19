import React, {FC, HTMLAttributes} from 'react';
import c from './CompanyItem.module.scss'
import {ICompany} from "@/types/model.ts";
import NextIcon from '@assets/icons/next.svg?react'

interface CompanyItemProps extends HTMLAttributes<HTMLDivElement> {
    company: ICompany
    isLastItem?: boolean
}

const CompanyItem: FC<CompanyItemProps> = ({company, isLastItem, ...props}) => {

    return (
        <div className={`${c.item} ${isLastItem && c.last}`}
             {...props}
        >
            <h5 className={c.title}>{company.title}</h5>

            <figure className={c.icon}>
                <NextIcon/>
            </figure>
        </div>
    )
}

export default CompanyItem;