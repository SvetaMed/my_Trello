const winC = document.getElementById('modalColor')
let btnChangeBoardViewModal = document.querySelector('#myBtn')
btnChangeBoardViewModal.addEventListener('click', btnColorShowModal)
function btnColorShowModal() {
    winC.style.visibility = 'visible'
    
}
let btnClose = document.querySelector('.close')
btnClose.addEventListener('click', modalClose)
function modalClose() {
    winC.style.visibility = 'hidden'
}
let btnChangeColorBoard = document.querySelector('#choose--color')
btnChangeColorBoard.addEventListener('click', btnReColor)
function btnReColor() {
    let color = document.querySelector("#input--color").value
    console.log(color)
    document.querySelector('.boards__item').style.backgroundColor = color
}

const lists = document.querySelectorAll('.list')
const button = document.querySelector('.button')

function addTask() {
    const btn = document.querySelector('.add__btn')
    const addBtn = document.querySelector('.add__item--button')
    const cancelBtn = document.querySelector('.cancel__item--button')
    const input = document.querySelector('.input')
    const form = document.querySelector('.boards__form')

    let value

    btn.addEventListener('click', () =>{
        form.style.display = 'block'
        btn.style.display = 'none'
        addBtn.style.display = 'none'

        input.addEventListener('input', ev => {
            value = ev.target.value;

            if (value) {
                addBtn.style.display = 'block'
            } 
            else {
                addBtn.style.display = 'none'
            }
        })
    } )

    cancelBtn.addEventListener('click', () =>{
        input.value = ''
        value = ''
        form.style.display = 'none'
        btn.style.display = 'flex' 

    } )
    addBtn.addEventListener('click', () => {
        const newItem = document.createElement('div')
        newItem.classList.add('list__item')
        newItem.draggable = true
        newItem.textContent = value
        lists[0].append(newItem)

        input.value = ''
        value = ''
        form.style.display = 'none'
        btn.style.display = 'flex' 
        
        dragNdrop()

    })

} 
addTask()

function addBoard() {
    const boards = document.querySelector('.boards')
    const board = document.createElement('div')
    board.classList.add('boards__item')
    board.innerHTML = `
    <span contenteditable="true" class="title"> boards title</span>
    <div class="list"> </div> 
    `
    boards.append(board)

    changeTitle()
    dragNdrop()
//delBoard()
}

button.addEventListener('click', addBoard)


function changeTitle() {
    const titles = document.querySelectorAll('.title')
    titles.forEach(title => {
        title.addEventListener('click', e =>e.target.textContent = '')
    })
     
}
changeTitle()

let draggedItem = null

function dragNdrop() {
const listItems = document.querySelectorAll('.list__item')
const lists = document.querySelectorAll('.list')

for (let i = 0; i < listItems.length; i++) {
    const item = listItems[i]

    item.addEventListener ('dragstart', () =>{
        draggedItem = item
        setTimeout(() => {
           item.style.display = 'none' 
        },0 )
    } )
    item.addEventListener('dragend', () => {
        setTimeout(() => {
            item.style.display = 'flex' 
            draggedItem = null
         },0 )
    })

    item.addEventListener('dblclick', () =>{
        item.remove()
    })

    for (let j  = 0; j < lists.length; j++) {
        const list = lists[j]
        list. addEventListener('dragover', e => e.preventDefault())
        list.addEventListener('dragenter', function (e)  {
            e.preventDefault()
            this.style.backgroundColor = 'rgba(0,0,0,0)'
         })
        list.addEventListener('dragleave', function (e)  {
            this.style.backgroundColor = 'rgba(0,0,0,0)'
         })
         list.addEventListener('drop', function (e)  {
            this.style.backgroundColor = 'rgba(0,0,0,0)'
            this.append(draggedItem)
         })


        
    }
}

}
dragNdrop()

// function delBoard() {
// 	const boards = document.querySelectorAll('.boards__item')
// 	for (let i = 0; i < boards.length; i++) {
// 		const board = boards[i]

// 		board.addEventListener('dblclick', () => {
// 			board.remove()
// 		})
// 	}
// }
// delBoard()

async function getUser(){
    let user=await fetch('https://randomuser.me/api/')
    let json=await user.json()
    console.log(json)
    let newUser = {
        gender: json.results[0].gender,
        name: json.results[0].name,
        pic:json.results[0].picture.thumbnail
    }
    let users = document.querySelector('.users')
    users.insertAdjacentHTML('beforeend',`
        <div class="user">
            <img src="${newUser.pic}" alt="">
        </div>
    `)
    console.log(newUser)
}