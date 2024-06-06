import React, {FC} from 'react';
import c from './ServicesFilter.module.scss'
import Button from "@ui/Button/Button.tsx";

interface ServicesFilterProps {
    onTitleChange?: (title: string) => void;
    onAddServiceClick?: () => void;
}

const ServicesFilter: FC<ServicesFilterProps> = ({onAddServiceClick, onTitleChange}) => {

    const handleOnAddClick = () => {
        if (onAddServiceClick) {
            onAddServiceClick()
        }
    }

    return (
        <div className={c.block}>
            <div>
                <Button onClick={handleOnAddClick}>Добавить</Button>
            </div>
        </div>
    );
};

export default ServicesFilter;