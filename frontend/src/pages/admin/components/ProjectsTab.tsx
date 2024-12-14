import { useState, useRef, useEffect } from "react";
import { Edit, Trash2, Plus, X, Pencil } from "lucide-react";
import { useProjectStore } from "../../../store/useProjectStore";
import FormInput from "./elements/FormInput";
import FormTextArea from "./elements/FormTextArea";
import FileUpload from "./elements/FileUpload";
import toast from "react-hot-toast";
import SelectInput from "./elements/SelectInput";
import ActionButton from "./elements/ActionButton";

type Links = {
  github: string;
  hosted: string;
};

type FormDataType = {
  _id?: string;
  title: string;
  technologies: string[];
  links: Links;
  tags: string[];
  priority: "high" | "medium" | "low";
  status: "upcoming" | "in-progress" | "completed";
  description: string;
  image: string | null;
};

const ProjectsTab = () => {
  const {
    fetchProjects,
    projects,
    createProject,
    deleteProject,
    updateProject,
    isLoading,
  } = useProjectStore();

  const [formData, setFormData] = useState<FormDataType>({
    title: "",
    technologies: [],
    links: { github: "", hosted: "" },
    tags: [],
    priority: "medium",
    status: "upcoming",
    description: "",
    image: null,
  });

  const [action, setAction] = useState<"create" | "update">("create");
  const [error, setError] = useState<string | null | undefined>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const priorityOptions: ("high" | "medium" | "low")[] = [
    "high",
    "medium",
    "low",
  ];
  const statusOptions = ["upcoming", "in-progress", "completed"];

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  // All handlers

  const handleReset = () => {
    setFormData({
      title: "",
      technologies: [],
      links: { github: "", hosted: "" },
      priority: "low",
      status: "upcoming",
      description: "",
      image: null,
      tags: [],
    });
    setAction("create");
  };

  const handleUpdate = (id: string) => {
    if (!projects || projects.length === 0) {
      toast.error("No projects available for update.");
      return;
    }

    const projectToEdit = projects.find((project) => project._id === id);

    if (projectToEdit) {
      setAction("update");

      function isPriority(
        priority: "high" | "medium" | "low" | number
      ): priority is "high" | "medium" | "low" {
        return priorityOptions.includes(priority as "high" | "medium" | "low");
      }

      const validPriority: "high" | "medium" | "low" = isPriority(
        projectToEdit.priority
      )
        ? projectToEdit.priority
        : "medium";

      const validStatus: "upcoming" | "in-progress" | "completed" = [
        "upcoming",
        "in-progress",
        "completed",
      ].includes(projectToEdit.status)
        ? (projectToEdit.status as "upcoming" | "in-progress" | "completed")
        : "upcoming";
      setFormData({
        _id: projectToEdit._id,
        title: projectToEdit.title,
        technologies: projectToEdit.technologies,
        links: projectToEdit.links,
        priority: validPriority,
        status: validStatus,
        description: projectToEdit.description,
        image: projectToEdit.imgUrl,
        tags: projectToEdit.tags,
      });
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteProject(id);
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "technologies" || name === "tags" ? value.split(",") : value,
    }));
  };

  const handleLinksChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      links: { ...prev.links, [name]: value },
    }));
  };

  const handleFileSelect = (selectedFile: File) => {
    if (!["image/jpeg", "image/png", "image/gif"].includes(selectedFile.type)) {
      setError("Only JPEG, PNG, and GIF images are allowed");
      return;
    }

    if (selectedFile.size > 10 * 1024 * 1024) {
      setError("Image size should be less than 10MB");
      return;
    }

    setFile(selectedFile);
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData((prev) => ({ ...prev, image: reader.result as string }));
      setError(null);
    };
    reader.readAsDataURL(selectedFile);
  };

  const handleImageRemove = () => {
    console.log("handleImageRemove called");
    setFormData((prev) => ({ ...prev, image: null }));
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    setFile(null);
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (action === "create") {
        await createProject(formData);
      } else if (action === "update" && formData._id) {
        await updateProject(formData._id, formData);
      }

      setFormData((prev) => ({
        ...prev,
        title: "",
        technologies: [],
        links: { github: "", hosted: "" },
        description: "",
        image: null,
        tags: [],
      }));
      setFile(null);
      setAction("create");
    } catch (error: any) {
      console.error("Submission failed:", error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <div className="flex justify-between items-center gap-6 mb-4">
          <h2 className="text-2xl font-bold dark:text-white mb-4">
            Projects Management
          </h2>
        </div>
        <div className="bg-white dark:bg-secondary/20 rounded-xl p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Title */}
              <FormInput
                label="Project Title"
                placeholder="Project Title"
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                error={error}
                required={true}
              />

              {/*Technologies  */}
              <FormInput
                label="Technologies Used"
                name="technologies"
                type="text"
                placeholder="React.js, Next.js, JavaScript, TypeScript, etc."
                value={formData.technologies.join(",")}
                onChange={handleInputChange}
                error={error}
                required={true}
              />
              <FormInput
                label="Tags Used"
                name="tags"
                type="text"
                placeholder="React.js, Next.js, JavaScript, TypeScript, etc."
                value={formData.tags.join(",")}
                onChange={handleInputChange}
                error={error}
                required={true}
              />

              {/* Links : Github and Live Demo */}
              <FormInput
                label="GitHub URL"
                name="github"
                type="url"
                value={formData.links.github}
                placeholder="https://github.com/username/project"
                onChange={handleLinksChange}
                error={error}
                required={true}
              />
              <FormInput
                label="Live Demo URL"
                name="hosted"
                type="url"
                placeholder="https://example.com"
                value={formData.links.hosted}
                onChange={handleLinksChange}
                error={error}
                required={true}
              />

              {/* All Selecters  */}

              <SelectInput
                label="Status"
                name="status"
                value={formData.status}
                options={statusOptions}
                onChange={handleInputChange}
                error={error}
              />
              <SelectInput
                label="Priority"
                name="priority"
                value={formData.priority}
                options={priorityOptions}
                onChange={handleInputChange}
                error={error}
              />
            </div>

            {/* Description */}
            <FormTextArea
              label="Description"
              placeholder="Add your project description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              error={error ?? undefined}
              required={true}
              rows={4}
            />

            {/* Project Image */}
            <FileUpload
              label="Project Image"
              name="projectImage"
              accept="image/*"
              error={!file ? "File is required" : undefined}
              currentFile={file?.name}
              onFileSelect={handleFileSelect}
              onFileRemove={handleImageRemove}
              required={true}
              fileInputRef={fileInputRef}
            />

            {/* Action Buttons */}
            <div className="mt-6 flex justify-end gap-4">
              {/* Reset Button */}
              <ActionButton
                label="Reset"
                type="reset"
                variant="secondary"
                icon={<X className="w-4 h-4" />}
                isLoading={false}
                onClick={handleReset}
              />

              {/* Conditional Button for Create/Update */}
              <ActionButton
                label={action === "create" ? "Create" : "Update"}
                type="submit"
                variant="primary"
                isLoading={isLoading}
                disabled={isLoading}
                icon={
                  action === "create" ? (
                    <Plus className="w-4 h-4" />
                  ) : (
                    <Pencil className="w-4 h-4" />
                  )
                }
              />
            </div>

            {/*  */}
          </form>
        </div>
      </div>

      <div className="border-t border-gray-400 dark:border-gray-600 px-2 py-4">
        <h3 className="text-3xl mb-8 font-semibold dark:text-white">
          Existing Projects
        </h3>

        <div>
          {projects.map((project, index) => (
            <div
              key={project?._id}
              className="flex mb-4 w-70 flex-col gap-2 rounded-lg shadow-lg p-4 bg-[#191C1E]"
            >
              <h3 className="text-lg font-bold text-gray-300 md:text-xl">
                {index + 1}. {project?.title}
              </h3>
              <p className="text-gray-400">{project?.description}</p>
              <div className="mt-4 flex justify-end gap-4 items-center">
                <button
                  onClick={() => handleUpdate(project?._id)}
                  disabled={isLoading}
                  className="flex items-center text-blue-500 rounded hover:text-blue-700 transition-all"
                >
                  <Edit />
                </button>
                <button
                  onClick={() => handleDelete(project?._id)}
                  disabled={isLoading}
                  className="flex items-center text-red-500 rounded hover:text-red-700 transition-all"
                >
                  <Trash2 />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectsTab;
