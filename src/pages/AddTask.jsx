import { useForm } from "react-hook-form";
import useAxiosSecure from "../hooks/useAxiosSecure";
import useAuth from "../hooks/useAuth";
import { toast } from "react-hot-toast";

const AddTask = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const { title, category, due_date, hour, minute, description } = data;

    const taskInfo = {
      title,
      category,
      due_date,
      hour: parseInt(hour),
      minute: parseInt(minute),
      description,
      order: 0,
      timestamp: new Date().toISOString(),
      user_name: user?.displayName,
      user_email: user?.email,
      user_image: user?.photoURL,
    };

    axiosSecure.post("/task", taskInfo).then((res) => {
      if (res.data.insertedId) {
        toast.success("Task added successfully.");
        reset();
      }
    });
  };
  return (
    <div className="mx-5 md:mx-0">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
        <div className="w-full flex flex-col">
          <label>
            <span className="font-semibold">Title</span>
          </label>
          <input
            type="text"
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
            defaultValue={""}
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
            <span className="font-semibold">Due Date</span>
          </label>
          <input
            type="date"
            className="shadow-md mt-2 p-3 rounded-full dark:bg-c"
            {...register("due_date", {
              required: "Due Date is required",
            })}
          />
          {errors.due_date && (
            <p className="text-red-500">{errors.due_date.message}</p>
          )}
        </div>
        <div className="w-full flex flex-col">
          <label>
            <span className="font-semibold">Hour</span>
          </label>
          <input
            type="number"
            placeholder="Hour (0-23)"
            className="shadow-md mt-2 p-3 rounded-full dark:bg-c"
            {...register("hour", {
              required: "Hour is required",
              min: { value: 0, message: "Hour must be at least 0" },
              max: { value: 23, message: "Hour cannot exceed 23" },
            })}
          />
          {errors.hour && <p className="text-red-500">{errors.hour.message}</p>}
        </div>

        <div className="w-full flex flex-col">
          <label>
            <span className="font-semibold">Minute</span>
          </label>
          <input
            type="number"
            placeholder="Minute (0-59)"
            className="shadow-md mt-2 p-3 rounded-full dark:bg-c"
            {...register("minute", {
              required: "Minute is required",
              min: { value: 0, message: "Minute must be at least 0" },
              max: { value: 59, message: "Minute cannot exceed 59" },
            })}
          />
          {errors.minute && (
            <p className="text-red-500">{errors.minute.message}</p>
          )}
        </div>
        <div className="w-full flex flex-col">
          <label>
            <span className="font-semibold">Description</span>
          </label>
          <textarea
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
        <button className="mt-5 w-32 bg-black text-white dark:bg-c py-2 px-10 font-bold rounded-md">
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddTask;
