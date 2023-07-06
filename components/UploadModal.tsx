import uniqid from "uniqid";
import useUploadModal from "@/hooks/useUploadModal";
import Modal from "./Modal";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import Input from "./Input";
import Button from "./Button";
import { toast } from "react-hot-toast";
import { useUser } from "@/hooks/useUser";
import {
  SupabaseClient,
  useSupabaseClient,
} from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";
const UploadModal = () => {
  const [isLoading, setisLoading] = useState(false);
  const uploadModal = useUploadModal();
  const { user } = useUser();
  const supabaseClient = useSupabaseClient();
  const router = useRouter();

  const { register, handleSubmit, reset } = useForm<FieldValues>({
    defaultValues: {
      author: "",
      title: "",
      song: null,
      image: null,
    },
  });
  const onChange = (open: boolean) => {
    if (!open) {
      reset();
      uploadModal.onClose();
    }
  };
  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    // Upload to supabase
    try {
      setisLoading(true);
      const imageFile = values.image?.[0];
      const songFile = values.song?.[0];
      if (!imageFile || !songFile || !user) {
        toast.error("Please upload an image and a song");
        setisLoading(false);
        return;
      }
      const uniqueID = uniqid();

      // upload song
      const { data: songData, error: songError } = await supabaseClient.storage
        .from("songs")
        .upload(`song-${values.title}-${uniqueID}`, songFile, {
          cacheControl: "3600",
          upsert: false,
        });
      if (songError) {
        toast.error("Failed to upload song");
        setisLoading(false);
        return;
      }
      // upload image
      const { data: imageData, error: imageError } =
        await supabaseClient.storage
          .from("images")
          .upload(`image-${values.title}-${uniqueID}`, imageFile, {
            cacheControl: "3600",
            upsert: false,
          });
      if (imageError) {
        toast.error("Failed to upload image");
        setisLoading(false);
        return;
      }
      const { error: supabaseError } = await supabaseClient
        .from("songs")
        .insert({
          user_id: user.id,
          title: values.title,
          author: values.author,
          image_path: imageData.path,
          song_path: songData.path,
        });

      if (supabaseError) {
        setisLoading(false);
        return toast.error(supabaseError.message);
      }
      router.refresh();
      setisLoading(false);
      toast.success("Successfully uploaded");
      reset();
      uploadModal.onClose();
      // upload song and image
      // const { data: uploadData, error: uploadError } = await supabaseClient.storage
      // .from("uploads")
      // .upload(
      //     `upload-${values.title}-${uniqueID}`,
      //     [songData.id, imageData.id],
      //     {
      //       cacheControl: "3600",
      //       upsert: false,
      //     }
      //   );
      // if (uploadError) {
      //   toast.error(uploadError.message);
      //   setisLoading(false);
      //   return;
    } catch (error) {
      toast.error("something went wrong");
    } finally {
      setisLoading(false);
    }
  };
  return (
    <Modal
      title="Add a song"
      description="Upload a mp3 file"
      isOpen={uploadModal.isOpen}
      onChange={() => {}}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-4">
        <Input
          id="title"
          disabled={isLoading}
          {...register("title", { required: true })}
          placeholder="Song Title"
        />
        <Input
          id="author"
          disabled={isLoading}
          {...register("author", { required: true })}
          placeholder="Song Author"
        />
        <div>
          <div>
            Select a song file
            <Input
              id="song"
              type="file"
              disabled={isLoading}
              {...register("song", { required: true })}
              accept=".mp3"
              placeholder="Song Author"
            />
          </div>
        </div>
        <div>
          <div>
            Select a song image
            <Input
              id="image"
              type="file"
              disabled={isLoading}
              {...register("image", { required: true })}
              accept="image/*"
              placeholder="Song image"
            />
          </div>
        </div>
        <Button disabled={isLoading} type="submit">
          Create
        </Button>
      </form>
    </Modal>
  );
};

export default UploadModal;
