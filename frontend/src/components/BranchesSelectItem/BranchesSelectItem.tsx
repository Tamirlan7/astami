import React, {FC} from 'react';
import c from './BranchesSelectItem.module.scss'

interface BranchesListSelectItemProps {
    title: string
}

const BranchesSelectItem: FC<BranchesListSelectItemProps> = ({title}) => {
    return (
        <div className={c.block}>
            {title}
        </div>
    );
};

export default BranchesSelectItem;