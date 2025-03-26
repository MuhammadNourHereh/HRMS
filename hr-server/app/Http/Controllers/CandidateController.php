<?php

namespace App\Http\Controllers;



use App\Models\Candidate;
use Illuminate\Http\Request;
use App\Models\DocumentManagement;
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
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'errors' => $validator->errors()
            ], 422);
        }

        $candidate = Candidate::findOrFail($id);
        $candidate->status = $request->status;
        $candidate->save();

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
