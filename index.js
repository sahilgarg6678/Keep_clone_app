const addButton = document.querySelector("#add");

const updatelocaldata = () =>{
    const textareadata = document.querySelectorAll('textarea');
    const notes = [];

    textareadata.forEach((note)=>{
        return notes.push(note.value);
    })

    localStorage.setItem('notes',JSON.stringify(notes));
}


const addNewNode =(text = '')=>{

    const note = document.createElement('div')
    note.classList.add('note');


    const htmlData = ` <div class="operation">
    <button class="edit"><i class="fas fa-edit"></i></button>
    <button class="delete"><i class="fas fa-trash-alt"></i></button>
    </div>
    <div class="main ${text ? "":"hidden"}"></div>
    <textarea class="${text ? "hidden":" "}"></textarea> `;

    note.insertAdjacentHTML('afterbegin',htmlData);

    

    // getting the references 
    const editbutton = note.querySelector('.edit');
    const delbutton = note.querySelector('.delete');
    const maindiv = note.querySelector('.main');
    const textarea = note.querySelector('textarea');

    // deleting the node
    delbutton.addEventListener('click',()=>{
        note.remove();
        updatelocaldata();
    })

    //toggle using edit button
    textarea.value=text;
    maindiv.innerHTML= text;

    editbutton.addEventListener('click',()=>{
        maindiv.classList.toggle('hidden');
        textarea.classList.toggle('hidden');
    })

    textarea.addEventListener('change',(event)=>{
        const value = event.target.value;
        maindiv.innerHTML = value

        updatelocaldata();
    })


    document.body.appendChild(note);

}
//getting data back in local storage
const notes  = JSON.parse(localStorage.getItem('notes'));

if(notes){ notes.forEach((note)=>addNewNode(note))};


addButton.addEventListener('click',() => addNewNode());
