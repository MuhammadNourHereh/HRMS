<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Project;
use App\Models\Task;
use Illuminate\Support\Facades\Validator;

class ProjectController extends Controller
{
    public function getProjects(Request $request)
    {
        $perPage = $request->input('per_page', 5);
    
    $query = Project::with('tasks');
    
    // Filter by status if provided
    if ($request->has('status')) {
        $query->where('status', $request->status);
    }
    
    // Set default ordering to newest first
    $query->orderBy('created_at', 'desc');
    
    $projects = $query->paginate($perPage);

        return response()->json([
            'status' => 'success',
            'data' => $projects
        ]);
    }


    public function getProjectById($id)
    {
        $project = Project::with('tasks.employee')->findOrFail($id);

        return response()->json([
            'status' => 'success',
            'data' => $project
        ]);
    }

    public function addOrUpdateProject(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'status' => 'nullable|in:pending,in_progress,completed',
            'start_date' => 'nullable|date',
            'end_date' => 'nullable|date|after_or_equal:start_date',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'errors' => $validator->errors()
            ], 422);
        }

        if ($id === 'add') {
            // if doesnt exist create new proj
            $project = Project::create([
                'title' => $request->title,
                'description' => $request->description,
                'status' => $request->status ?? 'pending',
                'start_date' => $request->start_date,
                'end_date' => $request->end_date,
            ]);

            $message = 'Project created successfully';
        } else {
            // Update existing project
            $project = Project::findOrFail($id);

            $project->title = $request->title;

            if ($request->has('description')) {
                $project->description = $request->description;
            }

            if ($request->has('status')) {
                $project->status = $request->status;
            }

            if ($request->has('start_date')) {
                $project->start_date = $request->start_date;
            }

            if ($request->has('end_date')) {
                $project->end_date = $request->end_date;
            }

            $project->save();
            $message = 'Project updated successfully';
        }

        return response()->json([
            'status' => 'success',
            'message' => $message,
            'data' => $project
        ]);
    }


    public function deleteProject($id)
    {
        $project = Project::findOrFail($id);

        // Delete associated tasks
        $project->tasks()->delete();

       
        $project->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Project deleted successfully'
        ]);
    }


    public function updateProjectStatus(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'status' => 'required|in:pending,in_progress,completed',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'errors' => $validator->errors()
            ], 422);
        }

        $project = Project::findOrFail($id);
        $project->status = $request->status;
        $project->save();

        return response()->json([
            'status' => 'success',
            'message' => 'Project status updated successfully',
            'data' => $project
        ]);
    }

    
}
