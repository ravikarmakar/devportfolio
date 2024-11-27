import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useSkillStore } from "../../../store/useSkillStore";
import { axiosInstance } from "../../../lib/axios";

interface Skill {
  name: string;
  level: number;
  iconName: string;
  description: string;
}

interface FormData {
  title: string;
  iconName: string;
  description: string;
  skills: Skill[];
}

const SkillsTab: React.FC = () => {
  const { fetchSkillCategories } = useSkillStore();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [newSkill, setNewSkill] = useState<FormData>({
    title: "",
    iconName: "",
    description: "",
    skills: [
      {
        name: "",
        level: 0,
        iconName: "",
        description: "",
      },
    ],
  });

  useEffect(() => {
    fetchSkillCategories();
  }, [fetchSkillCategories]);

  // Handle change for main fields (title, iconName, description)
  const handleMainChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewSkill((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle change for each skill in the nested skills array
  const handleSkillChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewSkill((prev) => {
      const updatedSkills = [...prev.skills];
      updatedSkills[index] = {
        ...updatedSkills[index],
        [name]: name === "level" ? parseInt(value) || 0 : value,
      };
      return { ...prev, skills: updatedSkills };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      setError(false);
      await axiosInstance.post("/admin/skill", newSkill, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      setNewSkill({
        title: "",
        iconName: "",
        description: "",
        skills: [
          {
            name: "",
            level: 0,
            iconName: "",
            description: "",
          },
        ],
      });
      toast.success("Skill added successfully");
    } catch (error: any) {
      toast.error("Failed to add Skills: " + error.message);
      setError(true);
      console.error("Error submitting form:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold dark:text-white mb-4">
          Skills Management
        </h2>
        <div className="bg-white dark:bg-secondary/20 rounded-xl p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="mb-4">
                <label
                  htmlFor="title"
                  className="block text-sm text-blue-500 font-medium dark:text-gray-300 mb-1"
                >
                  Category
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={newSkill.title}
                  onChange={handleMainChange}
                  className={`w-full px-4 py-2 rounded-lg bg-white dark:bg-secondary/20 border ${
                    error
                      ? "border-red-500 focus:border-red-500"
                      : "border-gray-300 dark:border-gray-600 focus:border-accent"
                  } focus:outline-none focus:ring-2 focus:ring-accent/20 transition-colors`}
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="iconName"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Category IconName
                </label>
                <input
                  type="text"
                  id="iconName"
                  name="iconName"
                  value={newSkill.iconName}
                  onChange={handleMainChange}
                  className={`w-full px-4 py-2 rounded-lg bg-white dark:bg-secondary/20 border ${
                    error
                      ? "border-red-500 focus:border-red-500"
                      : "border-gray-300 dark:border-gray-600 focus:border-accent"
                  } focus:outline-none focus:ring-2 focus:ring-accent/20 transition-colors`}
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Category Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={newSkill.description}
                  onChange={handleMainChange}
                  className={`w-full px-4 py-2 rounded-lg bg-white dark:bg-secondary/20 border ${
                    error
                      ? "border-red-500 focus:border-red-500"
                      : "border-gray-300 dark:border-gray-600 focus:border-accent"
                  } focus:outline-none focus:ring-2 focus:ring-accent/20 transition-colors`}
                />
              </div>

              {newSkill.skills.map((skill, index) => (
                <div
                  key={index}
                  className="grid grid-cols-1 md:grid-cols-1 gap-6"
                >
                  <div className="mb-4">
                    <label
                      htmlFor={`skill-name-${index}`}
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                      Skill Name
                    </label>
                    <input
                      type="text"
                      id={`skill-name-${index}`}
                      name="name"
                      value={skill.name}
                      onChange={(e) => handleSkillChange(index, e)}
                      className={`w-full px-4 py-2 rounded-lg bg-white dark:bg-secondary/20 border ${
                        error
                          ? "border-red-500 focus:border-red-500"
                          : "border-gray-300 dark:border-gray-600 focus:border-accent"
                      } focus:outline-none focus:ring-2 focus:ring-accent/20 transition-colors`}
                    />
                  </div>

                  <div className="mb-4">
                    <label
                      htmlFor={`skill-level-${index}`}
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                      Skill Level
                    </label>
                    <input
                      type="number"
                      id={`skill-level-${index}`}
                      name="level"
                      value={skill.level}
                      onChange={(e) => handleSkillChange(index, e)}
                      className={`w-full px-4 py-2 rounded-lg text-gray-300 dark:bg-secondary/20 border ${
                        error
                          ? "border-red-500 focus:border-red-500"
                          : "border-gray-300 dark:border-gray-600 focus:border-accent"
                      } focus:outline-none focus:ring-2 focus:ring-accent/20 transition-colors`}
                    />
                  </div>

                  <div className="mb-4">
                    <label
                      htmlFor={`skill-icon-${index}`}
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                      Skill IconName
                    </label>
                    <input
                      type="text"
                      id={`skill-icon-${index}`}
                      name="iconName"
                      value={skill.iconName}
                      onChange={(e) => handleSkillChange(index, e)}
                      className={`w-full px-4 py-2 rounded-lg bg-white dark:bg-secondary/20 border ${
                        error
                          ? "border-red-500 focus:border-red-500"
                          : "border-gray-300 dark:border-gray-600 focus:border-accent"
                      } focus:outline-none focus:ring-2 focus:ring-accent/20 transition-colors`}
                    />
                  </div>

                  <div className="mb-4">
                    <label
                      htmlFor={`skill-description-${index}`}
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                      Skill Description
                    </label>
                    <textarea
                      id={`skill-decription-${index}`}
                      name="description"
                      value={skill.description}
                      onChange={(e) => handleSkillChange(index, e)}
                      className={`w-full px-4 py-2 rounded-lg bg-white dark:bg-secondary/20 border ${
                        error
                          ? "border-red-500 focus:border-red-500"
                          : "border-gray-300 dark:border-gray-600 focus:border-accent"
                      } focus:outline-none focus:ring-2 focus:ring-accent/20 transition-colors`}
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 bg-accent hover:bg-accent/90 text-white"
              >
                {isLoading ? "Saving..." : "Save Skill"}
              </button>
            </div>
          </form>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-semibold dark:text-white mb-4">
          Existing Skills
        </h3>
        {/* <DataTable SkillData={skillCategories} /> */}
      </div>
    </div>
  );
};

export default SkillsTab;
