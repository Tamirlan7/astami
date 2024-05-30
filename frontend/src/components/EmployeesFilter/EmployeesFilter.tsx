import React, {ChangeEvent, FC} from 'react';
import c from './EmployeesFilter.module.scss'
import Button from "@ui/Button/Button.tsx";

interface EmployeesFilterProps {
    onTitleChange?: (title: string) => void;
    onAddEmployeeClick?: () => void;
}

const EmployeesFilter: FC<EmployeesFilterProps> = ({onTitleChange, onAddEmployeeClick}) => {

    const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
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
            <div>
                <Button onClick={handleOnAddClick}>Добавить</Button>
            </div>
        </div>
    );
};

export default EmployeesFilter;