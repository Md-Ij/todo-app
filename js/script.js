// all variables
let form = document.getElementById('form'),
  inputText = document.getElementById('inputText'),
  inputDate = document.getElementById('inputDate'),
  textarea = document.getElementById('textarea'),
  msg = document.getElementById('msg'),
  addBtn = document.getElementById('add-btn')

  // Js All Code Function 
form.addEventListener('submit', (e) => {
  e.preventDefault()
  formValidation()
})

let formValidation = () => {
  if ( (inputText.value === '' && inputDate.value === '' && textarea.value === '')) {
    msg.innerHTML = 'Task Can Not Be Blank!'
  }else {
    msg.innerHTML = ''
    acceptData()
    addBtn.setAttribute('data-bs-dismiss', 'modal')
    addBtn.click()
    ;(() => {
      addBtn.setAttribute('data-bs-dismiss', '')
    })()
  }
}

let data = [{}]

let acceptData = () => {
  // data['text'] = inputText.value,
  // data['date'] = inputDate.value,
  //   data['textarea'] = textarea.value
  data.push({
    text: inputText.value,
    date: inputDate.value,
    textarea: textarea.value
  })
  localStorage.setItem('data', JSON.stringify(data))
  addTask()
}

let addTask = () => {
  post.innerHTML = ''
  data.map((x, y) => {
    return (post.innerHTML += `<div class="add-post" id='${y}'>
      <span class="one">${x.text}</span>
      <span class="two">${x.date}</span>
      <p>${x.textarea}</p>
      <span class="option">
        <i class="fas fa-edit" onclick="editTask(this)" data-bs-toggle="modal" data-bs-target="#form"></i>
        <i class="fas fa-trash-alt" onclick="deleteTask(this)"></i>
      </span>
    </div>`)
  })
  resetForm()
}

let resetForm = () => {
  inputText.value = ''
  inputDate.value = ''
  textarea.value = ''
}

let editTask = (e) => {
  let selectTask = e.parentElement.parentElement
  inputText.value = selectTask.children[0].innerHTML
  inputDate.value = selectTask.children[1].innerHTML
  textarea.value = selectTask.children[2].innerHTML
  deleteTask(e)
}
let deleteTask = (e) => {
  e.parentElement.parentElement.remove()
  data.splice(e.parentElement.parentElement.id, 1)
  localStorage.setItem('data', JSON.stringify(data))
}

(() => {
  data = JSON.parse(localStorage.getItem('data')) || []
  addTask()
})()
