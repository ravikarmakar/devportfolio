import { useState, useRef } from "react";
import { axiosInstance } from "../../../lib/axios";
import { Upload, X } from "lucide-react";
import toast from "react-hot-toast";

const ProjectsTab = () => {
  const [title, setTitle] = useState<string>("");
  const [technologies, setTechnologies] = useState<string[]>([]);
  const [links, setLinks] = useState<{ github: string; hosted: string }>({
    github: "",
    hosted: "",
  });
  const [tags, setTags] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [priority, setPriority] = useState<string>("medium");
  const [status, setStatus] = useState<string>("active");
  const [description, setDescription] = useState<string>("");
  const [image, setImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const priorityOptions = ["high", "medium", "low"];
  const statusOptions = ["upcoming", "in-progress", "completed"];

  const handleGithubChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLinks((prevLinks) => ({
      ...prevLinks,
      github: e.target.value,
    }));
  };

  const handleHostedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLinks((prevLinks) => ({
      ...prevLinks,
      hosted: e.target.value,
    }));
  };

  const handlePriorityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPriority(e.target.value);
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatus(e.target.value);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Check file type
      if (!["image/jpeg", "image/png", "image/gif"].includes(file.type)) {
        setError("Only JPEG, PNG, and GIF images are allowed");
        return;
      }

      // Check file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        setError("Image size should be less than 5MB");
        return;
      }

      // Read and set image
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
        setError(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageRemove = () => {
    setImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const projectData = {
      title,
      technologies,
      links: {
        github: links.github,
        hosted: links.hosted,
      },
      tags,
      priority,
      status,
      description,
      imageUrl: image,
    };

    console.log(projectData);

    try {
      setIsLoading(true);
      setError(null);
      await axiosInstance.post("/admin/project", projectData, {
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setTitle("");
      setTechnologies([]);
      setLinks({ github: "", hosted: "" });
      setTags([]);
      setPriority("medium");
      setStatus("active");
      setDescription("");
      setImage(null);

      toast.success("Project added successfully");
    } catch (error: any) {
      toast.error("Failed to add Project: " + error.message);
      setError("Failed to add Project: " + error.message);
      console.error("Error submitting form:", error);
    } finally {
      setIsLoading(false);
      setError(null);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold dark:text-white mb-4">
          Projects Management
        </h2>
        <div className="bg-white dark:bg-secondary/20 rounded-xl p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="mb-4">
                <label
                  htmlFor="title"
                  className="block text-sm text-blue-500 font-medium dark:text-gray-300 mb-1"
                >
                  Project Title
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className={`w-full px-4 py-2 rounded-lg bg-white dark:bg-secondary/20 border ${
                    error
                      ? "border-red-500 focus:border-red-500"
                      : "border-gray-300 dark:border-gray-600 focus:border-accent"
                  } focus:outline-none focus:ring-2 focus:ring-accent/20 transition-colors`}
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="technologies"
                  className="block text-sm text-blue-500 font-medium dark:text-gray-300 mb-1"
                >
                  Technologies Used
                </label>
                <input
                  type="text"
                  id="technologies"
                  name="technologies"
                  value={technologies}
                  onChange={(e) => setTechnologies(e.target.value.split(","))}
                  className={`w-full px-4 py-2 rounded-lg bg-white dark:bg-secondary/20 border ${
                    error
                      ? "border-red-500 focus:border-red-500"
                      : "border-gray-300 dark:border-gray-600 focus:border-accent"
                  } focus:outline-none focus:ring-2 focus:ring-accent/20 transition-colors`}
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="githubUrl"
                  className="block text-sm text-blue-500 font-medium dark:text-gray-300 mb-1"
                >
                  GitHub URL
                </label>
                <input
                  type="githubUrl"
                  id="githubUrl"
                  name="githubUrl"
                  value={links.github}
                  onChange={handleGithubChange}
                  className={`w-full px-4 py-2 rounded-lg bg-white dark:bg-secondary/20 border ${
                    error
                      ? "border-red-500 focus:border-red-500"
                      : "border-gray-300 dark:border-gray-600 focus:border-accent"
                  } focus:outline-none focus:ring-2 focus:ring-accent/20 transition-colors`}
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="hostedUrl"
                  className="block text-sm text-blue-500 font-medium dark:text-gray-300 mb-1"
                >
                  Live Demo URL
                </label>
                <input
                  type="hostedUrl"
                  id="hostedUrl"
                  name="hostedUrl"
                  value={links.hosted}
                  onChange={handleHostedChange}
                  className={`w-full px-4 py-2 rounded-lg bg-white dark:bg-secondary/20 border ${
                    error
                      ? "border-red-500 focus:border-red-500"
                      : "border-gray-300 dark:border-gray-600 focus:border-accent"
                  } focus:outline-none focus:ring-2 focus:ring-accent/20 transition-colors`}
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="tags"
                  className="block text-sm text-blue-500 font-medium dark:text-gray-300 mb-1"
                >
                  Tags
                </label>
                <input
                  type="tags"
                  id="tags"
                  name="tags"
                  value={tags}
                  onChange={(e) => setTags(e.target.value.split(","))}
                  className={`w-full rows-4 px-4 py-2 rounded-lg bg-white dark:bg-secondary/20 border ${
                    error
                      ? "border-red-500 focus:border-red-500"
                      : "border-gray-300 dark:border-gray-600 focus:border-accent"
                  } focus:outline-none focus:ring-2 focus:ring-accent/20 transition-colors`}
                />
              </div>

              <div>
                <label
                  htmlFor="priority"
                  className="block text-sm text-blue-500 font-medium dark:text-gray-300 mb-1"
                >
                  Priority:{" "}
                </label>
                <select
                  id="priority"
                  value={priority}
                  onChange={handlePriorityChange}
                  className={`w-full px-4 py-2 rounded-lg bg-white dark:bg-secondary/20 border ${
                    error
                      ? "border-red-500 focus:border-red-500"
                      : "border-gray-300 dark:border-gray-600 focus:border-accent"
                  } focus:outline-none focus:ring-2 focus:ring-accent/20 transition-colors`}
                >
                  {priorityOptions.map((priorityOption) => (
                    <option key={priorityOption} value={priorityOption}>
                      {priorityOption.charAt(0).toUpperCase() +
                        priorityOption.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="status"
                  className="block text-sm text-blue-500 font-medium dark:text-gray-300 mb-1"
                >
                  Status:{" "}
                </label>
                <select
                  id="status"
                  value={status}
                  onChange={handleStatusChange}
                  className={`w-full px-4 py-2 rounded-lg bg-white dark:bg-secondary/20 border ${
                    error
                      ? "border-red-500 focus:border-red-500"
                      : "border-gray-300 dark:border-gray-600 focus:border-accent"
                  } focus:outline-none focus:ring-2 focus:ring-accent/20 transition-colors`}
                >
                  {statusOptions.map((statusOption) => (
                    <option key={statusOption} value={statusOption}>
                      {statusOption.charAt(0).toUpperCase() +
                        statusOption.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mb-4">
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Project Description
              </label>
              <textarea
                id="description"
                name="description"
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className={`w-full px-4 py-2 rounded-lg bg-white dark:bg-secondary/20 border ${
                  error
                    ? "border-red-500 focus:border-red-500"
                    : "border-gray-300 dark:border-gray-600 focus:border-accent"
                } focus:outline-none focus:ring-2 focus:ring-accent/20 transition-colors`}
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Project Screenshot
              </label>
              <input
                ref={fileInputRef}
                type="file"
                name="image"
                accept="image/jpeg,image/png,image/gif"
                onChange={handleImageChange}
                className="hidden"
              />

              {image ? (
                <div className="flex items-center gap-2 p-2 bg-accent/10 rounded-lg">
                  <span className="text-sm text-gray-600 dark:text-gray-300 flex-1 truncate">
                    <img src={image} alt="" />
                  </span>
                  <button
                    type="button"
                    onClick={handleImageRemove}
                    className="p-1 hover:bg-red-100 dark:hover:bg-red-900/20 rounded-full text-red-500"
                  >
                    <X size={20} className="text-red-500" />
                  </button>
                </div>
              ) : (
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-4 text-center cursor-pointer hover:border-accent transition-colors"
                >
                  <Upload className="mx-auto h-8 w-8 text-gray-400 dark:text-gray-500" />
                  <p className="mt-2 text-sm text-gray-600">
                    Click to upload image (JPEG, PNG, GIF)
                  </p>
                  <p className="text-xs text-gray-500">Max 5MB</p>
                </div>
              )}

              {error && (
                <p className="mt-2 text-sm text-red-500 text-center">{error}</p>
              )}
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 bg-accent hover:bg-accent/90 text-white"
              >
                {isLoading ? "Saving..." : "Save Project"}
              </button>
            </div>
          </form>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-semibold dark:text-white mb-4">
          Existing Projects
        </h3>
        {/* <DataTable columns={columns} /> */}
      </div>
    </div>
  );
};

export default ProjectsTab;
