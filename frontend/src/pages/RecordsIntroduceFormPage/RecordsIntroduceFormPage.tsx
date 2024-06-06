import React, {FC} from 'react';
import c from './RecordsIntroduceFormPage.module.scss'
import Container from "@components/Container/Container.tsx";
import IntroduceTitle from "@ui/IntroduceTitle/IntroduceTitle.tsx";
import {Button, Card, Space} from "antd";
import ServiceIcon from '@assets/icons/service.svg?react'
import ClockIcon from '@assets/icons/clock.svg?react'
import ProfileIcon from '@assets/icons/profile.svg?react'

const RecordsIntroduceFormPage: FC = () => {
    return (
        <div className={c.block}>
            <Container>

                <div className={c.inner}>
                    <div className={c.main}>
                        <div className={c.content}>
                            <div>
                                <IntroduceTitle
                                    title={'Онлайн Запись'}
                                    gap={15}
                                    description={(
                                        <p className={c['introduce-description']}>Здесь вы можете записаться на услугу у компании <span>company_name</span> и выбрать
                                            удобное для вас время, а так же специалиста</p>
                                    )}
                                />
                            </div>

                            <div className={c.list}>
                                <Card className={c.item}>
                                    <Space className={c['item-inner']} direction={'horizontal'}>
                                        <figure><ServiceIcon/></figure>
                                        Выбрать услугу
                                    </Space>
                                </Card>
                                <Card className={c.item}>
                                    <Space className={c['item-inner']} direction={'horizontal'}>
                                        <figure><ClockIcon/></figure>
                                        Выбрать время
                                    </Space>
                                </Card>
                                <Card className={c.item}>
                                    <Space className={c['item-inner']} direction={'horizontal'}>
                                        <figure><ProfileIcon/></figure>
                                        Выбрать специалиста
                                    </Space>
                                </Card>
                            </div>

                            <div className={c.btns}>
                                <Button type={'primary'} className={c.btn}>Далее</Button>
                            </div>
                        </div>
                    </div>
                </div>

            </Container>
        </div>
    );
};

export default RecordsIntroduceFormPage;