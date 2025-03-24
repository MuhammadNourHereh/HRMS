<?php

namespace App\Http\Controllers;

use App\Models\DocumentManagement;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class DeleteUpdateDocumentController extends Controller
{
    // Update document metadata
    public function updateDocument(Request $request, $documentId)
    {
        // Validate the request
        $request->validate([
            'file_type' => 'nullable|string|in:pdf,jpg,jpeg,png', // Optional: Validate file type if provided
            'file_description' => 'nullable|string|max:255', // Optional: Validate description if provided
        ]);

        // Find the document by its ID
        $document = DocumentManagement::find($documentId);

        // If the document is not found, return an error response
        if (!$document) {
            return response()->json(['error' => 'Document not found'], 404);
        }

        // Update metadata if provided
        if ($request->has('file_description')) {
            $document->file_description = $request->input('file_description');
        }
        if ($request->has('file_type')) {
            $document->file_type = $request->input('file_type');
        }

        // Save the changes
        $document->save();

        return response()->json(['success' => 'Document updated successfully', 'document' => $document]);
    }

    // Delete a document
    public function deleteDocument($documentId)
    {
        // Find the document by its ID
        $document = DocumentManagement::find($documentId);

        // If the document is not found, return an error response
        if (!$document) {
            return response()->json(['error' => 'Document not found'], 404);
        }

        // Delete the file from storage
        try {
            // Extract the file path from the document record
            $filePath = str_replace(Storage::url(''), '', $document->file_url); // Get relative path

            // Delete the file from storage
            Storage::delete($filePath);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to delete file from storage: ' . $e->getMessage()], 500);
        }

        // Delete the document record from the database
        $document->delete();

        return response()->json(['success' => 'Document deleted successfully']);
    }
}
