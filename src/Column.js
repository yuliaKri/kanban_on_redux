import Card from "./Card";


function Column(props) {

    console.log("currentUser: ", props.currentUser)

    /*if (props.currentUser) {
        return (
            <div className="col">
                <h2>{props.column.title}</h2>
                {props.cards.filter(el => el.status === props.column.title)
                    .filter(el => el.markedToDelete === Boolean(0))
                    .filter(el => el.name === currentUser)
                    .sort((a, b) => a.priority - b.priority).map(el =>
                        <Card card={el} key={el._id}/>)}
            </div>
        )

    else{*/
        return (
            <div className="col">
                <h2>{props.column.title}</h2>
                {props.cards.filter(el => el.status === props.column.title)
                    .filter(el => el.markedToDelete === Boolean(0))
                    .sort((a, b) => a.priority - b.priority).map(el =>
                        <Card card={el} key={el._id}/>)}
            </div>)
   // }
}

export default Column;