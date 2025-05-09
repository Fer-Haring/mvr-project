export const convertBase64ImageToFile = (base64Image: string) => {
  const base64Data = base64Image.split(';base64,').pop();
  const byteCharacters = atob(base64Data!);
  const byteNumbers = new Array(byteCharacters.length);
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  const byteArray = new Uint8Array(byteNumbers);
  const blob = new Blob([byteArray], { type: 'image/jpeg' });
  const file = new File([blob], 'nombre_de_imagen.jpg', { type: 'image/jpeg' });

  return file;
};
