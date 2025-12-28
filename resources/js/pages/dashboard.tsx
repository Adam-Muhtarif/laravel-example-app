import AppLayout from '@/layouts/app-layout';
import { Head, router, useForm } from '@inertiajs/react';
import { Check, Loader2, Plus, Trash2 } from 'lucide-react';
import { FormEventHandler, useState } from 'react';

interface Task {
    id: number;
    title: string;
    completed: boolean;
}

interface DashboardProps {
    tasks: Task[];
}

export default function Dashboard({ tasks }: DashboardProps) {
    const { data, setData, post, processing, reset, errors } = useForm({
        title: '',
    });

    const [creating, setCreating] = useState(false);
    const [editingTask, setEditingTask] = useState<Task | null>(null);
    const [editTitle, setEditTitle] = useState('');

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post('/tasks', {
            onSuccess: () => {
                reset();
                setCreating(false);
            },
        });
    };

    const toggleTask = (task: Task) => {
        router.put(
            `/tasks/${task.id}`,
            {
                completed: !task.completed,
            },
            {
                preserveScroll: true,
            },
        );
    };

    const startEditing = (task: Task) => {
        setEditingTask(task);
        setEditTitle(task.title);
    };

    const cancelEditing = () => {
        setEditingTask(null);
        setEditTitle('');
    };

    const updateTask = (e: React.FormEvent) => {
        e.preventDefault();
        if (!editingTask) return;

        router.put(
            `/tasks/${editingTask.id}`,
            {
                title: editTitle,
            },
            {
                preserveScroll: true,
                onSuccess: () => {
                    setEditingTask(null);
                    setEditTitle('');
                },
            },
        );
    };

    const deleteTask = (task: Task) => {
        if (confirm('Are you sure you want to delete this task?')) {
            router.delete(`/tasks/${task.id}`, {
                preserveScroll: true,
            });
        }
    };

    return (
        <AppLayout breadcrumbs={[{ title: 'Dashboard', href: '/dashboard' }]}>
            <Head title="Dashboard" />

            <div className="mx-auto flex h-full w-full max-w-4xl flex-1 flex-col gap-8 p-8">
                {/* Header Section */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight text-foreground">
                            Tasks
                        </h1>
                        <p className="mt-1 text-muted-foreground">
                            Manage your daily goals and todos.
                        </p>
                    </div>
                    <button
                        onClick={() => setCreating(true)}
                        className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:ring-1 focus-visible:ring-ring focus-visible:outline-none"
                    >
                        <Plus className="size-4" />
                        <span>New Task</span>
                    </button>
                </div>

                {/* Create Task Form */}
                {creating && (
                    <div className="animate-in rounded-xl border bg-card text-card-foreground shadow-sm duration-200 fade-in slide-in-from-top-4">
                        <div className="p-6">
                            <form onSubmit={submit} className="flex gap-4">
                                <div className="flex-1">
                                    <input
                                        autoFocus
                                        type="text"
                                        value={data.title}
                                        onChange={(e) =>
                                            setData('title', e.target.value)
                                        }
                                        placeholder="What needs to be done?"
                                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                                    />
                                    {errors.title && (
                                        <p className="mt-1 text-sm text-destructive">
                                            {errors.title}
                                        </p>
                                    )}
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50"
                                    >
                                        {processing ? (
                                            <Loader2 className="size-4 animate-spin" />
                                        ) : (
                                            'Save'
                                        )}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setCreating(false);
                                            reset();
                                        }}
                                        className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {/* Task List */}
                <div className="space-y-4">
                    {tasks.length === 0 ? (
                        <div className="rounded-xl border-2 border-dashed py-12 text-center">
                            <h3 className="text-lg font-medium text-muted-foreground">
                                No tasks yet
                            </h3>
                            <button
                                onClick={() => setCreating(true)}
                                className="mt-2 text-sm text-primary hover:underline"
                            >
                                Create your first task
                            </button>
                        </div>
                    ) : (
                        tasks.map((task) => (
                            <div
                                key={task.id}
                                className={`group flex items-center justify-between rounded-xl border p-4 transition-all duration-200 hover:shadow-md ${task.completed ? 'bg-muted/50 opacity-75' : 'bg-card'}`}
                            >
                                {editingTask?.id === task.id ? (
                                    <form
                                        onSubmit={updateTask}
                                        className="flex flex-1 items-center gap-4"
                                    >
                                        <input
                                            autoFocus
                                            type="text"
                                            value={editTitle}
                                            onChange={(e) =>
                                                setEditTitle(e.target.value)
                                            }
                                            className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:ring-1 focus-visible:ring-ring focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                                        />
                                        <button
                                            type="submit"
                                            className="inline-flex items-center justify-center rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90 focus-visible:ring-1 focus-visible:ring-ring focus-visible:outline-none"
                                        >
                                            Save
                                        </button>
                                        <button
                                            type="button"
                                            onClick={cancelEditing}
                                            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-3 py-2 text-sm font-medium shadow-sm hover:bg-accent hover:text-accent-foreground focus-visible:ring-1 focus-visible:ring-ring focus-visible:outline-none"
                                        >
                                            Cancel
                                        </button>
                                    </form>
                                ) : (
                                    <>
                                        <div className="flex flex-1 items-center gap-4">
                                            <button
                                                onClick={() => toggleTask(task)}
                                                className={`flex size-6 shrink-0 items-center justify-center rounded-full border transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none ${task.completed ? 'border-primary bg-primary text-primary-foreground' : 'border-input hover:border-primary'}`}
                                            >
                                                {task.completed && (
                                                    <Check className="size-3.5" />
                                                )}
                                            </button>
                                            <span
                                                className={`text-base font-medium transition-all ${task.completed ? 'text-muted-foreground line-through decoration-muted-foreground/50' : 'text-foreground'}`}
                                            >
                                                {task.title}
                                            </span>
                                        </div>

                                        <div className="flex items-center gap-2 opacity-0 transition-all duration-200 group-hover:opacity-100 focus-within:opacity-100">
                                            <button
                                                onClick={() =>
                                                    startEditing(task)
                                                }
                                                className="p-2 text-muted-foreground hover:text-primary focus:opacity-100 focus-visible:outline-none"
                                                aria-label="Edit task"
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="24"
                                                    height="24"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    className="size-4"
                                                >
                                                    <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
                                                    <path d="m15 5 4 4" />
                                                </svg>
                                            </button>
                                            <button
                                                onClick={() => deleteTask(task)}
                                                className="p-2 text-muted-foreground hover:text-destructive focus:opacity-100 focus-visible:outline-none"
                                                aria-label="Delete task"
                                            >
                                                <Trash2 className="size-4" />
                                            </button>
                                        </div>
                                    </>
                                )}
                            </div>
                        ))
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
