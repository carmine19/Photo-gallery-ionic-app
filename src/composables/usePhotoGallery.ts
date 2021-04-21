import { ref, onMounted, watch } from 'vue';
import { Plugins, CameraResultType, CameraSource, CameraPhoto, 
Capacitor, FilesystemDirectory } from "@capacitor/core";


const photos = ref<Photo[]>([]); 



export function usePhotoGallery() {
    const { Camera, Filesystem } = Plugins;
  
    const takePhoto = async () => {
      const cameraPhoto = await Camera.getPhoto({
        resultType: CameraResultType.Uri,
        source: CameraSource.Camera,
        quality: 100
      });

      const fileName = new Date().getTime() + '.jpeg';
      const savedFileImage = {
        filepath: fileName,
        webviewPath: cameraPhoto.webPath
        };

      photos.value = [savedFileImage, ...photos.value];
    };

    const convertBlobToBase64 = (blob: Blob) => new Promise((resolve, reject) => {
      const reader = new FileReader;
      reader.onerror = reject;
      reader.onload = () => {
          resolve(reader.result);
      };
      reader.readAsDataURL(blob);
    });
   
  
    return {
      photos,
      takePhoto,
      convertBlobToBase64
    };
  }

  export interface Photo {
    filepath: string;
    webviewPath?: string;
  }