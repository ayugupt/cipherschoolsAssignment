
var iconButtons = document.getElementsByClassName("iconButton");    
localStorage['username'] = "ayushgupta";

for(var button of iconButtons){
    button.addEventListener("mousedown", function(event){
        event.currentTarget.style.backgroundColor = "rgba(211, 211, 211, 1)";
    });

    button.addEventListener("mouseup", function(event){
        fade(1, event.currentTarget);
    })
}



function fade(op, element){
    if(op > 0.1){
        element.style.backgroundColor = `rgba(211, 211, 211, ${op})`;
        window.setTimeout(()=>{fade(op-0.1, element)}, 15);
    }else{
        element.style.backgroundColor = `rgba(211, 211, 211, 0)`
    }
}

document.getElementById("sideMenuButton").open = false;
document.getElementById("sideMenuButton").ongoing = false;

document.getElementById("sideMenuButton").addEventListener("click", function(){
    if(!this.ongoing){
        this.ongoing = true;
        if(this.open){
            hideSideMenu.bind(this)();
        }else{
            showSideMenu.bind(this)();
        }
        this.open = !this.open;
    }

});

function showSideMenu(){
    var ele = document.getElementById("sideMenu");
    newFunc = function(){
        if(parseInt(ele.style.left) < -1.3){
            ele.style.left = (parseInt(ele.style.left) + 1.3).toString() + "%";
            showSideMenu.bind(this)();
        }else{
            this.ongoing = false;
            ele.style.left = "0%";
        }
    }.bind(this);
    window.setTimeout(newFunc, 10);
}

function hideSideMenu(){
    var ele = document.getElementById("sideMenu");
    newFunc = function(){
        if(parseInt(ele.style.left) > -13){
            ele.style.left = (parseInt(ele.style.left) - 1.3).toString() + "%";
            hideSideMenu.bind(this)();
        }else{
            this.ongoing = false;
            ele.style.left = "-13%";
        }
    }.bind(this);
    window.setTimeout(newFunc, 10);
}