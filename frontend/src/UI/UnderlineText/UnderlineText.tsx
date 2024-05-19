import React, {FC, HTMLAttributes, PropsWithChildren} from 'react';
import c from './UnderlineText.module.scss'

interface UnderlineTextProps extends PropsWithChildren, HTMLAttributes<HTMLDivElement> {
    underlineColor?: string
    thickness: number
}

const UnderlineText: FC<UnderlineTextProps> = ({children, underlineColor, thickness, ...props}) => (
    <div {...props} className={`${c.wrapper} ${props.className}`}>
        <div className={c.text}>{children}</div>
        <div className={c.underline} style={{backgroundColor: underlineColor, height: thickness}}/>
    </div>
);

export default UnderlineText;