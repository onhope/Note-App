const btnEl = document.getElementById("btn");
const appEl = document.getElementById("app");

getNotes().forEach((note) => {
  const noteEl = createNoteEl(note.id, note.content);
  appEl.insertBefore(noteEl, btnEl);
});

// noteObj.id, noteObj.content 를 id, content의 인자로 받음 
function createNoteEl(id, content) {
  const element = document.createElement("textarea");
  element.classList.add("note");
  element.placeholder = "Empty Note";
  element.value = content;

  element.addEventListener("dblclick", () => {
    const warning = confirm("Do you want to delete this note?");
    if(warning) {
      deleteNote(id, element);
    }
  });

  element.addEventListener("input", ()=> {
    updateNote(id, element.value);
  });

  return element;
}

function deleteNote(id, element) {
  const notes = getNotes().filter((note)=>note.id != id); 
  saveNote(notes);
  appEl.removeChild(element);
}

// id, element.value를 인자로 받음 
function updateNote(id, content) {
  const notes = getNotes()
  const target = notes.filter((note) => note.id == id)[0];
  target.content = content;
  console.log(target);
  saveNote(notes);
}

function addNote() {
  // key : note-app의 value : notes
  const notes = getNotes();
  // console.log(notes);
  const noteObj = {
    id : Math.floor(Math.random() * 100000),
    content: ""
  };
  const noteEl = createNoteEl(noteObj.id, noteObj.content);
  appEl.insertBefore(noteEl, btnEl);

  notes.push(noteObj);

  saveNote(notes);
}

function saveNote(notes) {
  localStorage.setItem("note-app", JSON.stringify(notes));
}

function getNotes() {
  // localstorage에 key: note-app, value: data가 있으면 불러오고 없으면 [] 빈 배열을 할당
  return JSON.parse(localStorage.getItem("note-app") || "[]");
}

btnEl.addEventListener("click", addNote);