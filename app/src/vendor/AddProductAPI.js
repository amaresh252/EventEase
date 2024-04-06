


export function AddProductapi(formData){
    return new Promise(async(resolve)=>{
        const response= await fetch('/products',{
        method : 'POST',
        body: formData
        });
        const data=await response.json();
        resolve({data});
    });
}

export function fetchAllProduct(){

   
    return new Promise(async(resolve)=>{
        const response=await fetch(`/vendor/products`)
        const data=await response.json()
        resolve({data})
    });
}

export function deleteProduct(itemid) {
  return new Promise(async (resolve) => {
    const response = await fetch(`/products/${itemid}`, {
      method: 'DELETE',
      headers: { 'content-type': 'application/json' },
    });
    console.log(itemid)
    const data = await response.json();
    resolve({ data });
  });
}
export function updateProduct(updatedData){
  return  new Promise(async(resolve)=>{
    const response=await fetch(`/products/${updatedData.get("_id")}`,{
      method:'PATCH',
      body:updatedData
    });
    const data=await response.json();
    resolve({data});
    console.log(updatedData)
  }
  

  )
}

export function fetchAllProductForHome(){
  return new Promise(async(resolve,reject)=>{
    const response=await fetch('/products')
    const data=await response.json();
    resolve({data})
    console.log({data})
  })
}


