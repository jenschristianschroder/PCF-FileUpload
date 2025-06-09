import * as React from "react";
import {
  Button,
  Card,
  CardHeader,
  Text,
  tokens,
  makeStyles,
  shorthands,
} from "@fluentui/react-components";
import {
  DocumentRegular,
  DocumentPdfRegular,
  DeleteRegular,
  ArrowUploadRegular,
  // Add any additional icons you need here
} from "@fluentui/react-icons";

export interface IFileObject {
  name: string;
  file: string;
}

export interface IFileUploaderControlProps {
  stateChanged: () => void;
  files: (files: IFileObject[]) => void;
  label: string | null;
  resetControl: string | null;
  multiple: boolean;
  accepts: string | null;
  uploadId: string | null;
  buttonType: string | null;
  actionIcon: string | null;
  dropZoneText: string | null;
  showFileList: boolean;
}

// Define styles using makeStyles
const useStyles = makeStyles({
  dropZone: {
    display: "block",
    textAlign: "center",
    padding: "50px",
    margin: "auto",
    width: "90%",
    height: "70%",
    fontSize: "20px",
    cursor: "pointer",
    ...shorthands.transition("all", "0.2s"),
    // removed hover style to keep default background after drop
    // "&:hover": {
    //   backgroundColor: tokens.colorNeutralBackgroundInverted,
    // },
  },
  isDragging: {
    // keep same size & layout as dropZone when dragging
    display: "block",
    textAlign: "center",
    padding: "50px",
    margin: "auto",
    width: "90%",
    height: "70%",
    fontSize: "20px",
    cursor: "pointer",
    ...shorthands.transition("all", "0.2s"),
    //backgroundColor: tokens.colorNeutralBackgroundInverted,
    ...shorthands.borderStyle("dashed"),
  },
});

export const FileUploader = (props: IFileUploaderControlProps) => {
  const styles = useStyles();
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [files, setFiles] = React.useState<IFileObject[]>([]);
  const {
    resetControl,
    multiple,
    accepts,
    uploadId,
    buttonType,
    actionIcon,
    dropZoneText
  } = props;
  const [isDragging, setIsDragging] = React.useState<boolean>(false);

  const triggerUpload = React.useCallback(() => {
    if (inputRef && inputRef.current) {
      inputRef.current.click();
    }
  }, []);

  React.useEffect(() => {
    setFiles([]);
  }, [resetControl]);

  React.useEffect(() => {
    props.files(files);
    props.stateChanged();
  }, [files]);
  const readFiles = React.useCallback((arrayFiles: File[]) => {
    arrayFiles.forEach((file) => {
      const fileReader = new FileReader();

      fileReader.onloadend = () => {
        const newFile = {
          name: file.name,
          file: fileReader.result as string,
        };
        setFiles((prevFiles) => [...prevFiles, newFile]);
      };
      fileReader.readAsDataURL(file);
    });
  }, []);

  const fileChanged = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        const arrayFiles = Array.from(e.target.files);
        readFiles(arrayFiles);
      }
    },
    [files]
  );

  const onDrop = React.useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files) {
      const arrayFiles = Array.from(e.dataTransfer.files);
      readFiles(arrayFiles);
    }
    // Removed setIsDragging(false) here so drop itself doesn't change color
  }, [readFiles]);
  const onDragOver = React.useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(true);
    },
    [setIsDragging]
  );

  const onDragEnter = React.useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(true);
    },
    [setIsDragging]
  );

  // Add dedicated onDragLeave to reset dragging style
  const onDragLeave = React.useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);
    },
    [setIsDragging]
  );

  const getIcon = React.useCallback(() => {
    if (!actionIcon) return undefined;

    switch (actionIcon) {
      case "ArrowUploadRegular":
        return <ArrowUploadRegular />;
      case "DocumentRegular":
        return <DocumentRegular />;
      case "DocumentPdfRegular":
        return <DocumentPdfRegular />;
      case "DeleteRegular":
        return <DeleteRegular />;
      // Add cases for any other icons you need
      default:
        return undefined;
    }
  }, [actionIcon]);

  const getFileIcon = React.useCallback((fileName: string) => {
    const extension: string | undefined = fileName
      .split(".")
      .pop()
      ?.toLowerCase();
    switch (extension) {
      case "pdf":
        return <DocumentPdfRegular />;
      default:
        return <DocumentRegular />;
    }
  }, []);

  const removeFile = React.useCallback((indexToRemove: number) => {
    setFiles((currentFiles) => {
      const newFiles = [...currentFiles];
      newFiles.splice(indexToRemove, 1);
      return newFiles;
    });
  }, []);

  return (
    <>
      <div style={{ display: "flex", flex: "0 0 100%" }}>
        {" "}
        {buttonType === "dragdrop" && (
          <Card
            onClick={triggerUpload}
            onDrop={onDrop}
            onDragOver={onDragOver}
            onDragEnter={onDragEnter}
            onDragLeave={onDragLeave}  // use the new handler
            className={isDragging ? styles.isDragging : styles.dropZone}
            style={{
              borderWidth: "1px",
              borderColor: "black",
              color: "black",
              borderStyle: "dashed",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
              }}
            >
              <ArrowUploadRegular />
              <Text>{dropZoneText}</Text>
            </div>
          </Card>
        )}
      </div>
      {files.length > 0 && (
        <div style={{ marginTop: "10px", display: "flex", flex: "0 0 100%" }}>
          <Card>
            <CardHeader
              header={<Text weight='semibold'>Selected Files</Text>}
            />
            <div
                style={{
                  overflow: "auto",
                }}
            >
              {files.map((file, index) => (
                  <div
                      key={index}
                      style={{
                        padding: "8px 16px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
                      }}
                  >
                    <div
                        style={{ display: "flex", alignItems: "center", gap: "8px" }}
                    >
                      {getFileIcon(file.name)}
                      <Text>{file.name}</Text>
                    </div>
                    <Button
                        icon={<DeleteRegular />}
                        appearance='subtle'
                        onClick={() => removeFile(index)}
                        aria-label='Remove file'
                    />
                  </div>
              ))}
            </div>
          </Card>
        </div>
      )}
      <input
        type='file'
        id={uploadId ? uploadId : "xe-fileupload-button"}
        value=''
        multiple={multiple}
        ref={inputRef}
        accept={accepts ? accepts : ""}
        onChange={fileChanged}
        style={{
          display: "none",
        }}
      />
    </>
  );
};
