import React, {FC} from 'react';
import c from './SearchInput.module.scss'
import PlainInput, {PlainInputProps} from "@ui/PlainInput/PlainInput.tsx";
import SearchInputIcon from '@assets/icons/search.svg?react'
import Icon from "@ui/Icon/Icon.tsx";

interface SearchInputProps extends PlainInputProps {

}

const SearchInput: FC<SearchInputProps> = ({...props}) => {

    return (
        <PlainInput
            {...props}
            className={`${c.input} ${props.className}`}
            preIcon={(
                <Icon>
                    <SearchInputIcon/>
                </Icon>
            )}
        />
    );
}

export default SearchInput;