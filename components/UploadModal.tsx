import useUploadModal from "@/hooks/useUploadModal";
import Modal from "./Modal";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import Input from "./Input";
import Button from "./Button";
const UploadModal = () => {
  const [isLoading, setisLoading] = useState();
  const uploadModal = useUploadModal();
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
  const onSubmit: SubmitHandler<FieldValues> = (values) => {
    // Upload to supabase
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
            Select a song file
            <Input
              id="song"
              type="file"
              disabled={isLoading}
              {...register("song", { required: true })}
              accept="image/*"
              placeholder="Song Author"
            />
          </div>
        </div>
        <Button disabled={isLoading} type="submit">Create</Button>
      </form>
    </Modal>
  );
};

export default UploadModal;
