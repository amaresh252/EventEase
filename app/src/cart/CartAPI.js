
export function addToCart(cartData){
    return new Promise(async (resolve)=>{
        const response=await fetch('/cart',{
            method:'POST',
            body:JSON.stringify(cartData),
            headers:{'content-type':'application/json'}
        })
        const data=await response.json();
        resolve({data})
        
    })
}


export function fetchItemsByUserId() {
    return new Promise(async (resolve) =>{
     
      const response = await fetch(`/cart`)
      const data = await response.json()
      resolve({data})
    });
  }

export function removeFromCart(_id){
    return new Promise(async(resolve)=>{
        const response=await fetch(`/cart/${_id}`,{
            method:'DELETE',
            headers:{'content-type':'application/json'}
        })
        const data=await response.json();
        resolve({data:{_id:_id}});
    });
}

export  function resetCart(){
    return new Promise(async(resolve,reject)=>{
        const response=await fetch(`/reset`,{
            method:'DELETE'
        }) 
        const data=await response.json();  
        resolve(data)   
    })
}

