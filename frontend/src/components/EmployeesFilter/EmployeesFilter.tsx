import React, {ChangeEvent, FC} from 'react';
import c from './EmployeesFilter.module.scss'
import Button from "@ui/Button/Button.tsx";
import SearchInput from "@ui/SearchInput/SearchInput.tsx";

interface EmployeesFilterProps {
    onTitleChange?: (title: string) => void;
    onAddEmployeeClick?: () => void;
}

const EmployeesFilter: FC<EmployeesFilterProps> = ({onTitleChange, onAddEmployeeClick}) => {

    const handleOnTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (onTitleChange) {
            onTitleChange(e.target.value);
        }
    }

    const handleOnAddClick = () => {
        if (onAddEmployeeClick) {
            onAddEmployeeClick()
        }
    }

    return (
        <div className={c.block}>
            <div className={c.control}>
                <SearchInput onChange={handleOnTitleChange} rootClassName={c['input-root']} label={'Поиск по имени'} />
                <Button onClick={handleOnAddClick}>Добавить</Button>
            </div>
        </div>
    );
};

export default EmployeesFilter;