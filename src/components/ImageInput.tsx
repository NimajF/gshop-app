interface ImageInputProps {
  onFilesSelected: (files: File[]) => void;
}

export default function ImageInputComponent({
  onFilesSelected,
}: ImageInputProps) {
  const handleChangeImages = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const fileArray = Array.from(files);
    onFilesSelected(fileArray);
  };

  return (
    <label className="block cursor-pointer">
      <div className="w-full h-40 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50">
        <span className="text-gray-500">Haz clic o subí varias imágenes</span>
      </div>
      <input
        type="file"
        className="hidden"
        accept="image/*"
        multiple
        onChange={handleChangeImages}
      />
    </label>
  );
}
