class DropDownMenu extends React.Component{
    constructor(props){
        super(props)
        this.props = props;
    }

    render(){

        const items = this.props.names.map((val, index) => {
            return <MapItem name={val} link={this.props.links[index]} key={index.toString()}/>
        })

        return (<div className="dropDownMenu">
            {items}
        </div>)
    }
}

class MapItem extends React.Component{
    constructor(props){
        super(props);
        this.props = props;
    }

    showOverlay(e){
        e.preventDefault();
        document.querySelector(".overlay").style.display = "flex";
        ReactDOM.render(<Overlay/>, document.querySelector(".overlay"));
    }

    render(){
        return (<div className="dropDownMenuItem">
            <a href={this.props.link} onClick={this.showOverlay}>{this.props.name}</a>
        </div>)
    }
}

const names = ["Create Video", "View Profile"];
const links = ["https://www.google.com", "https://wwww.youtube.com", "https://www.reddit.com"]

ReactDOM.render(<DropDownMenu names={names} links={links}/>, document.querySelector(".menuHolder"));