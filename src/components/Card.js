import "../styles/card.css"

function Card(props) {
    
    return (
        <div className="card noselect">
            <div className="card-header">
                <p className="number">#{props.number}</p>
            </div> 
            <h1 className="thing">{props.thing}</h1>
        </div>
    );

}

export default Card;