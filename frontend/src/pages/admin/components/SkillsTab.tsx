// import { useState } from "react";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { z } from "zod";
import FormInput from "./elements/FormInput";
import FormTextArea from "./elements/FormTextArea";
import ActionButton from "./elements/ActionButton";
import DataTable from "./elements/DataTable";
// import { register } from "module";

// const skillSchema = z.object({
//   name: z.string().min(1, "Skill name is required"),
//   category: z.string().min(1, "Category is required"),
//   proficiency: z
//     .string()
//     .regex(/^\d+$/)
//     .transform(Number)
//     .refine((n) => n >= 0 && n <= 100, {
//       message: "Proficiency must be between 0 and 100",
//     }),
//   yearsOfExperience: z.string().min(1, "Years of experience is required"),
//   description: z.string().optional(),
// });

// type SkillFormData = z.infer<typeof skillSchema>;

const SkillsTab = () => {
  // const [isSubmitting, setIsSubmitting] = useState(false);

  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors },
  //   reset,
  // } = useForm<any>({
  //   resolver: zodResolver(skillSchema),
  // });

  const handleSubmit = () => {};

  // const onSubmit = async (data: any) => {
  //   setIsSubmitting(true);
  //   try {
  //     console.log("Form data:", data);
  //     // reset();
  //   } catch (error) {
  //     console.error("Error submitting skill:", error);
  //   } finally {
  //     setIsSubmitting(false);
  //   }
  // };

  const register = () => {};

  const mockSkills = [
    {
      id: 1,
      name: "React.js",
      category: "Frontend",
      proficiency: 90,
      yearsOfExperience: "4 years",
    },
    {
      id: 2,
      name: "Node.js",
      category: "Backend",
      proficiency: 85,
      yearsOfExperience: "3 years",
    },
  ];

  const columns = [
    { key: "name", label: "Skill" },
    { key: "category", label: "Category" },
    {
      key: "proficiency",
      label: "Proficiency",
      render: (value: number) => `${value}%`,
    },
    { key: "yearsOfExperience", label: "Experience" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold dark:text-white mb-4">
          Skills Management
        </h2>
        <div className="bg-white dark:bg-secondary/20 rounded-xl p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormInput
                label="Skill Name"
                name="name"
                register={register}
                required
              />
              <FormInput
                label="Category"
                name="category"
                register={register}
                required
              />
              <FormInput
                label="Proficiency (%)"
                name="proficiency"
                type="number"
                register={register}
                required
              />
              <FormInput
                label="Years of Experience"
                name="yearsOfExperience"
                register={register}
                required
              />
            </div>

            <FormTextArea
              label="Description"
              name="description"
              register={register}
            />

            <div className="flex justify-end gap-4">
              <ActionButton
                label="Cancel"
                variant="secondary"
                // onClick={() => reset()}
              />
              <ActionButton
                label="Save Skill"
                type="submit"
                // isLoading={isSubmitting}
              />
            </div>
          </form>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-semibold dark:text-white mb-4">
          Existing Skills
        </h3>
        <DataTable
          columns={columns}
          data={mockSkills}
          onEdit={(item) => console.log("Edit:", item)}
          onDelete={(item) => console.log("Delete:", item)}
        />
      </div>
    </div>
  );
};

export default SkillsTab;
