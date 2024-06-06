import React, {FC} from 'react';
import {UploadProps} from "antd";
import c from './PlainUpload.module.scss'
import {Upload} from "antd";
import {UploadRequestOption} from "rc-upload/lib/interface";

interface PlainUploadProps extends UploadProps {
    label?: string
    rootClassName?: string
}

const PlainUpload: FC<PlainUploadProps> = ({label, rootClassName, ...props}) => {
    const dummyCustomRequest = ({onSuccess}: UploadRequestOption) => {
        setTimeout(() => {
            if (onSuccess) {
                onSuccess("ok");
            }
        }, 0);
    };

    return (
        <div className={`${rootClassName} ${c.root}`}>
            {label && (
                <label className={c.label}>{label}</label>
            )}
            <div className={c.main}>
                <Upload
                    {...props}
                    customRequest={props.customRequest ?? dummyCustomRequest}
                    className={`${c.upload} ${props.className}`}
                >
                    {props.children}
                </Upload>
            </div>
        </div>
    );
};

export default PlainUpload;
