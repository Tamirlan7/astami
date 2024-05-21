import React, {FC} from 'react';
import Icon from "@ui/Icon/Icon.tsx";
import BackIcon from '@assets/icons/back.svg?react'
import {useNavigate} from "react-router-dom";

interface BackProps {
    to: string
    state?: object
}

const Back: FC<BackProps> = ({to, state}) => {
    const navigate = useNavigate()

    const handleClick = () => {
        navigate(to, {
            state: state
        })
    }

    return (
        <Icon onClick={handleClick} pointerEnabled width={28} height={28}>
            <BackIcon/>
        </Icon>
    );
};

export default Back;