<?php

namespace App\Http\Controllers;

use App\Models\Employee;
use App\Models\DocumentManagement;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;

class DocumentController extends Controller
{
    /**
     * Upload a new document for an employee.
     */
    public function uploadDocument(Request $request)
    {
        $request->validate([
            'employee_id' => 'required|exists:employees,id',
            'file_type' => 'required|string|in:pdf,jpg,jpeg,png',
            'file' => 'required|string', // Base64 encoded file
            'file_description' => 'nullable|string|max:255',
        ]);

        $employee = Employee::find($request->input('employee_id'));
        if (!$employee) {
            return response()->json(['error' => 'Employee not found'], 404);
        }

        $decodedFile = base64_decode($request->input('file'));
        if ($decodedFile === false) {
            return response()->json(['error' => 'Invalid file data'], 400);
        }

        $uploadFolder = 'employee_documents/' . $employee->id . '/' . now()->toDateString();
        $fileName = 'document_' . time() . '.' . $request->input('file_type');
        $filePath = $uploadFolder . '/' . $fileName;

        try {
            Storage::put($filePath, $decodedFile);
        } catch (\Exception $e) {
            return response()->json(['error' => 'File upload failed: ' . $e->getMessage()], 500);
        }

        $document = DocumentManagement::create([
            'employee_id' => $employee->id,
            'file_type' => $request->input('file_type'),
            'file_description' => $request->input('file_description'),
            'file_url' => Storage::url($filePath),
        ]);

        return response()->json(['success' => 'Document uploaded successfully', 'document' => $document]);
    }

    /**
     * Get a document by ID.
     */
    public function getDocumentById($id)
    {
        $document = DocumentManagement::find($id);
        return $document ? response()->json($document) : response()->json(['message' => 'Document not found'], 404);
    }

    /**
     * Get all document IDs by employee ID.
     */
    public function getDocumentsByEmployeeId($employee_id)
    {
        $documents = DocumentManagement::where('employee_id', $employee_id)->pluck('id');
        return $documents->isEmpty() ? response()->json(['message' => 'No documents found'], 404) : response()->json(['document_ids' => $documents]);
    }

    /**
     * Display, update, or delete a document.
     */
    public function manageDocument(Request $request, $id)
    {
        $document = DocumentManagement::find($id);
        if (!$document) {
            return response()->json(['message' => 'Document not found'], 404);
        }

        if ($request->isMethod('get')) {
            return response()->json($document);
        }

        if ($request->isMethod('put')) {
            $request->validate([
                'file_type' => 'sometimes|string|max:255',
                'file_url' => 'sometimes|string',
                'file_description' => 'sometimes|string',
            ]);

            $document->update($request->only(['file_type', 'file_url', 'file_description']));
            return response()->json(['success' => 'Document updated successfully', 'document' => $document]);
        }

        return response()->json(['message' => 'Invalid request'], 400);
    }

    /**
     * Delete a document.
     */
    public function deleteDocument($id)
    {
        $document = DocumentManagement::find($id);
        if (!$document) {
            return response()->json(['message' => 'Document not found'], 404);
        }

        $document->delete();
        return response()->json(['message' => 'Document deleted successfully']);
    }
}
