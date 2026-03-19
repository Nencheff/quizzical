

export default function Button({children, clickHandler, className, disabled, ...rest}) {
    return (
        <button
            onClick={clickHandler}
            className={className}
            disabled={disabled}
            {...rest}
        >
            {children}
        </button>
    )
}