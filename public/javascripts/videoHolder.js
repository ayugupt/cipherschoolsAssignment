class VideoHolder extends React.Component{
    constructor(props){
        super(props);
        this.props = props;
        this.src = `/${this.props.src}`;
        this.videoRef = React.createRef();
    }
    componentDidMount(){
        this.videoRef.current.addEventListener("play", function(){
            window.setTimeout(function(){
                this.videoRef.current.pause();
            }.bind(this), 10)
        }.bind(this))
    }

    setCurrentVideo(){
        localStorage["video"] = this.props.id;
    }

    render(){
        return(
        <div className="videoHolder">
            <a href="/pages/video.html" style={{textDecoration:"none", color:"black"}} onClick={this.setCurrentVideo.bind(this)}>
            <div style={{width:"100%", height:"70%", overflow:"hidden"}}>
                {/* <img src="/images/twitch.png" width="100%"/> */}
                <video src={this.src} ref={this.videoRef} style={{width:"100%"}} autoPlay muted></video>
            </div>
            </a>
            <h1>{this.props.title}</h1>
            <div style={{display:"flex", justifyContent:"space-between", width:"100%"}}>
                <p>Uploaded by: {this.props.uploader}</p>
                <p>{this.props.likes} likes</p>
            </div>
        </div>);
    }
} 