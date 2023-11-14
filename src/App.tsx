import React from 'react';
import logo from './logo.svg';
import './App.css';
import EditorArea from './components/EditorArea';
import { NameInput } from './components/NameInput';
import PanelLeft from './components/PanelLeft';
import PanelRight from './components/PanelRight';

function App() {
  const test=()=>{
  
  }
  return (
   <div className="main">
    <NameInput name='alper' onUpdateName={test}></NameInput>
    <PanelLeft></PanelLeft><PanelRight></PanelRight>
    <EditorArea></EditorArea>
   </div>
   
   
  );
}

export default App;
