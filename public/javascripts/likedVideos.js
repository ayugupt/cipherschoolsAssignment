document.getElementById("seeLike").addEventListener("click", function(){
    var ter = new XMLHttpRequest();
    ter.open('GET', `http://localhost:3000/getLiked?username=${localStorage.username}`, true);
    ter.send();

    ter.addEventListener("load", function(){
        var response = JSON.parse(this.responseText);
        var data = response.data;
        console.log(data);

        var items = document.getElementsByClassName("homeVid");
        while(items.length > 0){
            items[0].remove();
        }
        var temp;
        for(var i = 0; i < data.length; i++){
            if(i%3 == 0){
                temp = document.createElement('div');
                temp.className = "homeVid";
                document.getElementById("remainingBody").appendChild(temp);
            }
            var single = document.createElement("div");
            temp.appendChild(single);
            ReactDOM.render(<VideoHolder title={data[i].title} src={data[i].file_name} uploader={data[i].uploader} likes={data[i].likes} id={data[i].id}/>, single);
        }
    })
})