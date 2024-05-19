import React, {FC} from 'react';
import c from './Loader.module.scss';

interface LoaderProps {
    rootClassName?: string;
    text?: string;
    loaderClassName?: string;
    loading?: boolean;
    color?: 'black' | 'white';
}


const Loader: FC<LoaderProps> = ({
                                           rootClassName = '',
                                           text = '',
                                           loaderClassName = '',
                                           loading = true,
                                           color = 'black'
                                       }) => {

    if (!loading) {
        return null;
    }

    if (color === 'white') {
        return (
            <div className={`${c['white-wrapper']} ${c.wrapper} ${rootClassName}`}>
                <div className={`${c['white-loader']} ${loaderClassName} ${c.loader}`}></div>
                {text && (
                    <span>{text}</span>
                )}
            </div>
        );
    }

    return (
        <div className={`${c.wrapper} ${rootClassName}`}>
            <div className={`${loaderClassName} ${c.loader}`}></div>
            {text && (
                <span>{text}</span>
            )}
        </div>
    );
}

export default Loader;
