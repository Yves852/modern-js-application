 const del = async id => {
     const r = confirm('Etes vous sur de vouloir supprimer ce personnage?');
            if (r == true){
                const del = await fetch(`https://character-database.becode.xyz/characters/${id}`, {method: 'DELETE',
            headers:{
                "Content-Type":"application/json",
                
            }})
            window.open('index.html', '_self')
            }else return 
        }