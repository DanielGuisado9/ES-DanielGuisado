//⭐⭐⭐⭐
function createFrame(names) {
    !Array.isArray(names) || names.length === 0
  
    // Encontrar la longitud del nombre más largo
    const maxLength = Math.max(...names.map(name => name.length));
  
    // Crear la línea superior e inferior del marco
    const border = '*'.repeat(maxLength + 4);
  
    // Construir el contenido del marco con cada nombre
    const framedNames = names.map(name => `* ${name.padEnd(maxLength)} *`);
  
    // Combinar el marco completo
    const frame = [border, ...framedNames, border].join('\n');
  
    return frame;
  }