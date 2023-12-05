import "./OutlinedButton.css"

const OutlinedButton = (props) => {
    const { text, icon, handleClick } = props;

    return (
        <button
            className="outlined-button"
            onClick={handleClick}
        >
            {icon}
            {text}
        </button>
    )
}

export default OutlinedButton