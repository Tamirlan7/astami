import React, {FC, ReactNode} from 'react';
import c from './IntroduceTitle.module.scss'
import Title from "@ui/Title/Title.tsx";

interface IntroduceTitleProps {
    title?: string;
    description?: string | ReactNode
    specialText?: string
    gap?: number
}

const IntroduceTitle: FC<IntroduceTitleProps> = ({title, description, specialText, gap = 0}) => {
    return (
        <div className={c['text-block']} style={{gap: gap}}>
            <Title className={c.title}>{title}</Title>
            <p className={c.text}>{description}<span> {specialText}</span></p>
        </div>
    );
};

export default IntroduceTitle;