import React, {FC, LegacyRef, useMemo, useRef, useState} from 'react';
import c from './ControlPanelMenu.module.scss'
import controlPanelPages from "@/data/controlPanelPages.tsx";
import BurgerMenuIcon from '@assets/icons/burger-menu.svg?react'
import CompanyIcon from '@assets/icons/company.svg?react'
import ControlPanelMenuItem from "@components/ControlPanelMenuItem/ControlPanelMenuItem.tsx";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {Divider, Input, InputRef, Modal} from "antd";
import IntroduceTitle from "@ui/IntroduceTitle/IntroduceTitle.tsx";
import {CopyOutlined} from '@ant-design/icons'
import {RoutePaths} from "@config/RoutePaths.ts";
import {useAppDispatch, useAppSelector} from "@hooks/reduxHooks.ts";
import {raisePopupNotification} from "@slices/popupNotificationSlice.ts";

interface ControlPanelMenuProps {
    burgerMenuState?: boolean
    onBurgerMenuStateChanged?: (value: boolean) => void
}

const ControlPanelMenu: FC<ControlPanelMenuProps> = ({onBurgerMenuStateChanged, burgerMenuState}) => {
    const {companyId} = useParams()
    const dispatch = useAppDispatch()
    const {currentCompany} = useAppSelector(state => state.company)
    const [companyModal, setCompanyModal] = useState(false)
    const navigate = useNavigate();
    const copyInputRef = useRef<InputRef>(null)

    const copyToClipboard = () => {

    }

    const onCopy = () => {
        // Select the text field
        if (copyInputRef.current && copyInputRef.current.input) {
            copyInputRef.current.select();
            copyInputRef.current.setSelectionRange(0, 99999); // For mobile devices

            // Copy the text inside the text field
            navigator.clipboard.writeText(copyInputRef.current.input.value);
            dispatch(raisePopupNotification({
                type: 'success',
                message: 'Текст успешно скопирован',
                description: 'Текст успешно скопирован'
            }))
        }
    }

    const recordsFormPathname = useMemo<string>(() => {
        if (!currentCompany) {
            return ''
        }

        return RoutePaths.RECORDS_FORM
            .replace(':companyId', currentCompany.id.toString())
            .replace(':branchId', currentCompany.id.toString())
    }, [currentCompany])

    const recordsFormURI = useMemo<string>(() => {
        return location.origin + recordsFormPathname;
    }, [recordsFormPathname])


    const handleMenuBtnClick = () => {
        if (onBurgerMenuStateChanged) {
            onBurgerMenuStateChanged(!burgerMenuState)
        }
    }

    const handleOnCompanyClick = () => {
        setCompanyModal(true)
    }

    const handleOnMenuItemClick = (path: string) => {
        if (companyId) {
            navigate(path.replace(':companyId', companyId))
        }
    }

    return (
        <div className={`${c.block} ${burgerMenuState && c['block-extended']}`}>
            <ul className={`${burgerMenuState && c['menu-extended']} ${c.menu}`}>
                <li className={c['menu-item']}>
                    <ControlPanelMenuItem
                        item={{
                            id: 'burger-button',
                            title: '',
                            icon: <BurgerMenuIcon/>
                        }}
                        onClick={handleMenuBtnClick}
                        burgerMenuState={burgerMenuState as boolean}/>
                </li>
                {controlPanelPages.map(p => (
                    <li key={p.path} className={c['menu-item']}>
                        <div onClick={() => handleOnMenuItemClick(p.path)}>
                            <ControlPanelMenuItem burgerMenuState={burgerMenuState as boolean}
                                                  item={p}
                            />
                        </div>
                    </li>
                ))}
                <li className={c['menu-item']}>
                    <ControlPanelMenuItem
                        item={{
                            id: 'company-button',
                            title: '',
                            icon: <CompanyIcon/>
                        }}
                        onClick={handleOnCompanyClick}
                        burgerMenuState={burgerMenuState as boolean}/>
                </li>
            </ul>

            <Modal
                open={companyModal}
                cancelText={'Закрыть'}
                okText={'Перейти'}
                onCancel={() => setCompanyModal(false)}
                onOk={() => navigate({
                    pathname: recordsFormPathname
                })}
            >
                <div className={c.modal}>
                    <IntroduceTitle
                        title={'Ссылка'}
                        description={(
                            <div className={c['modal-description']}>Это ссылка на форму для онлайн записи, можете
                                использовать его где-угодно чтобы клиенты могли записаться к вам</div>
                        )}
                    />

                    <Divider/>
                    <div onClick={onCopy}>
                        <Input
                            readOnly
                            ref={copyInputRef}
                            value={recordsFormURI}
                            prefix={<figure className={c.icon}><CopyOutlined/></figure>}
                        />
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default ControlPanelMenu;