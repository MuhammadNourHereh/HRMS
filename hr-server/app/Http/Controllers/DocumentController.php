<?php

namespace App\Http\Controllers;

use App\Models\Employee;
use App\Models\DocumentManagement;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;

class DocumentController extends Controller
{


    
    public function uploadDocument(Request $request)
    {
        
        // Validate input data
        $request->validate([
            'employee_id' => 'required|exists:employees,id', // Validate that employee_id exists in the employees table
            'file_type' => 'required|string|in:pdf,jpg,jpeg,png', // Ensure the file_type is one of the allowed formats
            'file' => 'required|string', // Ensure the file is base64 encoded
            'file_description' => 'nullable|string|max:255', // Optional file description
        ]);

        // Find the employee by ID
        $employee = Employee::find($request->input('employee_id'));

        // If employee is not found, return an error response
        if (!$employee) {
            return response()->json(['error' => 'Employee not found'], 404);
        }

        // Decode the base64 file data
        $fileData = $request->input('file');
        $decodedFile = base64_decode($fileData);

        if ($decodedFile === false) {
            return response()->json(['error' => 'Invalid file data'], 400);
        }

        // Define the upload folder path: /uploads/employee_documents/{employee_id}/{date}
        $uploadFolder = 'employee_documents/' . $employee->id . '/' . now()->toDateString();

        // Generate a unique file name (e.g., document_1617012356.pdf)
        $fileName = 'document_' . time() . '.' . $request->input('file_type');

        // Use Laravel's Storage facade to save the file securely
        $filePath = $uploadFolder . '/' . $fileName;

        try {
            // Save the file in the specified folder
            Storage::put($filePath, $decodedFile);
        } catch (\Exception $e) {
            return response()->json(['error' => 'File upload failed: ' . $e->getMessage()], 500);
        }

        // Save the document metadata in the database
        DocumentManagement::create([
            'employee_id' => $employee->id,
            'file_type' => $request->input('file_type'),
            'file_description' => $request->input('file_description'), // Store the description
            'file_url' => Storage::url($filePath),
        ]);

        // Return success response with the file URL
        return response()->json([
            'success' => 'Document uploaded successfully',
            'file_url' => Storage::url($filePath),
        ]);
    }
}
