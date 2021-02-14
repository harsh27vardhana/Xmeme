
const backend_url = 'http://localhost:8081/memes';
async function getdata() {
    const get = await fetch(backend_url);
    const data = await get.json();
    return data;
}



async function show() {
    const data = await getdata();
    // console.log(data);
    var parent = document.getElementById('root');

    for (let i = 0; i < data.length; i++) {
        var myInnerDiv = document.createElement('div');
        myInnerDiv.setAttribute('class', 'card  mb-3 card-style');
        parent.append(myInnerDiv);

        var myInnerDiv1 = document.createElement('div');
        myInnerDiv1.setAttribute('class', 'row g-0');
        myInnerDiv.append(myInnerDiv1);


        var myInnerDiv2 = document.createElement('div');
        myInnerDiv2.setAttribute('class', 'col-md-4');
        myInnerDiv1.append(myInnerDiv2);


        var img = new Image();
        img.src = data[i].url;
        myInnerDiv2.appendChild(img);


        var myInnerDiv3 = document.createElement('div');
        myInnerDiv3.setAttribute('class', 'col-md-8');
        myInnerDiv1.append(myInnerDiv3);

        var innerdiv = document.createElement('div');
        innerdiv.setAttribute('class', 'card-body ');
        myInnerDiv3.append(innerdiv);

        var h5 = document.createElement('h5');
        h5.setAttribute('class', 'card-title');
        h5.textContent = data[i].name;
        innerdiv.append(h5);

        var p = document.createElement('p');
        p.setAttribute('class', 'card-text');
        p.textContent = data[i].caption;
        innerdiv.append(p);


        var juh1 = document.createElement('div');
        juh1.setAttribute('class', 'text-right');
        innerdiv.append(juh1);


        let btn1 = document.createElement('button');
        btn1.setAttribute('class', 'btn btn-margin btn-info');
        btn1.setAttribute('type', 'button');
        btn1.setAttribute('data-toggle', 'modal');
        btn1.setAttribute('data-target', '#patchpost');
        btn1.textContent = " Edit ";
        btn1.addEventListener('click', function () {
            document.getElementById('namelabel').innerText = data[i].name;
            document.getElementById('itcaption').value=data[i].caption;
            document.getElementById('osturl').value=data[i].url;
            document.getElementById('ide').textContent = data[i].id;
            
        });

        juh1.append(btn1);
    }

}

show();

async function update(){
    const data = {  caption: document.getElementById("itcaption").value, url: document.getElementById("osturl").value };

    const option ={
        method: 'PATCH',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            'Connection': 'keep-alive'
        },
        body: JSON.stringify(data)
    }
    const id = document.getElementById("ide").textContent;
    const sendm = await fetch(backend_url+'/'+id, option);
    // console.log(id);
    window.location.reload();
}

async function submit() {
    const data = { name: document.getElementById("postname").value, caption: document.getElementById("postcaption").value, url: document.getElementById("posturl").value };

    const options = {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            'Connection': 'keep-alive'
        },
        body: JSON.stringify(data)
    }

    const sendmeme = await fetch(backend_url, options);
    window.location.reload();
    // console.log(options.body)
}