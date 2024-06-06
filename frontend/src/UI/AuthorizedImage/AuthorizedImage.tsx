import React, {FC} from 'react';
import c from './AuthorizedImage.module.scss'
import {Image, ImageProps} from "antd";
import useAuthorizedFile from "@hooks/useAuthorizedFile.ts";
import {IUseAuthorizedFileConfig} from "@/types/types.ts";

interface AuthorizedImageProps extends ImageProps {
    path: string;
    authorizedFileConfig?: IUseAuthorizedFileConfig
}

const AuthorizedImage: FC<AuthorizedImageProps> = ({path, authorizedFileConfig, ...props}) => {
    const {fileBase64} = useAuthorizedFile(path)

    if (!fileBase64) {
        return null;
    }

    return (
        <Image
            {...props}
            alt={props.alt}
            src={fileBase64}
            className={`${c.image} ${props.className}`}/>

    );
};

export default AuthorizedImage;