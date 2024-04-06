


export function createUser(userData){
    return new Promise(async(resolve,reject)=>{
      try{
        const response=await fetch('/auth',{
            method:'POST',
            body:JSON.stringify(userData),
            headers:{'content-type':'application/json'}
        })
        if(response.ok){
          const data = await response.json();
        
        resolve({data})
        }
        else  {
          const error = await response.text();
          reject(error)
          console.log('Errors',error);
        }
        
      } catch(error){
        reject(error)
        console.log('Errors',error);
      }
    })
}

export function loginUser(userData){

    return new Promise (async(resolve,reject)=>{
        try{
            const response = await fetch('/auth/login',{
              method: 'POST',
              body: JSON.stringify(userData),
              headers: { 'content-type': 'application/json' },
            });
            if(response.ok){
              const data = await response.json();
            
            resolve({data})
            }
            else  {
              const error = await response.text();
              reject(error)
              console.log('Errors',error);
            }
            
          } catch(error){
            reject(error)
            console.log('Errors',error);
          }
    })
}

export function checkAuth(){
    return new Promise(async (resolve, reject) => {
        try {
          const response = await fetch('/auth/check');
          if (response.ok) {
            const data = await response.json();
            resolve({ data });
          } else {
            const error = await response.text();
            reject(error);
          }
        } catch (error) {
          reject( error );
        }
      
    })
   }
   export function userInfo(){
    return new  Promise(async(resolve)=>{
       const response=await fetch(`/user`);
       const data=await response.json();
       resolve({data})
      
    })
   }

export function updateUser(userData){
 return new  Promise(async(resolve)=>{
    const response=await fetch(`/auth`,{
        method:'PATCH',
        body:JSON.stringify(userData),
        headers:{'content-type':'application/json'}
    })
    const data=await response.json();
    resolve({data})
   
 })
}

export function signOut(){
    console.log('logout')
    return new Promise (async(resolve,reject)=>{
        try {
            const response = await fetch('/auth/logout');
            if (response.ok) {
              resolve({ data:"success" });
            } else {
              const error = await response.text();
              reject(error);
            }
          } catch (error) {
            reject( error );
          }
        });
}




