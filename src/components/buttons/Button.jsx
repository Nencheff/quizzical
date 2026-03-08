

export default function Button(props) {
    return (
        <button 
            onClick={props.clickHandler} 
            className={props.className} 
        >
            {props.value}
        </button>
    )
}