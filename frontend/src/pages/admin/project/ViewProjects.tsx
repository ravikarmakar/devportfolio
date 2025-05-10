import { Edit, Trash2, ExternalLink, Calendar, Code, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useProjectStore } from "../../../store/useProjectStore";
import { useEffect, useRef } from "react";
import toast from "react-hot-toast";

export default function ProjectView() {
  const navigate = useNavigate();
  const hasFetched = useRef(false);

  const { projects, fetchAllProjects, deleteProject } = useProjectStore();

  useEffect(() => {
    if (!hasFetched.current) {
      fetchAllProjects();
      hasFetched.current = true;
    }
  }, []);

  // Handle delete project
  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this project")) {
      const result = await deleteProject(id);
      if (result) {
        toast.success("Project deleted successfully");
        await fetchAllProjects();
      }
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-6 text-gray-100">
      {/* Header */}
      <div className="flex justify-between items-center mb-8 border-b border-gray-700 pb-4">
        <h1 className="text-3xl font-bold text-white">My Projects</h1>
        <button
          onClick={() => navigate("/admin/projects/create")}
          className="bg-blue-600 flex gap-2 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors duration-300"
        >
          <Plus /> New Project
        </button>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div
            key={project?._id}
            className="bg-gray-900 rounded-lg overflow-hidden shadow-lg border border-gray-800 transition-all duration-300 hover:shadow-blue-900/20 hover:shadow-xl hover:translate-y-[-4px]"
          >
            {/* Project Image */}
            <div className="relative h-48 overflow-hidden">
              <img
                src={project?.imageUrl}
                alt={project?.title}
                className="w-full h-full object-cover"
              />
              {project?.isFeatured && (
                <span className="absolute top-2 right-2 bg-blue-600 text-white text-xs px-2 py-1 rounded-md">
                  Featured
                </span>
              )}
            </div>

            {/* Project Content */}
            <div className="p-4">
              <h3 className="text-xl font-bold text-white mb-2">
                {project.title}
              </h3>
              <p className="text-gray-400 mb-4 line-clamp-3">
                {project.description}
              </p>

              {/* Project Timeline */}
              <div className="flex items-center text-sm text-gray-500 mb-3">
                <Calendar size={14} className="mr-1" />
                <span>{/* {project.startDate} - {project.endDate} */}</span>
              </div>

              {/* Technologies */}
              <div className="flex flex-wrap gap-2 mb-4">
                {project.technologies.map((tech, index) => (
                  <span
                    key={index}
                    className="text-xs bg-gray-800 text-blue-400 px-2 py-1 rounded-md"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Links */}
              <div className="flex gap-3 mb-4">
                <a
                  href={project?.sourceLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-gray-400 hover:text-white transition-colors text-sm"
                >
                  <Code size={14} className="mr-1" />
                  GitHub
                </a>
                <a
                  href={project?.liveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-gray-400 hover:text-white transition-colors text-sm"
                >
                  <ExternalLink size={14} className="mr-1" />
                  Live Demo
                </a>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-2 pt-2 border-t border-gray-800">
                <button
                  onClick={() =>
                    navigate(`/admin/projects/create?id=${project._id}`)
                  }
                  className="p-2 text-gray-400 hover:text-blue-500 transition-colors duration-300"
                >
                  <Edit size={18} />
                </button>
                <button
                  onClick={() => handleDelete(project?._id)}
                  className="p-2 text-gray-400 hover:text-red-500 transition-colors duration-300"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
