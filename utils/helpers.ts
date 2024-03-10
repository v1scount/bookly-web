export function parseRating(number: number) {
    // Convertir el número a string
    const numberStr = number?.toString();
  
    // Obtener los dos primeros decimales
    const dosDecimales = numberStr?.substring(numberStr?.indexOf(".") + 1, numberStr?.indexOf(".") + 3);
  
    // Convertir los dos decimales a un número entero
    const numberDosDecimales = parseInt(dosDecimales);

    // return Math.floor(number);
    // Formatear el número según los dos decimales
    if (numberDosDecimales < 50) {
      return Math.floor(number);
    } else {
      return Math.floor(number) + 0.5;
    }
  }