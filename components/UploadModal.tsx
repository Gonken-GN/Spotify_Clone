import useUploadModal from "@/hooks/useUploadModal";
import Modal from "./Modal";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import Input from "./Input";
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
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          id="title"
          disabled={isLoading}
          {...register("title", { required: true })}
          placeholder="Song Title"
        ></Input>
      </form>
    </Modal>
  );
};

export default UploadModal;
