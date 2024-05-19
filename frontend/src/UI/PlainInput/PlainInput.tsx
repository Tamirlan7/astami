import {FC, ForwardedRef, forwardRef, InputHTMLAttributes, ReactElement, useMemo} from "react";
import c from './PlainInput.module.scss'
import {IPropertyValid} from "@/types/types.ts";

export interface PlainInputProps extends InputHTMLAttributes<HTMLInputElement> {
    validations?: IPropertyValid[]
    label?: string
    postIcon?: ReactElement
    preIcon?: ReactElement
    onPostIconClick?: () => void
    onPreIconClicked?: () => void
    rootClassName?: string
    postIconClassName?: string
}

const PlainInput = forwardRef<HTMLInputElement, PlainInputProps>(({
                                                                      className,
                                                                      label,
                                                                      validations,
                                                                      rootClassName,
                                                                      preIcon,
                                                                      onPreIconClicked,
                                                                      onPostIconClick,
                                                                      postIcon,
                                                                      postIconClassName,
                                                                      ...props
                                                                  }, ref: ForwardedRef<HTMLInputElement>) => {
    const invalidProperty = useMemo<IPropertyValid | undefined>(() => {
        return validations?.find(v => v.isInvalid)
    }, [validations])

    return (
        <div className={`${c.block} ${rootClassName}`}>
            {label && (
                <label className={c.label}>{label}</label>
            )}
            <div className={c['input-wrapper']}>
                {preIcon && (
                    <figure onClick={onPreIconClicked} className={`${c.icon} ${c['pre-icon']}`}>
                        {preIcon}
                    </figure>
                )}
                <input
                    {...props}
                    ref={ref}
                    className={`${c.input} ${className} ${props.disabled && c['input-disabled']} ${invalidProperty && c.invalid}`}
                />
                {postIcon && (
                    <figure onClick={onPostIconClick} className={`${c.icon} ${c['post-icon']} ${postIconClassName}`}>
                        {postIcon}
                    </figure>
                )}
            </div>
            <span className={c.error}>{invalidProperty?.message}</span>
        </div>
    );
})

export default PlainInput;