const fs = require('fs')
const chalk = require('chalk')
// const getNotes = () =>
// {
//     return "Your notes..."
// }

const addNotes = (title,body) =>
{
    const notes = loadNotes()
    // const duplicateNotes = notes.filter((note) => note.title === title)
    const duplicateNote = notes.find((note) => note.title === title)
    // const duplicateNotes = notes.filter((note) => {
    //     return note.title === title   
    // })


    // console.log(duplicateNote)
    // console.log(title)

    debugger
    
    if(!duplicateNote)
    // else we can also use (duplicateNote === undefined
    {
    notes.push({
       title:title,
       body:body 
    })
    savenotes(notes)
    console.log(chalk.green.inverse('Note has been added!!'))
}
    else
    {
        console.log(chalk.red.inverse('Note has already taken!!!'))
    }
    // console.log(notes)
    
}
const savenotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json',dataJSON)
}
const loadNotes = (title,body) => {
    try
    {
    const dataBuffer = fs.readFileSync('notes.json')
    const dataJSON = dataBuffer.toString()
    return JSON.parse(dataJSON)
    }
    catch(e){
        return []
    }
}
const removeNotes = (title) => {
    const notes = loadNotes()
    const notesToKeep = notes.filter((note) => note.title !== title)
    // const notesToKeep = notes.filter((note) => {
    //     return note.title !== title
    // })
    if(notes.length > notesToKeep.length){
        console.log(chalk.green.inverse('Note removed'))
        savenotes(notesToKeep)
    }
    else{
        console.log(chalk.red.inverse('No Note found'))
    }
    
    // console.log(title)
}
const listNotes = (title) => {
    const notes = loadNotes()
    console.log(chalk.blue.inverse("Your notes : "))
    notes.forEach((note) =>
    {
        console.log(note.title)
    })
}
const readNotes = (title) => {
    const notes = loadNotes()
    const note = notes.find((note) => note.title === title)
    if(note){
        console.log(chalk.cyanBright.bold.inverse(note.title))
        console.log(chalk.blue(note.body))
    }
    else{
        console.log(chalk.red.bold('No note to read!'))
    }
}
module.exports = {
    // getNotes: getNotes,
    addNotes: addNotes,
    removeNotes: removeNotes,
    listNotes: listNotes,
    readNotes: readNotes
} 