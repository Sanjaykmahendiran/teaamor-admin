"use client";
import { useState } from "react";
import { Loader2, UploadCloud } from "lucide-react";
import Image from "next/image";

interface ImageUploadProps {
    variableName: string;
    setImageUrls: React.Dispatch<React.SetStateAction<any>>;
    initialImage?: string;
}

export default function ImageUpload({ variableName, setImageUrls, initialImage }: ImageUploadProps) {
    const [preview, setPreview] = useState<string | null>(initialImage || null);
    const [loading, setLoading] = useState(false);

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // ✅ Validate file type
        const validTypes = ["image/png", "image/jpeg", "image/jpg"];
        if (!validTypes.includes(file.type)) {
            alert("Only PNG, JPEG, and JPG formats are allowed.");
            e.target.value = "";
            return;
        }

        // ✅ Preview Image
        const reader = new FileReader();
        reader.onload = () => {
            setPreview(reader.result as string);
        };
        reader.readAsDataURL(file);

        reader.onloadend = async () => {
            try {
                setLoading(true);

                const base64Image = (reader.result as string).split(",")[1];

                const payload = {
                    gofor: "image_upload",
                    imgname: base64Image,
                    type: "products",
                };

                const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://teaamor.top/connect/api.php"; // Fallback based on user hint, though typically env var is best

                const res = await fetch(apiUrl, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(payload),
                });

                if (!res.ok) throw new Error("Upload failed");

                const data = await res.json();

                // ✅ Save uploaded image URL
                setImageUrls((prev: any) => ({
                    ...prev,
                    [variableName]: data.url, // Assuming the API returns { url: "..." }
                }));
            } catch (error) {
                console.error(error);
                alert("Image upload failed");
            } finally {
                setLoading(false);
            }
        };
    };

    return (
        <div className="w-full">
            <div className="flex items-center gap-4">
                <label className="flex-1 cursor-pointer">
                    <div className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                        {loading ? (
                            <div className="flex flex-col items-center gap-2">
                                <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
                                <p className="text-sm text-gray-500">Uploading...</p>
                            </div>
                        ) : preview ? (
                            <div className="relative w-full h-full p-2">
                                <img
                                    src={preview}
                                    alt="Preview"
                                    className="w-full h-full object-contain rounded-md"
                                />
                                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity rounded-md">
                                    <p className="text-white text-xs font-medium">Change Image</p>
                                </div>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <UploadCloud className="w-8 h-8 mb-2 text-gray-400" />
                                <p className="text-xs text-gray-500 font-medium">Click to upload</p>
                                <p className="text-[10px] text-gray-400">PNG, JPG (MAX. 2MB)</p>
                            </div>
                        )}
                    </div>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                        disabled={loading}
                    />
                </label>
            </div>
        </div>
    );
}
