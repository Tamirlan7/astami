import React, {ChangeEvent, FC} from 'react';
import c from './ServicesFilter.module.scss'
import Button from "@ui/Button/Button.tsx";
import SearchInput from "@ui/SearchInput/SearchInput.tsx";

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

    const handleOnTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (onTitleChange) {
            onTitleChange(e.target.value);
        }
    }

    return (
        <div className={c.block}>
            <div className={c.control}>
                <SearchInput onChange={handleOnTitleChange} rootClassName={c['input-root']} label={'Поиск по названию'}/>
                <Button onClick={handleOnAddClick}>Добавить</Button>
            </div>
        </div>
    );
};

export default ServicesFilter;