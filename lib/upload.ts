import * as FileSystem from "expo-file-system";
import { supabase } from "./supabase";

const extFromUri = (uri: string, fallback = "bin") => {
  const match = /\.([a-zA-Z0-9]+)$/.exec(uri);
  return match ? match[1].toLowerCase() : fallback;
};

export async function uploadFileToMediaBucket(
  localUri: string,
  pathPrefix: "images/bhajan-categories" | "images/lyrics-categories" | "audio/bhajans" | string,
  contentTypeHint?: string
) {
  // Determine file extension
  const ext = extFromUri(localUri, contentTypeHint?.split("/")[1] || "bin");
  const fileName = `${pathPrefix}/${Date.now()}.${ext}`;

  // Read local file as Base64
  const base64Data = await FileSystem.readAsStringAsync(localUri, {
    encoding: FileSystem.EncodingType.Base64,
  });

  // Convert Base64 to Uint8Array
  const fileData = Uint8Array.from(atob(base64Data), (c) => c.charCodeAt(0));

  // Upload to Supabase Storage
  const { error } = await supabase.storage
    .from("media")
    .upload(fileName, fileData, {
      contentType:
        contentTypeHint || (pathPrefix.startsWith("images") ? `image/${ext}` : `audio/${ext}`),
      upsert: false,
    });

  if (error) throw error;

  // Get public URL
  const { data } = supabase.storage.from("media").getPublicUrl(fileName);
  return data.publicUrl;
}
