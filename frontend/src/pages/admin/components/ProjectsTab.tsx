// import React, { useState } from "react";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { z } from "zod";
import FormInput from "./elements/FormInput";
import FormTextArea from "./elements/FormTextArea";
// import FileUpload from "./elements/FileUpload";
import ActionButton from "./elements/ActionButton";
import DataTable from "./elements/DataTable";

// const projectSchema = z.object({
//   title: z.string().min(1, "Title is required"),
//   description: z.string().min(1, "Description is required"),
//   technologies: z.string().min(1, "Technologies are required"),
//   githubUrl: z.string().url("Must be a valid URL"),
//   liveUrl: z.string().url("Must be a valid URL").optional(),
// });

// type ProjectFormData = z.infer<typeof projectSchema>;

const ProjectsTab = () => {
  // const [selectedImage, setSelectedImage] = useState<File | null>(null);
  // const [isSubmitting, setIsSubmitting] = useState(false);

  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors },
  //   reset,
  // } = useForm<ProjectFormData>({
  //   resolver: zodResolver(projectSchema),
  // });
  const register = () => {};
  // const handleSubmit = () => {};

  // const onSubmit = () => {};
  // const onSubmit = async (data: ProjectFormData) => {
  //   setIsSubmitting(true);
  //   try {
  //     // Here you would typically:
  //     // 1. Upload the image to your storage service
  //     // 2. Send the form data along with the image URL to your backend
  //     console.log("Form data:", data);
  //     console.log("Selected image:", selectedImage);

  //     reset();
  //     setSelectedImage(null);
  //   } catch (error) {
  //     console.error("Error submitting project:", error);
  //   } finally {
  //     setIsSubmitting(false);
  //   }
  // };

  const mockProjects = [
    {
      id: 1,
      title: "E-Commerce Platform",
      technologies: "React, Node.js, MongoDB",
      status: "Published",
      createdAt: "2024-03-10",
    },
    // Add more mock data as needed
  ];

  const columns = [
    { key: "title", label: "Title" },
    { key: "technologies", label: "Technologies" },
    { key: "status", label: "Status" },
    { key: "createdAt", label: "Created At" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold dark:text-white mb-4">
          Projects Management
        </h2>
        <div className="bg-white dark:bg-secondary/20 rounded-xl p-6">
          {/* onSubmit={handleSubmit(onSubmit)} */}
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormInput
                label="Project Title"
                name="title"
                register={register}
                // error={errors.title?.message}
                required
              />
              <FormInput
                label="Technologies Used"
                name="technologies"
                register={register}
                // error={errors.technologies?.message}
                required
              />
              <FormInput
                label="GitHub URL"
                name="githubUrl"
                register={register}
                // error={errors.githubUrl?.message}
                required
              />
              <FormInput
                label="Live Demo URL"
                name="liveUrl"
                register={register}
                // error={errors.liveUrl?.message}
              />
            </div>

            <FormTextArea
              label="Project Description"
              name="description"
              register={register}
              // error={errors.description?.message}
              required
            />

            {/* <FileUpload
              label="Project Screenshot"
              name="screenshot"
              accept="image/*"
              // onFileSelect={(file) => setSelectedImage(file)}
              // currentFile={selectedImage?.name}
              // onFileRemove={() => setSelectedImage(null)}
              required
            /> */}

            <div className="flex justify-end gap-4">
              <ActionButton
                label="Cancel"
                variant="secondary"
                // onClick={() => reset()}
              />
              <ActionButton
                label="Save Project"
                type="submit"
                // isLoading={isSubmitting}
              />
            </div>
          </form>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-semibold dark:text-white mb-4">
          Existing Projects
        </h3>
        <DataTable
          columns={columns}
          data={mockProjects}
          onEdit={(item) => console.log("Edit:", item)}
          onDelete={(item) => console.log("Delete:", item)}
          onView={(item) => console.log("View:", item)}
        />
      </div>
    </div>
  );
};

export default ProjectsTab;
