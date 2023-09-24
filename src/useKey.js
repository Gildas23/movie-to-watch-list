import { useEffect } from "react"

export function useKey(keyName,action){

    useEffect(function(){

        function executeKeyPressedAction(event){
          if(event.code.toLowerCase() === keyName.toLowerCase()){
            action()
          }
        }
    
        document.addEventListener('keydown',executeKeyPressedAction)
        return function(){
          document.removeEventListener('keydown',executeKeyPressedAction)
        }
      },[keyName,action])
}