import '../styles/title.css'

function Title(props) {
    return (
        <div className="title-wrap">
            <h1 className="title">100 Things I love about {props.name}</h1>
        </div>
    );
}

export default Title;