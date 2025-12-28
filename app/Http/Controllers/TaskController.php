<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TaskController extends Controller
{
    /**
     * Display the dashboard with tasks.
     */
    public function index(Request $request)
    {
        return Inertia::render('dashboard', [
            'tasks' => $request->user()->tasks()->latest()->get(),
        ]);
    }

    /**
     * Store a newly created task in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
        ]);

        $request->user()->tasks()->create($validated);

        return redirect()->back();
    }

    /**
     * Update the specified task in storage.
     */
    public function update(Request $request, Task $task)
    {
        if ($task->user_id !== $request->user()->id) {
            abort(403);
        }

        $validated = $request->validate([
            'title' => 'sometimes|string|max:255',
            'completed' => 'sometimes|boolean',
        ]);

        $task->update($validated);

        return redirect()->back();
    }

    /**
     * Remove the specified task from storage.
     */
    public function destroy(Request $request, Task $task)
    {
        if ($task->user_id !== $request->user()->id) {
            abort(403);
        }

        $task->delete();

        return redirect()->back();
    }
}
