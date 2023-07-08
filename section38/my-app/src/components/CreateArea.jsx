import React from "react";
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab';
import Zoom from '@mui/material/Zoom';

function CreateArea(props) {
  const [newNote, setNewNote] = React.useState({
    title: "",
    content: ""
  });

  const [isFocused, setFocused] = React.useState(false);
  const [alsoFocused, setAlsoFocused] = React.useState(false);

  function handleFocus() {
    setFocused(true);
  }

  function handleBlur() {
    setFocused(false);
  }

  function handleAlsoFocus() {
    setAlsoFocused(true);
  }

  function handleAlsoBlur() {
    setAlsoFocused(false);
  }

  function handleChange(event) {
    const {name, value} = event.target
    setNewNote(pre => {
      return {
        ...pre,
        [name]: value
      }
    });
  }


  return (
    <div>
      <form className="create-note" onSubmit={(event) => {
        props.submit(newNote)
        setNewNote({
          title: "",
          content: ""
        });
        event.preventDefault();
      }}>
        
        {(isFocused || alsoFocused) && 
          <input 
            onFocus={handleAlsoFocus}
            onBlur={handleAlsoBlur}
            onChange={handleChange} 
            value={newNote.title}
            name="title" 
            placeholder="Title" 
            required
          />
        }
        <textarea 
          onFocus={handleFocus}
          onChange={handleChange} 
          value={newNote.content}
          name="content" 
          placeholder="Take a note..." 
          rows={(isFocused || alsoFocused)?"3":"1"} 
          required
        />
        <Zoom in={(isFocused || alsoFocused)?true:false}>
          <Fab color="warning" aria-label="add">
            <AddIcon />
          </Fab>
        </Zoom>
          
        
        
        
      </form>
    </div>
  );
}

export default CreateArea;