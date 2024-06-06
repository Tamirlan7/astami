import React, {FC} from 'react';
import c from './IntroduceTitle.module.scss'
import Title from "@ui/Title/Title.tsx";

interface IntroduceTitleProps {
    title?: string;
    description?: string
    specialText?: string
}

const IntroduceTitle: FC<IntroduceTitleProps> = ({title, description, specialText}) => {
    return (
        <div className={c['text-block']}>
            <Title className={c.title}>{title}</Title>
            <p className={c.text}>{description}<span> {specialText}</span></p>
        </div>
    );
};

export default IntroduceTitle;