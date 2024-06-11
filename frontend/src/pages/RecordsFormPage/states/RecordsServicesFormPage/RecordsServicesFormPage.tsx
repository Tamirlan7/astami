import React, {FC, useCallback, useEffect, useMemo, useRef, useState} from 'react';
import c from './RecordsServicesFormPage.module.scss'
import {Card, Descriptions, Divider, List, Skeleton, Space} from "antd";
import {useAppDispatch, useAppSelector} from "@hooks/reduxHooks.ts";
import {IService} from "@/types/model.ts";
import {getServicesThunk} from "@thunks/serviceThunk.ts";
import {useParams} from "react-router-dom";
import Meta from "antd/es/card/Meta";
import {
    SelectOutlined
} from '@ant-design/icons'
import Title from "@ui/Title/Title.tsx";
import {IGetServicesResponse} from "@/types/payload.ts";
import BackendEndpoints from "@config/BackendEndpoints.ts";
import {HttpMethod} from "@/types/types.ts";

interface RecordsServicesFormPageProps {
    onServiceSelect?: (service: IService) => void
}

const RecordsServicesFormPage: FC<RecordsServicesFormPageProps> = ({onServiceSelect}) => {
    const dispatch = useAppDispatch()
    const {currentCompany} = useAppSelector(state => state.company)
    const {lastRequest: serviceLastRequest} = useAppSelector(state => state.service)
    const {branchId, companyId} = useParams()
    const [servicesCurrentPage, setServicesCurrentPage] = useState(0);
    const [loading, setLoading] = useState<boolean>()
    const [servicesResponse, setServicesResponse] = useState<IGetServicesResponse>();
    const observer = useRef<IntersectionObserver | null>(null);
    const services = useMemo<IService[]>(() => servicesResponse?.services ?? [], [servicesResponse?.services])

    const hasMore = useMemo(() => {
        return !servicesResponse?.last
    }, [servicesResponse?.last])

    useEffect(() => {
        async function fetchServices() {
            if (currentCompany && hasMore && servicesCurrentPage !== servicesResponse?.currentPage) {
                try {
                    setLoading(true)
                    const res = await dispatch(getServicesThunk({
                        companyId: currentCompany.id,
                        branchId: currentCompany.currentBranch.id,
                        page: servicesCurrentPage,
                    }))

                    const servicesResponse = res.payload as IGetServicesResponse
                    setServicesResponse((prev) => {
                        let services: IService[] = []

                        if (prev) services = [...prev.services, ...servicesResponse.services]
                        else services = [...servicesResponse.services]

                        return {
                            ...servicesResponse,
                            services: services
                        }
                    })
                } catch (_) {
                    setLoading(false)

                } finally {
                    setLoading(false)
                }
            }
        }

        fetchServices()

    }, [currentCompany, dispatch, hasMore, servicesCurrentPage, servicesResponse?.currentPage])

    const lastServiceRef = useCallback((node) => {
        if (serviceLastRequest.isPending && serviceLastRequest.path === BackendEndpoints.GET_SERVICES && serviceLastRequest.method === HttpMethod.GET) return
        if (observer.current) observer.current?.disconnect()

        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {
                setServicesCurrentPage(prev => prev + 1)
            }
        })

        if (node) observer.current?.observe(node);
    }, [hasMore, serviceLastRequest.isPending, serviceLastRequest.method, serviceLastRequest.path])

    useEffect(() => {
        dispatch(getServicesThunk({
            companyId: Number(companyId),
            branchId: Number(branchId),
        }))
    }, [branchId, companyId, dispatch]);

    const handleOnClickItem = (service: IService) => {
        if (onServiceSelect) {
            onServiceSelect(service)
        }
    }

    return (
        <div className={c.block}>
            <div className={c.container}>
                <div className={c.header}>
                    <Title style={{marginBottom: 5}}>Онлайн Запись</Title>
                    {currentCompany && (
                        <div className={c.title}>
                            <h2>{currentCompany.title}</h2>
                            <h3><strong>({currentCompany.currentBranch.title})</strong></h3>
                        </div>
                    )}
                    <p>Выберите одно из нижеперечисленных услуг:</p>
                </div>

                <Divider/>

                <div className={c.list}>
                    <List
                        itemLayout={'vertical'}
                        dataSource={services}
                        renderItem={(item, idx) => {

                            const isLastItem: boolean = idx === services.length - 1

                            return (
                                <List.Item ref={(ref: HTMLDivElement) => {
                                    if (isLastItem) {
                                        lastServiceRef(ref)
                                    }
                                }} onClick={() => handleOnClickItem(item)}>
                                    <Card hoverable size={'small'} bordered={false}>
                                        <Space direction={'horizontal'}>
                                            <div>
                                                <Meta title={item.title}/>
                                                <Descriptions column={1}>
                                                    <Descriptions.Item style={{paddingBottom: 0, paddingTop: 10}}
                                                                       label={'Цена'}>{item.price}</Descriptions.Item>
                                                    <Descriptions.Item style={{paddingBottom: 10}}
                                                                       label={'Длительность'}>{item.duration}</Descriptions.Item>
                                                </Descriptions>
                                                <Meta description={`${item.description.slice(0, 25)}...`}/>
                                            </div>

                                            <figure className={c.icon}>
                                                <SelectOutlined/>
                                            </figure>
                                        </Space>

                                    </Card>
                                </List.Item>
                            )
                        }}
                    />
                    <Skeleton active loading={loading} paragraph={{ rows: 4 }} />
                </div>
            </div>
        </div>
    );
};

export default RecordsServicesFormPage;