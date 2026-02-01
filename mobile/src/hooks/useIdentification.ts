import { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { Alert } from "react-native";
import { MOCK_SPECIES_RESULT } from "../data/mocks/specieMocks";

export function useIdentification() {
  const [status, setStatus] = useState<"input" | "loading" | "result">("input");
  const [selectImage, setSelectImage] = useState<string | null>(null);
  const [resultData, setResultData] = useState(MOCK_SPECIES_RESULT);

  const handleSelectImage = async (source: "camera" | "gallery") => {
    try {
      const options: ImagePicker.ImagePickerOptions = {
        mediaTypes: ["images"], //versão mais recente
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      };
      let result;

      if (source === "camera") {
        const permission = await ImagePicker.requestCameraPermissionsAsync();

        if (!permission.granted) {
          Alert.alert("Permissão necessária", "Precisamos de acesso à câmera.");
          return;
        }
        result = await ImagePicker.launchCameraAsync(options);
      } else {
        result = await ImagePicker.launchImageLibraryAsync(options);
      }

      if (!result.canceled && result.assets[0]) {
        const imgUri = result.assets[0].uri;
        setSelectImage(imgUri);
        setStatus("loading");

        setTimeout(() => {
          setResultData({ ...MOCK_SPECIES_RESULT, imageUrl: imgUri });
          setStatus("result");
        }, 3000);
      }
    } catch (error) {
      console.log("Erro ao selecionar imagem:", error);
      Alert.alert("Erro", "Não foi possível carregar a imagem.");
    }
  };

  const handleReset = () =>{
    setStatus('input');
    setSelectImage(null);
  };
  return{
    status,
    selectImage,
    resultData,
    handleSelectImage,
    handleReset,
  };
}
