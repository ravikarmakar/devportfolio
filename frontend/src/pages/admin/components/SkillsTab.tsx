import { useEffect, useState } from "react";
import { useSkillStore } from "../../../store/useSkillStore";
import FormInput from "./elements/FormInput";
import FormTextArea from "./elements/FormTextArea";
import ActionButton from "./elements/ActionButton";
import { X, Plus, Pencil, Trash2 } from "lucide-react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

interface SkillData {
  _id?: string;
  name: string;
  level: number;
  iconName: string;
  tags: string[];
  description: string;
  categoryId: string;
}

interface CategoryData {
  _id?: string;
  title: string;
  iconName: string;
  description: string;
}

const cardVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      damping: 12,
      stiffness: 100,
    },
  },
  hover: {
    scale: 1.05,
    transition: { duration: 0.3 },
  },
};

const containerVariants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const SkillsTab: React.FC = () => {
  const {
    fetchCategories,
    fetchSkills,
    addSkill,
    Skills,
    addCategory,
    Categories,
    deleteCategory,
    updateCategory,
    updateSkill,
    deleteSkill,
    isLoading,
    error,
  } = useSkillStore();

  const [categoryData, setCategoryData] = useState<CategoryData>({
    title: "",
    iconName: "",
    description: "",
  });
  const [skillData, setSkillData] = useState<SkillData>({
    name: "",
    level: 0,
    iconName: "",
    description: "",
    tags: [],
    categoryId: "",
  });

  const [action, setAction] = useState<"create" | "update">("create");

  useEffect(() => {
    fetchCategories();
    fetchSkills();
  }, [fetchCategories, fetchSkills]);

  //  All handlers

  const handleCategoryUpdate = async (id: string) => {
    setAction("update");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    const updateToCategory = Categories.find((category) => category._id === id);

    if (updateToCategory) {
      setCategoryData({
        _id: updateToCategory._id,
        title: updateToCategory.title,
        iconName: updateToCategory.iconName!,
        description: updateToCategory.description ?? "",
      });
    }
  };

  const handleSkillUpdate = async (id: string) => {
    setAction("update");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    const updateToSkill = Skills.find((skill) => skill._id === id);

    if (updateToSkill) {
      setSkillData({
        _id: updateToSkill._id,
        name: updateToSkill.name,
        level: updateToSkill.level,
        iconName: updateToSkill.iconName!,
        description: updateToSkill.description ?? "",
        tags: updateToSkill.tags ?? [],
        categoryId: updateToSkill.categoryId!,
      });
    }
  };

  const handleCategoryDelete = async (id: string) => {
    try {
      await deleteCategory(id);
    } catch (error: any) {
      toast.error("Error deleting category:", error);
    }
  };

  const handleSkillDelete = async (id: string) => {
    try {
      await deleteSkill(id);
    } catch (error: any) {
      toast.error("Error deleting skill:", error);
    }
  };

  const handleReset = () => {
    setCategoryData({
      title: "",
      iconName: "",
      description: "",
    });
    setSkillData({
      name: "",
      level: 0,
      iconName: "",
      description: "",
      tags: [],
      categoryId: "",
    });

    setAction("create");
  };

  const categoryInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setCategoryData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const skillInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;

    if (name === "tags") {
      setSkillData((prev) => ({
        ...prev,
        [name]: value.split(",").map((tag) => tag.trim()), // Create tags array
      }));
    } else if (type === "number") {
      setSkillData((prev) => ({
        ...prev,
        [name]: value === "" ? 0 : Number(value),
      }));
    } else {
      setSkillData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSkillData({ ...skillData, categoryId: e.target.value });
  };

  const handleCategorySubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (action === "update") {
      await updateCategory(categoryData._id!, categoryData);
    } else {
      addCategory(categoryData);
    }

    setAction("create");
    handleReset();
  };

  const handleSkillSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (action === "update") {
      await updateSkill(skillData._id!, skillData);
    } else {
      addSkill(skillData);
    }

    setAction("create");
    handleReset();
  };

  return (
    <div className="space-y-8">
      <div className="bg-white dark:bg-secondary/20 rounded-xl p-6 grid md:grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Category Form */}

        <form onSubmit={handleCategorySubmit} className="space-y-6">
          <div className="grid md:grid-cols-1 gap-6">
            <FormInput
              label="Category Title"
              placeholder="Write category title"
              type="text"
              name="title"
              value={categoryData.title}
              onChange={categoryInputChange}
              error={error}
              required={true}
            />

            <FormInput
              label="Category IconName"
              placeholder="Write category iconName"
              type="text"
              name="iconName"
              value={categoryData.iconName}
              onChange={categoryInputChange}
              error={error}
              required={true}
            />

            <FormTextArea
              label="Category Description"
              placeholder="Write category description"
              name="description"
              value={categoryData.description}
              onChange={categoryInputChange}
              error={error ?? ""}
              required={true}
            />
          </div>
          <div className="flex justify-end">
            <ActionButton
              label={action === "create" ? "Add Category" : "Update Category"}
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
        </form>

        {/* Skill Form */}

        <form onSubmit={handleSkillSubmit} className="space-y-6">
          <FormInput
            label="Skill Name"
            placeholder="Write your skill name"
            type="text"
            name="name"
            value={skillData.name}
            onChange={skillInputChange}
            error={error}
            required={true}
          />

          <FormInput
            label="Skill level"
            placeholder="Yoru skill level"
            type="number"
            name="level"
            value={skillData.level.toString()}
            onChange={skillInputChange}
            error={error}
            required={true}
          />

          <FormInput
            label="Skill IconName"
            placeholder="Write your skill iconName"
            type="text"
            name="iconName"
            value={skillData.iconName}
            onChange={skillInputChange}
            error={error}
            required={true}
          />
          <FormInput
            label="Skill Tags"
            placeholder="Write your skill tags"
            type="text"
            name="tags"
            value={skillData.tags.join(", ")}
            onChange={skillInputChange}
            error={error}
            required={true}
          />

          <div>
            <label
              htmlFor="category"
              className="block text-sm text-blue-500 font-medium dark:text-gray-300 mb-1"
            >
              Select Category
            </label>
            <select
              className={`w-full px-4 py-2 rounded-lg text-gray-300 dark:bg-secondary/20 border ${
                error
                  ? "border-red-500 focus:border-red-500"
                  : "border-gray-300 dark:border-gray-600 focus:border-accent"
              } focus:outline-none focus:ring-2 focus:ring-accent/20 transition-colors`}
              name="category"
              id="category"
              value={skillData.categoryId}
              onChange={handleCategoryChange}
            >
              <option value="">None</option>
              {Categories.map((category) => (
                <option
                  className="text-black bg-slate-600"
                  key={category._id}
                  value={category._id}
                >
                  {category.title}
                </option>
              ))}
            </select>
          </div>

          <FormTextArea
            label="Skill Description"
            placeholder="Write your skill description"
            name="description"
            value={skillData.description}
            onChange={skillInputChange}
            error={error ?? ""}
            required={true}
          />

          <div className="flex justify-end gap-4">
            <ActionButton
              label="Reset All"
              type="reset"
              variant="secondary"
              icon={<X className="w-4 h-4" />}
              isLoading={false}
              onClick={handleReset}
            />

            <ActionButton
              label={action === "create" ? "Add Skill" : "Update Skill"}
              type="submit"
              variant="primary"
              icon={
                action === "create" ? (
                  <Plus className="w-4 h-4" />
                ) : (
                  <Pencil className="w-4 h-4" />
                )
              }
              isLoading={isLoading}
            />
          </div>
        </form>
      </div>

      <div className="container mx-auto px-2 py-6">
        {/* <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 border-b pb-2">
          Existing Skills & Categories
        </h3> */}

        <div className="container mx-auto px-4 py-8 bg-[#121212] rounded-lg shadow-md">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-extrabold text-gray-900 dark:text-white mb-8 text-center border-b-4 border-gray-500 pb-4"
          >
            All Categories
          </motion.h2>

          {Categories.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center text-gray-500 dark:text-gray-400"
            >
              No categories found. Add some categories to get started!
            </motion.div>
          ) : (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-6"
            >
              {Categories.map((category) => (
                <motion.div
                  key={category._id}
                  variants={cardVariants}
                  whileHover="hover"
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden transition-transform duration-200"
                >
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="bg-blue-100 dark:bg-blue-900 p-3 rounded-full mr-4"
                        >
                          <div className="w-6 h-6 flex items-center justify-center text-blue-600 dark:text-blue-300">
                            {category.iconName}
                          </div>
                        </motion.div>
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                          {category.title}
                        </h3>
                      </div>

                      <div className="flex space-x-2">
                        <motion.button
                          onClick={() =>
                            handleCategoryUpdate(category._id || "")
                          }
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900 p-2 rounded-full transition-colors duration-200"
                          aria-label="Edit Category"
                        >
                          <Pencil size={20} strokeWidth={2} />
                        </motion.button>
                        <motion.button
                          onClick={() =>
                            handleCategoryDelete(category._id || "")
                          }
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="text-red-500 hover:bg-red-50 dark:hover:bg-red-900 p-2 rounded-full transition-colors duration-200"
                          aria-label="Delete Category"
                        >
                          <Trash2 size={20} strokeWidth={2} />
                        </motion.button>
                      </div>
                    </div>

                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                      className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed"
                    >
                      {category.description}
                    </motion.p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>

        <div className="container mx-auto px-4 py-8 bg-[#121212] rounded-lg shadow-md">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-extrabold text-gray-900 dark:text-white mb-8 text-center border-b-4 border-gray-500 pb-4"
          >
            My Skills
          </motion.h2>

          {Skills.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center text-gray-600 dark:text-gray-400 italic"
            >
              No skills found. Add some skills to get started!
            </motion.div>
          ) : (
            <motion.div
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 lg:gap-8"
            >
              {Skills.map((skill) => (
                <motion.div
                  key={skill._id}
                  whileHover={{
                    scale: 1.02,
                    boxShadow: "0 10px 20px rgba(0, 0, 0, 0.2)",
                  }}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden transition-transform duration-200"
                >
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-4">
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="bg-gray-200 dark:bg-gray-700 p-3 rounded-full shadow-md"
                        >
                          <div className="w-6 h-6 flex items-center justify-center text-blue-500 dark:text-blue-400">
                            {skill.iconName || "💡"}
                          </div>
                        </motion.div>
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                          {skill.name}
                        </h3>
                      </div>

                      <div className="flex space-x-3">
                        <motion.button
                          onClick={() => handleSkillUpdate(skill._id || "")}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          className="text-blue-500 hover:text-blue-600 dark:hover:text-blue-400 p-2 rounded-full transition-colors duration-200"
                          aria-label="Edit Skill"
                        >
                          <Pencil size={20} strokeWidth={2} />
                        </motion.button>
                        <motion.button
                          onClick={() => handleSkillDelete(skill._id || "")}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          className="text-red-500 hover:text-red-600 dark:hover:text-red-400 p-2 rounded-full transition-colors duration-200"
                          aria-label="Delete Skill"
                        >
                          <Trash2 size={20} strokeWidth={2} />
                        </motion.button>
                      </div>
                    </div>

                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed"
                    >
                      {skill.description}
                    </motion.p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SkillsTab;
