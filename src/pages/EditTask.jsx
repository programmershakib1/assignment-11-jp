import { useForm } from "react-hook-form";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { toast } from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";

const EditTask = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const { id } = useParams();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { data: task = {}, isLoading } = useQuery({
    queryKey: ["task", id],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/task/${id}`);
      return data;
    },
  });

  const onSubmit = async (data) => {
    const { title, category, description } = data;

    const taskInfo = {
      title,
      category,
      description,
      order: 0,
      timestamp: task?.timestamp,
      hours: task?.hours,
      minutes: task?.minutes,
      user_name: task?.user_name,
      user_email: task?.user_email,
      user_image: task?.user_image,
    };

    axiosSecure.put(`/task/${id}`, taskInfo).then((res) => {
      if (res.data.modifiedCount > 0) {
        toast.success("Task editing successful.");
        reset();
        navigate("/myTasks");
      }
    });
  };

  if (isLoading)
    return (
      <div className="my-20 text-center">
        <span className="loading loading-bars loading-lg"></span>
      </div>
    );
  return (
    <div className="mx-5 md:mx-0 mt-10 md:mt-20">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
        <div className="w-full flex flex-col">
          <label>
            <span className="font-semibold">Title</span>
          </label>
          <input
            type="text"
            defaultValue={task?.title}
            placeholder="Title"
            className="shadow-md mt-2 p-3 rounded-full dark:bg-c"
            {...register("title", {
              required: "Title is required",
              maxLength: {
                value: 50,
                message: "Title cannot exceed 50 characters",
              },
            })}
          />
          {errors.title && (
            <p className="text-red-500">{errors.title.message}</p>
          )}
        </div>
        <div className="w-full flex flex-col">
          <label>
            <span className="font-semibold">Category</span>
          </label>
          <select
            defaultValue={task?.category}
            className="shadow-md mt-2 p-3 rounded-full dark:bg-c"
            {...register("category", {
              required: "Category is required",
            })}
          >
            <option value="" disabled>
              Select Category
            </option>
            <option value="to_do">To-Do</option>
            <option value="in_progress">In Progress</option>
            <option value="done">Done</option>
          </select>
          {errors.category && (
            <p className="text-red-500">{errors.category.message}</p>
          )}
        </div>
        <div className="w-full flex flex-col">
          <label>
            <span className="font-semibold">Description</span>
          </label>
          <textarea
            defaultValue={task?.description}
            placeholder="Description"
            className="h-48 shadow-md mt-2 p-3 rounded-xl dark:bg-c"
            {...register("description", {
              maxLength: {
                value: 200,
                message: "Description cannot exceed 200 characters",
              },
            })}
          ></textarea>
          {errors.description && (
            <p className="text-red-500">{errors.description.message}</p>
          )}
        </div>
        <button className="mt-5 w-32 bg-black text-white py-2 px-10 font-bold rounded-md">
          Submit
        </button>
      </form>
    </div>
  );
};

export default EditTask;
