
export function createOrder(orderData){
    return new Promise (async(resolve)=>{
        const  response=await fetch('/order',{
            method:'POST',
            body:JSON.stringify(orderData),
            headers:{'content-type':'application/json'}
        })
        const data=await response.json();
        resolve({data})
    }
    )
}

export function fetchUserOrder(){
    return new Promise(async(resolve)=>{
        const  response=await  fetch(`/order`)
        const data=await response.json();
        resolve({data})
    })
}

export function createVendorSideOrder(vendorSideOrder){
    return new Promise(async(resolve,reject)=>{
       const response=await fetch('/vendor-side-order',{
         method:'POST',
         body:JSON.stringify(vendorSideOrder),
         headers:{'content-type':'application/json'}
       })
       const data=await response.json();
       resolve({data})
    })
}

export function fetchVendorSideOrder(){
    return new Promise(async(resolve,reject)=>{
        const response=await fetch(`/vendor-side-order`);
        const data=await response.json();
        resolve({data})
    })
}

export function fetchCustomerCurrentOrder(){
    return new Promise(async(resolve,reject)=>{
        const response=await fetch(`/customer-current-order`);
        const data=await response.json();
        resolve({data})
    })
}

export function fetchSingleVendorSideOrder(_id){
    return new Promise(async(resolve,reject)=>{
        const response=await fetch(`/single-vendor-side-order/${_id}`);
        const data=await response.json();
        resolve({data:data[0]})
    })
}
export function updateVendorSideOrder(vendorSideProduct){
    return new Promise(async(resolve,reject)=>{
        const response=await fetch(`/vendor-side-order/${vendorSideProduct._id}`,{
            method:'PUT',
            body:JSON.stringify(vendorSideProduct),
            headers:{'content-type':'application/json'}
        });
        const data=await response.json();
        resolve({data})
    })
}
export function deleteVendorSideOrder(_id){
    return new Promise(async(resolve,reject)=>{
        const response=await fetch(`/vendor-side-order/${_id}`,{
            method:'DELETE',
        });
        const data=await response.json();
        resolve({data})
    })
}