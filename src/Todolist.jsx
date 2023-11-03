import { useState, useEffect } from 'react'
import icone from './tarefa.jpg'
function Todolist(){

    //COMANDO PARA GUARADR NO BANCO LOCAL DO NOSSO NAVEGADOR
  const listaStorage = localStorage.getItem('Lista')

  const [lista, setLista] = useState(listaStorage ? JSON.parse(listaStorage):[])
  useEffect(()=>{
    localStorage.setItem('Lista' , JSON.stringify(lista))
  }, [lista])
  const [novoItem, setNovoItem] = useState("")
  const cadUser = (e) =>{
    e.preventDefault()
    if (!novoItem) {
      return;
    }
    setLista ([...lista, {text: novoItem, isCompleted: false}])
    setNovoItem("")
    document.getElementById('inputentrada')
  }
  function clicou(index){
    const listaAux = [...lista]
    listaAux[index].isCompleted = !listaAux[index].isCompleted
    setLista(listaAux)
  }
  function deleta(index){
    const listaAux = [...lista]
    listaAux.splice(index, 1)
    setLista(listaAux)
  }
  function deletAll (){
    setLista([])
  }
    
   return(
    <div>
      <h1>Lista de tarefas</h1> 
    <form  onSubmit={cadUser}>
      <input id='inputentrada' type="text" value={novoItem}
       placeholder='Add tarefa'
        onChange={(e) => setNovoItem(e.target.value)} />

       <button type='submit'> Add </button>

    </form><br />

    <div className="listatarefa">
      <>
      {
        lista.length < 1 ? <img src={icone}  />  
         :
         lista.map((item, index) =>(
          <div className={item.isCompleted ? "completo" : "item"}>
          <span onClick={()=>{clicou(index)}}>{item.text}</span>
          <button onClick={()=>{deleta(index)}} className='btn'>deletar</button>
          </div>
         ))
  
      }
      </>
      <br />
       </div>
       {
        lista.length > 0 &&
         <button onClick={deletAll} className='all'>Delet All</button>
       }
    </div>
   ) 
}

export default Todolist