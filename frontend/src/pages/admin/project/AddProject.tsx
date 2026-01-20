import { useEffect, useState } from "react";
import { X, Plus, Save, Loader } from "lucide-react";
import { useProjectStore } from "../../../store/useProjectStore";
import { useNavigate, useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";

// TypeScript interface for project data
interface ProjectData {
  title: string;
  description: string;
  category: string;
  technologies: string[];
  sourceLink: string;
  liveLink: string;
  details: string;
}

export default function AddProject() {
  const [searchParams] = useSearchParams();
  const currentProjectId = searchParams.get("id");
  const isEditedMode = !!currentProjectId;

  const navigate = useNavigate();
  const [projectData, setProjectData] = useState<ProjectData>({
    title: "",
    description: "",
    category: "",
    technologies: [],
    sourceLink: "",
    liveLink: "",
    details: "",
  });
  const [techInput, setTechInput] = useState<string>("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const { createProject, isLoading, fetchProjectDetails, updateProject } =
    useProjectStore();

  // For Update project
  useEffect(() => {
    if (isEditedMode) {
      (async () => {
        const project = await fetchProjectDetails(currentProjectId);
        if (project) {
          setProjectData({
            title: project.title,
            description: project.description,
            category: project.category,
            sourceLink: project.sourceLink,
            liveLink: project.liveLink,
            details: project.details,
            technologies: project.technologies,
          });
        }
      })();
    }
  }, [currentProjectId, isEditedMode]);

  // Handle text input changes
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setProjectData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle file chnages
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  // Handle file removing
  const removeFile = () => {
    setSelectedFile(null);
  };

  // Handle adding technologies
  const handleAddTech = () => {
    if (
      techInput.trim() !== "" &&
      !projectData.technologies.includes(techInput.trim())
    ) {
      setProjectData((prev) => ({
        ...prev,
        technologies: [...prev.technologies, techInput.trim()],
      }));
      setTechInput("");
    }
  };

  // Handle removing a technologies
  const handleRemoveTech = (tech: string) => {
    setProjectData((prev) => ({
      ...prev,
      technologies: prev.technologies.filter((t) => t !== tech),
    }));
  };

  // Handle Reset Inputs
  const ResetInput = () => {
    setProjectData({
      title: "",
      description: "",
      category: "",
      technologies: [],
      sourceLink: "",
      liveLink: "",
      details: "",
    });

    setSelectedFile(null);
  };

  // Handle backend call
  const handleSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();

    const newFormData = new FormData();

    Object.entries(projectData).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((item) => newFormData.append(key, item));
      } else {
        newFormData.append(key, value.toString());
      }
    });

    if (selectedFile) {
      newFormData.append("image", selectedFile);
    }

    const result = isEditedMode
      ? await updateProject(currentProjectId, newFormData)
      : await createProject(newFormData);

    if (result) {
      toast.success(
        isEditedMode
          ? "Project updated successfully"
          : "Project created successfully"
      );
      navigate("/admin/projects");
    }
  };

  useEffect(() => {
    if (currentProjectId === null) {
      ResetInput();
    }
  }, [currentProjectId]);

  return (
    <div className="rounded-lg w-full overflow-y-auto text-gray-100 border border-gray-700">
      {/* Header */}
      <div className="flex justify-between items-center p-4 border-b border-gray-700">
        <h2 className="text-xl font-bold text-white">Add New Project</h2>
      </div>

      {/* Form */}
      <div className="p-6">
        <div className="grid grid-cols-1 gap-6">
          {/* Image URL */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Upload Image
            </label>

            {!selectedFile ? (
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleFileChange}
                className="w-full p-2 bg-gray-800 border border-gray-700 rounded-md text-white"
              />
            ) : (
              <div className="flex items-center justify-between bg-gray-800 p-2 rounded-md text-white border border-gray-700">
                <span>{selectedFile.name}</span>
                <button
                  onClick={removeFile}
                  type="button"
                  className="text-red-400 hover:text-red-600"
                >
                  Remove
                </button>
              </div>
            )}
          </div>

          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="title"
              value={projectData.title}
              onChange={handleChange}
              className="w-full p-2 bg-gray-800 border border-gray-700 rounded-md text-white"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={projectData.description}
              onChange={handleChange}
              rows={3}
              className="w-full p-2 bg-gray-800 border border-gray-700 rounded-md text-white"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Category
            </label>
            <select
              name="category"
              value={projectData.category}
              onChange={handleChange}
              className="w-full p-2 bg-gray-800 border border-gray-700 rounded-md text-white"
            >
              <option value="">Select Category</option>
              <option value="Web Development">Web Development</option>
              <option value="Full Stack Development">Full Stack Development</option>
              <option value="Mobile App">Mobile App</option>
              <option value="UI/UX Design">UI/UX Design</option>
              <option value="Data Science">Data Science</option>
              <option value="Machine Learning">Machine Learning</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Technologies */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Technologies
            </label>
            <div className="flex">
              <input
                type="text"
                value={techInput}
                onChange={(e) => setTechInput(e.target.value)}
                className="flex-1 p-2 bg-gray-800 border border-gray-700 rounded-l-md text-white"
                placeholder="Add technology"
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAddTech();
                  }
                }}
              />
              <button
                type="button"
                onClick={handleAddTech}
                className="bg-blue-600 hover:bg-blue-700 px-3 rounded-r-md transition-colors"
              >
                <Plus size={18} />
              </button>
            </div>

            {/* Technology tags */}
            <div className="flex flex-wrap gap-2 mt-2">
              {projectData.technologies.map((tech, index) => (
                <span
                  key={index}
                  className="bg-blue-900 text-blue-200 px-2 py-1 rounded-md text-sm flex items-center"
                >
                  {tech}
                  <button
                    onClick={() => handleRemoveTech(tech)}
                    className="ml-1 text-blue-300 hover:text-red-400"
                  >
                    <X size={14} />
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Source Link */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Source Link (GitHub)
            </label>
            <input
              type="text"
              name="sourceLink"
              value={projectData.sourceLink}
              onChange={handleChange}
              className="w-full p-2 bg-gray-800 border border-gray-700 rounded-md text-white"
              placeholder="https://github.com/username/repo"
            />
          </div>

          {/* Live Link */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Live Link
            </label>
            <input
              type="text"
              name="liveLink"
              value={projectData.liveLink}
              onChange={handleChange}
              className="w-full p-2 bg-gray-800 border border-gray-700 rounded-md text-white"
              placeholder="https://myproject.example.com"
            />
          </div>

          {/* Details */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Project Details
            </label>
            <textarea
              name="details"
              value={projectData.details}
              onChange={handleChange}
              rows={5}
              className="w-full p-2 bg-gray-800 border border-gray-700 rounded-md text-white"
              placeholder="Enter detailed information about the project..."
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={ResetInput}
            disabled={isLoading}
            className={`px-4 py-2 border border-gray-600 rounded-md text-gray-300 hover:bg-gray-800 transition-colors ${isLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleSubmit}
            disabled={isLoading}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors flex items-center gap-2 disabled:opacity-60"
          >
            {isLoading ? (
              <Loader className="animate-spin" size={18} />
            ) : (
              <Save size={18} />
            )}
            {isLoading ? "Saving..." : "Save Project"}
          </button>
        </div>
      </div>
    </div>
  );
}
