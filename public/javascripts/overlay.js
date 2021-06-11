const CSSTransition = ReactTransitionGroup.CSSTransition;

class Overlay extends React.Component{
    constructor(props){
        super(props);
        this.props = props;
        this.state = {in: true, showForm: false}
        this.timeout = 300;
        document.querySelector(".overlay").addEventListener("click", function(e){
            if(e.target == e.currentTarget){
                this.setState({in:false});
            }
        }.bind(this))
    }

    closeOverlay(){
        document.querySelector(".overlay").style.display = "none";
    }

    pickVideo(){
        document.getElementById("video").click();
    }

    onPicked(){
        const file = document.getElementById("video").files[0];
        if(file.type.startsWith('video/')){
            document.getElementById("uploadVideo").style.display = "none";

            var videoElement = document.createElement("video");
            videoElement.id = "videoPreview"
            //videoElement.width = "320";
            videoElement.style.height = "90%";
            videoElement.autoplay = false;
            videoElement.controls = true;
            // var source = document.createElement("source");
            // videoElement.appendChild(source);
            document.querySelector(".flexDiv").appendChild(videoElement);

            const reader = new FileReader();
            reader.onload = (function(vid){ return function(e){vid.src=e.target.result;};})(videoElement)
            reader.readAsDataURL(file);
        }
    }

    onSubmit(){
        var formData = new FormData();
        formData.append("title", document.getElementById("title").value)
        formData.append("description", document.getElementById("desc").value)
        formData.append("video", document.getElementById("video").files[0]);
        formData.append("username", localStorage.username);

        var req = new XMLHttpRequest();
        req.open('POST', "http://localhost:3000/videoPost", true);

        req.send(formData);

        req.addEventListener("load", function(){
            this.setState({in:false});
        }.bind(this))

        req.addEventListener('error', function(e){
            console.log(e)
        })

    }

    render(){
        return(
            <CSSTransition in={this.state.in}
              appear={true}
              enter={false}
              unmountOnExit={true}
              timeout={this.timeout}
              classNames="overlayAnim"
              onExited={this.closeOverlay}
              onEntered={()=>{this.setState({showForm: true});}}
              onExit={()=>{this.setState({showForm: false})}}
              >
                  <div className="overlayWindow">
                        <div className="flexDiv">
                            <input type="file" id="video" onChange={this.onPicked}/>
                            <img src="/images/upload.svg" height="80%" style={{opacity:"0.3", cursor:"pointer"}} id="uploadVideo" onClick={this.pickVideo}/>
                        </div>
                      {this.state.showForm &&
                          <form>
                         <label htmlFor="title">Title of the Video</label><br></br>
                         <input type="text" name="title" id="title" placeholder="Enter your title..."/><br></br><br></br>
                         <label htmlFor="desc">Description of the Video</label><br></br>
                         <textarea type="text" name="desc" id="desc" placeholder="Describe your video..."/><br></br><br></br><br></br>
                         <input type="button" id="submit" value="Done" onClick={this.onSubmit.bind(this)}/>
                      </form>}
                  </div>
            </CSSTransition>
        );
    }
}

