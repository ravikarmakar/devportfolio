import { Upload, X } from "lucide-react";

interface FileUploadProps {
  label: string;
  name: string;
  accept?: string;
  error?: string;
  currentFile?: string;
  onFileSelect: (file: File) => void;
  onFileRemove?: () => void;
  required?: boolean;
  fileInputRef: React.RefObject<HTMLInputElement>;
}

const FileUpload = ({
  label,
  name,
  accept,
  error,
  currentFile,
  onFileSelect,
  onFileRemove = () => {},
  fileInputRef,
  required = false,
}: FileUploadProps) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onFileSelect(file);
    }
  };

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      {currentFile ? (
        <div className="flex items-center gap-2 p-2 bg-accent/10 rounded-lg">
          <span className="text-sm text-gray-600 dark:text-gray-300 flex-1 truncate">
            {currentFile}
          </span>
          {onFileRemove && (
            <button
              type="button"
              onClick={onFileRemove}
              className="p-1 hover:bg-red-100 dark:hover:bg-red-900/20 rounded-full text-red-500"
            >
              <X size={16} />
            </button>
          )}
        </div>
      ) : (
        <div
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-4 text-center cursor-pointer hover:border-accent transition-colors"
        >
          <Upload className="mx-auto h-8 w-8 text-gray-400 dark:text-gray-500" />
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Click to upload or drag and drop
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {accept?.split(",").join(", ")} supported
          </p>
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        name={name}
        value={""}
        accept={accept}
        onChange={handleFileChange}
        className="hidden"
      />
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default FileUpload;
