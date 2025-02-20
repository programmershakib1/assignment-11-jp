import { useQuery } from "@tanstack/react-query";
import useAuth from "../hooks/useAuth";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { arrayMove, SortableContext, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useState, useEffect } from "react";
import { format } from "date-fns";
import { PropTypes } from "prop-types";

const SortableItem = ({ task, handleDelete, handleCategoryChange }) => {
  const navigate = useNavigate();
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: task._id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleCategorySelect = (newCategory) => {
    handleCategoryChange(task._id, newCategory);
  };

  const handleDeleteForm = (e) => {
    e.preventDefault();
    handleDelete(task?._id);
  };

  const handleEditForm = (e) => {
    e.preventDefault();
    navigate(`/editTask/${task?._id}`);
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="relative min-h-44 lg:min-h-52 border p-5 rounded-xl cursor-pointer"
    >
      <h4 className="font-bold">{task?.title}</h4>
      <p className="text-sm">{task?.description}</p>
      <p className="text-gray-500">{format(new Date(task?.timestamp), "P")}</p>
      <div className="absolute bottom-5 right-4 left-4 mt-5 grid grid-cols-3 gap-5 md:gap-10">
        <form onSubmit={handleEditForm} action="">
          <button className="w-full bg-black text-white py-1 px-4 rounded-md">
            Edit
          </button>
        </form>
        <form onSubmit={handleDeleteForm} action="">
          <button className="w-full bg-black text-white py-1 px-4 rounded-md">
            Delete
          </button>
        </form>
        <select
          onChange={(e) => handleCategorySelect(e.target.value)}
          value={task.category}
          className="w-full py-1 px-2 bg-gray-300 rounded-md"
        >
          <option value="to_do">To-Do</option>
          <option value="in_progress">In Progress</option>
          <option value="done">Done</option>
        </select>
      </div>
    </div>
  );
};

SortableItem.propTypes = {
  task: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    timestamp: PropTypes.string.isRequired,
  }).isRequired,
  handleDelete: PropTypes.func.isRequired,
  handleCategoryChange: PropTypes.func.isRequired,
};

const MyTasks = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: tasks = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["tasks", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/tasks/${user?.email}`);
      return data;
    },
  });

  const [localTasks, setLocalTasks] = useState([]);

  useEffect(() => {
    setLocalTasks(tasks);
  }, [tasks]);

  const toDoTasks = localTasks.filter((task) => task.category === "to_do");
  const inProgressTasks = localTasks.filter(
    (task) => task.category === "in_progress"
  );
  const doneTasks = localTasks.filter((task) => task.category === "done");

  const handleDelete = (id) => {
    axiosSecure.delete(`/task/${id}`).then((res) => {
      if (res.data.deletedCount > 0) {
        toast.success("Deleted successfully!");
        refetch();
      }
    });
  };

  const handleDragEnd = async (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = localTasks.findIndex((task) => task._id === active.id);
    const newIndex = localTasks.findIndex((task) => task._id === over.id);

    const newTasks = arrayMove(localTasks, oldIndex, newIndex);
    setLocalTasks(newTasks);

    const response = await axiosSecure.post("/update-task-order", {
      tasks: newTasks,
    });

    if (response.data.success) {
      toast.success("Order updated successfully!");
      await refetch();
    } else {
      toast.error("Failed to update order!");
    }
  };

  const handleCategoryChange = async (taskId, newCategory) => {
    const response = await axiosSecure.patch(`/task/${taskId}`, {
      category: newCategory,
    });
    if (response.data.modifiedCount > 0) {
      toast.success("Task category updated!");
      refetch();
    }
  };

  if (isLoading) {
    return (
      <div className="my-20 text-center">
        <span className="loading loading-bars loading-lg"></span>
      </div>
    );
  }

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <div className="grid lg:grid-cols-3 gap-5 mt-10 md:mt-20 mx-5 md:mx-0">
        <div className="p-4 bg-gray-100 rounded-xl">
          <h2 className="font-bold text-xl mb-5">To-Do</h2>
          <div className="grid gap-3">
            <SortableContext items={toDoTasks.map((task) => task._id)}>
              {toDoTasks.map((task) => (
                <SortableItem
                  key={task._id}
                  task={task}
                  handleDelete={handleDelete}
                  handleCategoryChange={handleCategoryChange}
                />
              ))}
            </SortableContext>
          </div>
        </div>

        <div className="p-4 bg-gray-100 rounded-xl">
          <h2 className="font-bold text-xl mb-5">In Progress</h2>
          <div className="grid gap-3">
            <SortableContext items={inProgressTasks.map((task) => task._id)}>
              {inProgressTasks.map((task) => (
                <SortableItem
                  key={task._id}
                  task={task}
                  handleDelete={handleDelete}
                  handleCategoryChange={handleCategoryChange}
                />
              ))}
            </SortableContext>
          </div>
        </div>

        <div className="p-4 bg-gray-100 rounded-xl">
          <h2 className="font-bold text-xl mb-5">Done</h2>
          <div className="grid gap-3">
            <SortableContext items={doneTasks.map((task) => task._id)}>
              {doneTasks.map((task) => (
                <SortableItem
                  key={task._id}
                  task={task}
                  handleDelete={handleDelete}
                  handleCategoryChange={handleCategoryChange}
                />
              ))}
            </SortableContext>
          </div>
        </div>
      </div>
    </DndContext>
  );
};

export default MyTasks;
