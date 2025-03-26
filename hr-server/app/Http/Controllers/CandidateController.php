<?php

namespace App\Http\Controllers;



use App\Models\Employee;
use App\Models\Candidate;
use Illuminate\Http\Request;
use App\Models\OnboardingTask;
use App\Models\DocumentManagement;
use App\Models\EmployeeOnboarding;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;


class CandidateController extends Controller
{

    // get candidates with pagination
    public function getCandidates(Request $request)
    {
        $perPage = $request->input('per_page', 5);
        
        $candidates = Candidate::with('document')
            ->orderBy('created_at', 'desc')
            ->paginate($perPage);
        
        return response()->json([
            'status' => 'success',
            'data' => $candidates
        ]);
    }

    // get candidate by id
    public function getCandidateById($id)
    {
        $candidate = Candidate::with('document')->findOrFail($id);
        
        return response()->json([
            'status' => 'success',
            'data' => $candidate
        ]);
    }

    public function addOrUpdateCandidate(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|email',
            'status' => 'nullable|in:applied,interview,accepted,rejected',
            'resume' => 'nullable|file|mimes:pdf,doc,docx|max:2048',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'errors' => $validator->errors()
            ], 422);
        }

        // Handle document upload if present
        $documentId = null;
        if ($request->hasFile('resume')) {
            $file = $request->file('resume');
            $path = Storage::disk('public')->put('resumes', $file);
            
            // Create document record
            $document = DocumentManagement::create([
                'file_type' => $file->getClientOriginalExtension(),
                'file_url' => $path,
                'file_description' => 'Resume for ' . $request->name,
                'employee_id' => null, // No employee associated yet
            ]);
            
            $documentId = $document->id;
        }

        if ($id === 'add') {
            // For new candidates, check if email already exists
            $existingCandidate = Candidate::where('email', $request->email)->first();
            if ($existingCandidate) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Email already exists'
                ], 422);
            }
            
            $candidate = Candidate::create([
                'name' => $request->name,
                'email' => $request->email,
                'document_id' => $documentId,
                'status' => $request->status ?? 'applied',
            ]);
            
            $message = 'Candidate created successfully';
        } else {
            $candidate = Candidate::findOrFail($id);
            
            // For existing candidates, check if the new email already exists for a different candidate
            if ($request->email !== $candidate->email) {
                $existingCandidate = Candidate::where('email', $request->email)
                    ->where('id', '!=', $id)
                    ->first();
                    
                if ($existingCandidate) {
                    return response()->json([
                        'status' => 'error',
                        'message' => 'Email already exists'
                    ], 422);
                }
            }
            
            // Update document if needed
            if ($request->hasFile('resume')) {
                if ($candidate->document_id) {
                    // If candidate already has a document, delete it
                    $oldDocument = DocumentManagement::find($candidate->document_id);
                    if ($oldDocument) {
                        Storage::disk('public')->delete($oldDocument->file_url);
                        $oldDocument->delete();
                    }
                }
                $candidate->document_id = $documentId;
            }
            
            $candidate->name = $request->name;
            $candidate->email = $request->email;
            
            if ($request->has('status')) {
                $candidate->status = $request->status;
            }
            
            $candidate->save();
            $message = 'Candidate updated successfully';
        }

        return response()->json([
            'status' => 'success',
            'message' => $message,
            'data' => $candidate->load('document')
        ]);
    }

    
    public function deleteCandidate($id)
    {
        $candidate = Candidate::findOrFail($id);
        $candidate->delete();
        
        return response()->json([
            'status' => 'success',
            'message' => 'Candidate deleted successfully'
        ]);
    }

    public function updateCandidateStatus(Request $request, $id)
{
    $validator = Validator::make($request->all(), [
        'status' => 'required|in:applied,interview,accepted,rejected',
        // when candidate accepted add these fields
        'department_id' => 'required_if:status,accepted|exists:departments,id',
        'position_id' => 'required_if:status,accepted|exists:positions,id',
        'date_of_birth' => 'required_if:status,accepted|date',
        'address' => 'required_if:status,accepted|string',
        'phone_number' => 'required_if:status,accepted|string',
        'gender' => 'required_if:status,accepted|in:male,female',
        'salary' => 'required_if:status,accepted|numeric|min:0',
    ]);

    if ($validator->fails()) {
        return response()->json([
            'status' => 'error',
            'errors' => $validator->errors()
        ], 422);
    }

    $candidate = Candidate::findOrFail($id);
    $oldStatus = $candidate->status;
    $candidate->status = $request->status;
    $candidate->save();

    // If candidate is accepted, create an employee record(akh ya nabiha)
    if ($request->status === 'accepted' && $oldStatus !== 'accepted') {
        // temp pass for new employee
        $tempPassword = Hash::make('password123');
        
        // Extract first and last name from full name
        $nameParts = explode(' ', $candidate->name, 2);
        $firstName = $nameParts[0];
        $lastName = isset($nameParts[1]) ? $nameParts[1] : '';
        
        // Create employee record
        $employee = Employee::create([
            'department_id' => $request->department_id,
            'position_id' => $request->position_id,
            'first_name' => $firstName,
            'last_name' => $lastName,
            'email' => $candidate->email,
            'password' => $tempPassword,
            'date_of_birth' => $request->date_of_birth,
            'address' => $request->address,
            'phone_number' => $request->phone_number,
            'gender' => $request->gender,
            'role' => 'employee',
            'salary' => $request->salary,
        ]);
        
        // If candidate has a document, associate it with the employee
        if ($candidate->document_id) {
            $document = DocumentManagement::find($candidate->document_id);
            if ($document) {
                $document->employee_id = $employee->id;
                $document->save();
            }
        }
        
        // Apply default onboarding tasks 
        
        $defaultTasks = OnboardingTask::all();
        foreach ($defaultTasks as $task) {
            EmployeeOnboarding::create([
                'employee_id' => $employee->id,
                'onboarding_task_id' => $task->id,
                'status' => 'pending'
            ]);
        }
        
        return response()->json([
            'status' => 'success',
            'message' => 'Candidate accepted and employee record created',
            'data' => [
                'candidate' => $candidate,
                'employee' => $employee
            ]
        ]);
    }

    return response()->json([
        'status' => 'success',
        'message' => 'Candidate status updated successfully',
        'data' => $candidate
    ]);
}


    // get candididates filtered by status

    public function getCandidatesByStatus(Request $request, $status)
    {
        $validStatuses = ['applied', 'interview', 'accepted', 'rejected'];
        
        if (!in_array($status, $validStatuses)) {
            return response()->json([
                'status' => 'error',
                'message' => 'Invalid status'
            ], 400);
        }

        $perPage = $request->input('per_page', 10);
        
        $candidates = Candidate::where('status', $status)
            ->with('document')
            ->orderBy('created_at', 'desc')
            ->paginate($perPage);

        return response()->json([
            'status' => 'success',
            'data' => $candidates
        ]);
    }


    
}
