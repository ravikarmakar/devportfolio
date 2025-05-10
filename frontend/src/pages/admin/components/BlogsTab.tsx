// import { useState } from "react";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { z } from "zod";
// import FormInput from "./elements/FormInput";
// import FormTextArea from "./elements/FormTextArea";
// // import FileUpload from "./elements/FileUpload";
// import ActionButton from "./elements/ActionButton";
// import DataTable from "./elements/DataTable";

// const blogSchema = z.object({
//   title: z.string().min(1, "Title is required"),
//   summary: z.string().min(1, "Summary is required"),
//   content: z.string().min(1, "Content is required"),
//   tags: z.string().min(1, "Tags are required"),
// });

// type BlogFormData = z.infer<typeof blogSchema>;
// // const register = (name: string) => console.log(name);

// const BlogsTab = () => {
//   const [selectedImage, setSelectedImage] = useState<File | null>(null);
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     reset,
//   } = useForm<BlogFormData>({
//     resolver: zodResolver(blogSchema),
//   });

//   const onSubmit = async (data: BlogFormData) => {
//     setIsSubmitting(true);
//     try {
//       console.log("Form data:", data);
//       console.log("Featured image:", selectedImage);
//       reset();
//       setSelectedImage(null);
//     } catch (error) {
//       console.error("Error submitting blog post:", error);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const mockPosts = [
//     {
//       id: 1,
//       title: "Getting Started with React",
//       status: "Published",
//       views: 1234,
//       createdAt: "2024-03-10",
//     },
//     {
//       id: 2,
//       title: "Advanced TypeScript Tips",
//       status: "Draft",
//       views: 0,
//       createdAt: "2024-03-09",
//     },
//   ];

//   const columns = [
//     { key: "title", label: "Title" },
//     { key: "status", label: "Status" },
//     { key: "views", label: "Views" },
//     { key: "createdAt", label: "Created At" },
//   ];

//   return (
//     <div className="space-y-8">
//       <div>
//         <h2 className="text-2xl font-bold dark:text-white mb-4">
//           Blog Management
//         </h2>
//         <div className="bg-white dark:bg-secondary/20 rounded-xl p-6">
//           {/* onSubmit={handleSubmit(onSubmit)} */}
//           <form className="space-y-6">
//             <FormInput
//               label="Blog Title"
//               name="title"
//               // register={register}
//               error={errors.title?.message}
//               required
//             />

//             <FormTextArea
//               label="Summary"
//               name="summary"
//               register={register}
//               error={errors.summary?.message}
//               required
//             />

//             <FormTextArea
//               label="Content"
//               name="content"
//               register={register}
//               error={errors.content?.message}
//               required
//               rows={8}
//             />

//             <FormInput
//               label="Tags (comma separated)"
//               name="tags"
//               register={register}
//               error={errors.tags?.message}
//               required
//             />

//             {/* <FileUpload
//               label="Featured Image"
//               name="featuredImage"
//               accept="image/*"
//               onFileSelect={(file) => setSelectedImage(file)}
//               currentFile={selectedImage?.name}
//               // onFileRemove={() => setSelectedImage(null)}
//             /> */}

//             <div className="flex justify-end gap-4">
//               <ActionButton
//                 label="Save as Draft"
//                 variant="secondary"
//                 onClick={() => console.log("Save as draft")}
//               />
//               <ActionButton
//                 label="Publish"
//                 type="submit"
//                 // isLoading={isSubmitting}
//               />
//             </div>
//           </form>
//         </div>
//       </div>

//       <div>
//         <h3 className="text-xl font-semibold dark:text-white mb-4">
//           Blog Posts
//         </h3>
//         <DataTable
//           columns={columns}
//           data={mockPosts}
//           onEdit={(item) => console.log("Edit:", item)}
//           onDelete={(item) => console.log("Delete:", item)}
//           onView={(item) => console.log("View:", item)}
//         />
//       </div>
//     </div>
//   );
// };

// export default BlogsTab;

export const BlogsTab = () => {
  return <div>Blog</div>;
};

//       <div>
//         <h3 className="text-xl font-semibold dark:text-white mb-4">
//           Blog Posts
//         </h3>
//         {/* <DataTable
//           columns={columns}
//           // data={mockPosts}
//           onEdit={(item) => console.log("Edit:", item)}
//           onDelete={(item) => console.log("Delete:", item)}
//           onView={(item) => console.log("View:", item)}
//         /> */}
//       </div>
//     </div>
//   );
// };

// export default BlogsTab;
