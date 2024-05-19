import React, {FC, useMemo} from 'react';
import c from './CompaniesList.module.scss'
import {ICompany} from "@/types/model.ts";
import CompanyItem from "@components/CompanyItem/CompanyItem.tsx";
import {Empty, Skeleton} from "antd";

interface CompaniesListProps {
    companies: ICompany[]
    isLoading?: boolean
}

const CompaniesList: FC<CompaniesListProps> = ({companies, isLoading}) => {

    return (
        <Skeleton active title={false} paragraph={{rows: 5, width: '100%'}} loading={isLoading}>
            {companies.length === 0 ? (
                <Empty description={'Список компании пуст'}
                       rootClassName={c['empty-root']}/>
            ) : (
                <ul className={c.list}>
                    {companies.map((company, idx) => (
                        <li key={company.id} className={c.item}>
                            <CompanyItem isLastItem={companies.length - 1 === idx}
                                         company={company}
                            />
                        </li>
                    ))}
                </ul>
            )}
        </Skeleton>
    );
}

export default CompaniesList;