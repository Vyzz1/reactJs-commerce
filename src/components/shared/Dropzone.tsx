/* eslint-disable @typescript-eslint/no-unused-expressions */
import { cn } from "@/lib/utils";
import { ArchiveIcon } from "lucide-react";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";

type DropzoneProps = {
  className?: string;
  isMultiple: boolean;
  acceptType: string;
  onChange?: (file: File[]) => void;
};

const Dropzone = ({
  className,
  onChange,
  isMultiple,
  acceptType,
}: DropzoneProps) => {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      onChange && onChange(acceptedFiles);
    },
    [onChange]
  );

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    acceptedFiles,
    fileRejections,
  } = useDropzone({
    onDrop,
    multiple: isMultiple,
    noDrag: false,
    accept: acceptType ? { [acceptType]: [] } : undefined,
  });
  const accepted = acceptedFiles.map((file: File & { path: string }) => (
    <p className="text-sky-400 ml-3 truncate italic" key={file.path}>
      {file.path.slice(0, 100)} - {file.size}
    </p>
  ));
  const fileRejectionItems = fileRejections.map(({ file }) => {
    const fileWithPath = file as File & { path: string };
    return (
      <p key={fileWithPath.path} className="text-red-400 truncate italic ml-3">
        {fileWithPath.path}
      </p>
    );
  });

  return (
    <>
      <div
        {...getRootProps({
          className: cn(
            "w-full h-32 rounded-md border-2 cursor-pointer border-dotted boder-slate-400  px-4 hover:border-sky-300 flex my-3 jutify-center items-center",
            className
          ),
        })}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <div className="text-center w-full text-slate-600 text-lg ">
            Drop the files here
          </div>
        ) : (
          <>
            <div className="flex flex-col justify-center items-center w-full space-y-4">
              <ArchiveIcon className="size-8 text-muted-foreground animate-bounce" />
              <p className="text-muted-foreground text-sm font-beViet hover:text-indigo-200">
                Drag or click to upload your CV here
              </p>
            </div>
          </>
        )}
      </div>
      <aside>
        <ul>{accepted}</ul>
        <ul>{fileRejectionItems}</ul>
        {fileRejectionItems.length > 0 && (
          <p className="text-muted-foreground italic text-red-600">
            {" "}
            This file is not accepted, please upload a valid file{" "}
          </p>
        )}
      </aside>
    </>
  );
};

export default Dropzone;
