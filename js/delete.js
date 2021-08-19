const del = async id => {
  const r = confirm('Etes vous sur de vouloir supprimer ce personnage?');
  if (r == true){
    try {
      const del = await fetch(`https://character-database.becode.xyz/characters/${id}`, { method: 'DELETE' });
      window.open('index.html', '_self');
    }
    catch(error) { console.error(error); }
  }
  else { return; }
}

export { del };