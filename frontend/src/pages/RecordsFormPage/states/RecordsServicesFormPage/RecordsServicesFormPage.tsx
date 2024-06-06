import React, {FC, useEffect} from 'react';
import c from './RecordsServicesFormPage.module.scss'
import {Card, Descriptions, List, Space} from "antd";
import {useAppDispatch, useAppSelector} from "@hooks/reduxHooks.ts";
import {IService} from "@/types/model.ts";
import {getServicesThunk} from "@thunks/serviceThunk.ts";
import {useParams} from "react-router-dom";
import Meta from "antd/es/card/Meta";
import {
    SelectOutlined
} from '@ant-design/icons'

interface RecordsServicesFormPageProps {
    onServiceSelect?: (service: IService) => void
}

const RecordsServicesFormPage: FC<RecordsServicesFormPageProps> = ({onServiceSelect}) => {
    const dispatch = useAppDispatch()
    const {services} = useAppSelector(state => state.service)
    const {branchId, companyId} = useParams()

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
            <div className={c.list}>
                <List
                    itemLayout={'vertical'}
                    dataSource={services}
                    renderItem={(item) => {
                        return (
                            <List.Item onClick={() => handleOnClickItem(item)}>
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
            </div>
        </div>
    );
};

export default RecordsServicesFormPage;