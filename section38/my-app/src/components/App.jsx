import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";

function App() {
  const [notesArray, setNotesArray] = React.useState([{
    title: "Note title",
    content: "Note content"
  }]);

  function addItem(newItem) {
    console.log(notesArray);
    setNotesArray(pre => {
      return [...pre, newItem];
    });
  }

  function deleteItem(id) {
    setNotesArray(pre => {
      return pre.filter((item, index) => {
        return id !== index;
      })
    })
  }

  return (
    <div>
      <Header />
      <CreateArea 
        submit={addItem}
      />
      {notesArray.map((item, index) => {
        return (
          <Note 
            key={index} 
            id={index}
            title={item.title} 
            content={item.content} 
            onDelete={deleteItem}
          />)
      })}
      
      <Footer />
    </div>
  );
}

export default App;
