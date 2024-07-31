import '../styles/arrow.css'

function Arrow(props) {

    const directionClass = props.direction === 'down' ? 'arrow-down' : 'arrow-up';

    return (
        <div className={`arrow ${directionClass}`} onClick={props.onClick}>
        </div>
    );
}

export default Arrow;