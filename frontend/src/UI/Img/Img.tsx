import React, {FC, ImgHTMLAttributes, useEffect, useState} from 'react';
import c from './Img.module.scss';
import client from "@services/client.ts";
import {useParams} from "react-router-dom";

interface ImgProps extends ImgHTMLAttributes<HTMLImageElement> {
    path: string;
    replaceCompanyIdInPath?: boolean
    rounded?: boolean
}

const Img: FC<ImgProps> = ({path, rounded, replaceCompanyIdInPath, ...props}) => {
    const [imgSrc, setImgSrc] = useState<string | undefined>(undefined);
    const {companyId} = useParams()

    useEffect(() => {
        const getImg = async () => {
            try {
                let uri = path

                if (replaceCompanyIdInPath && companyId) {
                    uri = uri.replace(':companyId', companyId)
                }

                const res = await client.get(uri, {responseType: 'blob'});
                const imgURL = URL.createObjectURL(res.data);
                setImgSrc(imgURL);
            } catch (e: unknown) {
                // Handle the error as needed (e.g., set a fallback image)
            }
        };

        getImg();

        // Clean up the object URL to avoid memory leaks
        return () => {
            if (imgSrc) {
                URL.revokeObjectURL(imgSrc);
            }
        };
    }, [companyId, imgSrc, path, replaceCompanyIdInPath]);

    return (
        <img
            {...props}
            src={imgSrc}
            className={`${c.image} ${props.className} ${rounded && c.rounded}`}
        />
    );
};

export default Img;