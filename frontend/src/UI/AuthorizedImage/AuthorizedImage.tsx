import React, {FC} from 'react';
import c from './AuthorizedImage.module.scss'
import {Image, ImageProps} from "antd";
import useAuthorizedFile from "@hooks/useAuthorizedFile.ts";
import {IUseAuthorizedFileConfig} from "@/types/types.ts";

interface AuthorizedImageProps extends ImageProps {
    path: string;
    authorizedFileConfig?: IUseAuthorizedFileConfig
    shape?: 'circle' | 'square'
}

const AuthorizedImage: FC<AuthorizedImageProps> = ({path, authorizedFileConfig, shape = 'square', ...props}) => {
    const {fileBase64} = useAuthorizedFile(path, authorizedFileConfig)

    if (!fileBase64) {
        return null;
    }

    return (
        <Image
            {...props}
            alt={props.alt}
            src={fileBase64}
            wrapperClassName={`${c.wrapper} ${shape === 'circle' && c['wrapper-circle']}`}
            className={`${c.image} ${props.className} ${shape === 'circle' && c.circle}`}/>
    );
};

export default AuthorizedImage;