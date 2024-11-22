"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useDropzone } from "react-dropzone"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { AvatarSchema } from "@/lib/schemas/profile"

interface AvatarUploadModalProps {
  isOpen: boolean
  onClose: () => void
  onUpload: (file: File) => Promise<void>
}

export function AvatarUploadModal({ isOpen, onClose, onUpload }: AvatarUploadModalProps) {
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const { toast } = useToast()
  const [isUploading, setIsUploading] = useState(false)

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      "image/jpeg": [".jpg", ".jpeg"],
      "image/png": [".png"],
      "image/webp": [".webp"]
    },
    maxSize: 5 * 1024 * 1024, // 5MB
    maxFiles: 1,
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0]
      try {
        AvatarSchema.parse({ image: file })
        setFile(file)
        setPreview(URL.createObjectURL(file))
      } catch (error: any) {
        toast({
          variant: "destructive",
          title: "Error",
          description: error.errors?.[0]?.message || "Invalid file",
        })
      }
    },
  })

  const handleUpload = async () => {
    if (!file) return

    setIsUploading(true)
    try {
      await onUpload(file)
      toast({
        title: "Success",
        description: "Avatar updated successfully",
      })
      onClose()
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to upload avatar",
      })
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Update Profile Picture</DialogTitle>
          <DialogDescription>
            Upload a new profile picture. Files should be JPG, PNG or WebP, less than 5MB.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div
            {...getRootProps()}
            className={cn(
              "border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors",
              isDragActive ? "border-primary" : "border-muted-foreground/20",
              "hover:border-primary/50"
            )}
          >
            <input {...getInputProps()} />
            {preview ? (
              <div className="relative w-32 h-32 mx-auto">
                <Image
                  src={preview}
                  alt="Preview"
                  fill
                  className="rounded-full object-cover"
                />
              </div>
            ) : (
              <div className="text-muted-foreground">
                <p>Drag and drop your image here, or click to select</p>
                <p className="text-sm mt-2">Maximum file size: 5MB</p>
                <p className="text-sm">Supported formats: JPG, PNG, WebP</p>
              </div>
            )}
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleUpload} disabled={!file || isUploading}>
              {isUploading ? "Uploading..." : "Upload"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
