import { useEffect, useState } from "react"

const useOnline=()=>{
const [isonline,setisonline]=useState(true);
useEffect(()=>{
const handleonline=()=>{
    setisonline(true);
}
const handleoffline=()=>{
    setisonline(false);
}
window.addEventListener("online",()=>{
setisonline(true);
});
window.addEventListener("offline",()=>{
setisonline(false);
}); 
return ()=>{
    window.removeEventListener("online",handleonline);
    window.removeEventListener("offline",handleoffline);


};


},[]);
return isonline;


}
export default useOnline;

