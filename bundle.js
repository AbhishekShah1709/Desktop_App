(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
console.log("hii start")

function checkmp3(filename) {
    var parts = filename.name.toString().split('.');
    console.log(parts[parts.length-1])
        if ((parts[parts.length - 1] != 'mp3') && (parts[parts.length - 1] != 'wav')) {
            alert("Please Give a Valid mp3 or wav file");
            console.log("FALSE")
                return false;
        }   
        else {
            console.log("TRUE")
                return true;
        }   
}


var select_button = document.getElementById('file_select'); // add id="my-button" into html
select_button.addEventListener('change', fileSelect);

var upload_button = document.getElementById('upload_file'); // add id="my-button" into html
upload_button.addEventListener('click', fileUpload);

var model_button = document.getElementById('run_model'); // add id="my-button" into html
model_button.addEventListener('click', runModel);

function fileSelect(){
	const fileInput = document.getElementById("file_select");

	const filename = fileInput.files[0];
	console.log(filename)

    checkmp3(filename)
    upload_button.disabled = false;
}


function fileUpload(){

    uploaded_file = document.getElementById("file_select");
    uploaded_file = uploaded_file.files[0];
    uploaded_file_name = uploaded_file.name;
    
    formData = new FormData();
    formData.append("audio_path", uploaded_file.path);
    formData.append("audio_name", uploaded_file_name);

    console.log("NOW")
    for (var value of formData.values()) {
        console.log(value);
    } 
    model_button.disabled = false;
}


function runModel(){

    file_path = formData.get("audio_path");
    file_name = formData.get("audio_name");

    data = {
        "file_name": file_name,
        "file_path": file_path
    }

    let options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(data)
    }

    let fetchRes = fetch("http://127.0.0.1:5000/upload", options)

		fetchRes.then(res => 
                res.json()).then(d => {

                output = d.output

            var cnt = 0;
            var curr = 0;
            for (var i = 0; i < output.length; i++) {
                if (output[i] == 1) {
                    curr++;
                }   
                else {
                    curr = 0;
                }   
                if (curr == 28) {
                    cnt++;
                }   
            }   
            if (cnt > 2) {
                document.getElementById("result").innerHTML = "The given input audio is STUTTERED";
//                this.setState({ stuttered: "Stuttered" }); 
            }   
            else {
                document.getElementById("result").innerHTML = "The given input audio is NOT STUTTERED";
//                this.setState({ stuttered: "Not Stuttered" }); 
            }   
//            this.setState({ checked: true }); 
            document.getElementById("result").style.display = "block";
            console.log("cnt");
            console.log(cnt);
        })
}

},{}]},{},[1]);
