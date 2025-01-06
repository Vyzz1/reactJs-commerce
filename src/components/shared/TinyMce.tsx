import { Editor } from "@tinymce/tinymce-react";
import { useController, useFormContext } from "react-hook-form";

type TinyMceProps = {
  initialValue?: string;
  title: string;
  name: string; // Add this prop
};

const TinyMce = ({ initialValue, title, name }: TinyMceProps) => {
  const { control } = useFormContext();
  const {
    field: { onChange, ...field },
  } = useController({ control, name });

  return (
    <>
      <p className="text-slate-600 text-lg m-0 p-0">{title}</p>
      <Editor
        apiKey={import.meta.env.VITE_TINY_MCE_API_KEY!}
        {...field}
        onEditorChange={onChange}
        init={{
          plugins:
            "anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount linkchecker",
          toolbar:
            "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog typography | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat",
          tinycomments_mode: "embedded",
          tinycomments_author: "Author name",
          mergetags_list: [
            { value: "First.Name", title: "First Name" },
            { value: "Email", title: "Email" },
          ],
          branding: false,
        }}
        value={initialValue}
      />
    </>
  );
};

export default TinyMce;
