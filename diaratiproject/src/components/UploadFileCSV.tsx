import { useState } from "react";
import axios from "axios";

type FileUploadResponse = {
  fileName: string;
  fileContent: string;
};

//Initialisation des variables d'état avec des valeurs nulles pour le fichier
// Et des chaînes vides pour le nom du fichier et son contenu avec le hook useState de React.

const UploadFileCSV = () => {
  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState("");
  const [fileContent, setFileContent] = useState("");

  //Mettre à jour l'état de l'app avec le fichier sélectionné et son nom.
  
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
      setFileName(event.target.files[0].name);
    }
  };

  //La constante handleSubmit pour le téléchargement, pour empêcher le comportement par défaut du formulaire
  //Et utiliser l'API axios pour envoyer le fichier séléctionné à l'endpoint "/api/upload".
  
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("file", file as File);
    try {
      const response = await axios.post<FileUploadResponse>("/api/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response.data.fileName);
      console.log(response.data.fileContent);
      // TODO: Envoyer le contenu du fichier à la base de données
      setFile(null);
      setFileName("");
      setFileContent("");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Télécharger un fichier CSV</h1>
      <form onSubmit={handleSubmit}>
        <input type="file" accept=".csv" onChange={handleFileChange} />
        <button type="submit" disabled={!file}>
          Télécharger
        </button>
      </form>
      {file && (
        <div>
          <h2>Nom du fichier : {fileName}</h2>
        </div>
      )}
    </div>
  );
};

export default UploadFileCSV;