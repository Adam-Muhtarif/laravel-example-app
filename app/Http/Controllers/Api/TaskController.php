<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Task;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    /**
     * GET /api/tasks
     * List all tasks for the authenticated user
     */
    public function index(Request $request)
    {
        return $request->user()
            ->tasks()
            ->oldest()
            ->get();
    }

    /**
     * GET /api/tasks/{task}
     * Show a single task if the user owns it
     */
    public function show(Task $task, Request $request)
    {
        $this->authorizeTask($task, $request);

        return $task;
    }

    /**
     * POST /api/tasks
     * Create a new task for the authenticated user
     */
    public function create(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
        ]);

        return $request->user()->tasks()->create($validated);
    }

    /**
     * PUT /api/tasks/{task}
     * Update a task if the user owns it
     */
    public function update(Task $task, Request $request)
    {
        $this->authorizeTask($task, $request);

        $validated = $request->validate([
            'title' => 'sometimes|string|max:255',
            'completed' => 'sometimes|boolean',
        ]);

        $task->update($validated);

        return $task;
    }

    /**
     * DELETE /api/tasks/{task}
     * Delete a task if the user owns it
     */
    public function destroy(Task $task, Request $request)
    {
        $this->authorizeTask($task, $request);

        return $task->delete();
    }

    /**
     * 🔒 Ownership check
     * Ensure the authenticated user owns the task
     */
    private function authorizeTask(Task $task, Request $request)
    {
        if ($task->user_id !== $request->user()->id) {
            abort(403, 'Unauthorized');
        }
    }
}
