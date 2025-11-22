import { CartContext } from "../store/contextstore"
import { useContext } from "react"


export const Value=()=>{
    const cart =useContext(CartContext);
   const valued= cart.items.reduce((a,b)=>a+(b.price/100),0);
return valued;

}
