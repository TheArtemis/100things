import '../styles/title.css'

function Title(props) {
    return (
        <div className="title-wrap">
            <h1 className="title">Cazzo mene di {props.name}</h1>
        </div>
    );
}

export default Title;