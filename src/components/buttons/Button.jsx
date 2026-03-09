

export default function Button(props) {
    return (
        <button 
            onClick={props.clickHandler} 
            className={props.className}
            disabled={props.disabled}
        >
            {props.value}
        </button>
    )
}