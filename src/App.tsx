import logo from './logo.svg';
import './App.css';
import {useCallback, useEffect, useState} from "react";
const ipcRenderer = window.require && window.require('electron').ipcRenderer || null

function App() {

  const [isUpdate,setUpdate]=useState(false);
  const [text,setText]=useState('')
  useEffect(()=>{
    ipcRenderer?.on('update_available', () => {
      ipcRenderer?.removeAllListeners('update_available');
      setUpdate(true)
      setText('update available,downloading now')
    });
    ipcRenderer?.on('update_downloaded', () => {
      ipcRenderer?.removeAllListeners('update_downloaded');
      setUpdate(true)
      setText('downloaed, restart now')

    });
  },[isUpdate,text])

  const closeNotification = useCallback(()=>{
    // notification.classList.add('hidden');
  },[])
  const restartApp = useCallback(()=>{
    ipcRenderer?.send('restart_app');
  },[])
  return (
    <div className="App">
     <div>
       <p>test auto update</p>
       {isUpdate && <span>{text}</span>}
     </div>
      <button onClick={restartApp}>
        <p>restart app</p>
      </button>
    </div>
  );
}

export default App;
