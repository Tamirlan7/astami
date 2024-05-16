import React, {FC, PropsWithChildren} from 'react';
import c from './UnderlineText.module.scss'

interface UnderlineTextProps extends PropsWithChildren {
    underlineColor?: string
    thickness: number
}

const UnderlineText: FC<UnderlineTextProps> = ({children, underlineColor, thickness}) => (
    <div className={c.wrapper}>
        <div className={c.text}>{children}</div>
        <div className={c.underline} style={{backgroundColor: underlineColor, height: thickness}}/>
    </div>
);

export default UnderlineText;