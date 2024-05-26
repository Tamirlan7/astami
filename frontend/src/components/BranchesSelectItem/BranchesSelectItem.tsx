import React, {FC} from 'react';
import c from './BranchesSelectItem.module.scss'

interface BranchesListSelectItemProps {
    title: string
    selectedBranch?: boolean
}

const BranchesSelectItem: FC<BranchesListSelectItemProps> = ({title, selectedBranch}) => {
    return (
        <div className={`${c.block} ${selectedBranch && c.selected}`}>
            {title}
        </div>
    );
};

export default BranchesSelectItem;