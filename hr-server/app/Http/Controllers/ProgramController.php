<?php

namespace App\Http\Controllers;

use App\Models\Program;
use Illuminate\Http\Request;

use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;

class ProgramController extends Controller
{
    public function index(){
        return Program::query()
            ->withCount(['enrollments'])
            ->when(request('count_certifications'), function ($query) {
                $query->withCount(['certifications']);
            })
            ->filter(request()->only('search', 'type', 'duration'))
            ->paginate(10);
    }

    public function show(Program $program) {
        return response()->json($program->loadCount(['enrollments']));
    }
    
    public function store(Request $request) {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'type' => 'required|in:Course,Assessment,Certification',
            'difficulty' => 'required|in:Beginner,Intermediate,Advanced',
            'duration' => 'required|integer|min:1',
            'passing_score' => 'nullable|numeric|min:0|max:100',
            'picture' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);        
        $path = $request->file('picture')->store('program_pictures', 'public');
        $program->update([
            
        ]);

        $program=Program::create([
            'name' =>  $validated['name'],
            'description' => $validated['description'],
            'type' => $validated['type'],
            'difficulty' => $validated['difficulty'],
            'duration' => $validated['duration'],
            'passing_score' => $validated['passing_score'],
            'picture_url' => Storage::url($path)
        ]);

        return response()->json([$program],201);
    }

    public function update(Request $request, $id) {
        $program = Program::findOrFail($id);
        $validated = $request->validate([
            'name' => 'sometimes|string|max:255',
            'description' => 'nullable|string',
            'type' => 'sometimes|in:Course,Assessment,Certification',
            'difficulty' => 'sometimes|in:Beginner,Intermediate,Advanced',
            'duration' => 'sometimes|integer|min:1',
            'passing_score' => 'nullable|numeric|min:0|max:100',
            'picture' => 'sometimes|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        $program->update($validated);
        return response()->json($program);
    }

    

    public function destroy($id) {
        $program = Program::findOrFail($id);
        $program->delete();
        return response()->json(['message' => 'Program deleted successfully']);
    }
}
