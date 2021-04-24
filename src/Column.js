import Card from "./Card";


function Column(props) {

    return (
        <div className="col" >
            <h2>{props.column.title}</h2>
            {props.cards.filter(el => el.status===props.column.title).sort((a,b)=>a.priority-b.priority).map(el =>
                <Card card={el} key={el._id}/>)}
        </div>
    )
}

export default Column;