/** Dispatch event on click outside of node */
export function clickOutside(node) {

    const handleClick = event => {
        if (node && !node.contains(event.target) && !event.defaultPrevented) {
            node.dispatchEvent(
                new CustomEvent('click_outside', node)
            )
        }
    }

    document.addEventListener('click', handleClick, true);

    return {
        destroy() {
            document.removeEventListener('click', handleClick, true);
        }
    }
}
// export function handleClickOutSide(isO,classNameOrId){
//     const toggle=(isOpen)=>{
//         return !isOpen
//     }
//     const addListener=()=>{
//         document.addEventListener("click",handleClickOutSide);
//     }
//     const removeListener=()=>{
//         document.removeEventListener("click",handleClickOutSide);
//     }
//     const clickOutSide=(e,cb)=>{

//         if(isO&&!e.target.closest(classNameOrId)){
//         cb();
//         }
//     }
//     return{
//         removeListener,
//         addListener,
//         toggle,
//         clickOutSide
//     }
// }