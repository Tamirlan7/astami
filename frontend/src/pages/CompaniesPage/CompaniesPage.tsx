import c from './CompaniesPage.module.scss'
import CompaniesList from "@components/CompaniesList/CompaniesList.tsx";
import Container from "@components/Container/Container.tsx";
import {ICompany} from "@/types/model.ts";
import SearchInput from "@ui/SearchInput/SearchInput.tsx";
import {ChangeEvent, useEffect, useMemo, useState} from "react";
import Title from "@ui/Title/Title.tsx";
import Button from "@ui/Button/Button.tsx";
import {useNavigate} from "react-router-dom";
import {RoutePaths} from "@config/RoutePaths.ts";
import {useAppDispatch, useAppSelector} from "@hooks/reduxHooks.ts";
import {getUserCompaniesThunk} from "@thunks/companyThunk.ts";


function CompaniesPage() {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [filterCompaniesValue, setFilterCompaniesValue] = useState<string>('')
    const {companies, lastRequest} = useAppSelector(state => state.company)
    const filteredCompanies = useMemo<ICompany[]>(() => {
        return companies.filter(c => c.title.toLowerCase().includes(filterCompaniesValue.trim().toLowerCase()))
    }, [filterCompaniesValue, companies]);

    useEffect(() => {
        dispatch(getUserCompaniesThunk())
    }, [dispatch]);

    const handleFilter = (e: ChangeEvent<HTMLInputElement>) => {
        setFilterCompaniesValue(e.target.value)
    }

    const handleAddCompany = () => {
        navigateToForm()
    }

    const navigateToForm = () => {
        navigate(RoutePaths.COMPANIES_FORM)
    }

    return (
        <div className={c.block}>
            <Container>
                <div className={c.inner}>

                    <div className={c.content}>

                        <div className={c['text-block']}>
                            <Title>Компании</Title>
                            <p>Здесь находятся список компании созданные вами</p>
                        </div>

                        <div className={c.btns}>
                            <div className={c.search}>
                                <SearchInput
                                    disabled={companies.length === 0}
                                    onChange={handleFilter}
                                    value={filterCompaniesValue}
                                    className={c.input}
                                    rootClassName={c['input-root']}/>
                            </div>
                            <Button onClick={handleAddCompany} className={c.btn} rootClassName={c['btn-root']}>
                                Добавить
                            </Button>
                        </div>

                        <div className={c.list}>
                            <CompaniesList isLoading={lastRequest.isPending} companies={filteredCompanies}/>
                        </div>
                    </div>

                </div>
            </Container>
        </div>
    );
}

export default CompaniesPage;