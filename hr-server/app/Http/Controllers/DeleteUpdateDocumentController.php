<?php

namespace App\Http\Controllers;

use App\Models\DocumentManagement;
use Illuminate\Http\Request;

class DeleteUpdateDocumentController extends Controller
{
    /**
     * Display, update, or delete a document based on the request type.
     *
     * @param Request $request
     * @param $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function updateDocument(Request $request, $documentId)
    {
        // Validate the incoming data
        $request->validate([
            'file_type' => 'nullable|string|in:pdf,jpg,jpeg,png', // Ensure file type is one of the allowed formats
            'file_description' => 'nullable|string|max:255', // Ensure file description is optional but within limit
            'file_url' => 'nullable|string', // Validate the file_url if provided
        ]);

        // Find the document by its ID
        $document = DocumentManagement::find($documentId);

        // If the document is not found, return an error response
        if (!$document) {
            return response()->json(['error' => 'Document not found'], 404);
        }

        // Update fields only if they are provided in the request
        if ($request->has('file_description')) {
            $document->file_description = $request->input('file_description');
        }
        if ($request->has('file_type')) {
            $document->file_type = $request->input('file_type');
        }
        if ($request->has('file_url')) {
            $document->file_url = $request->input('file_url');
        }

        // Save the changes to the document
        $document->save();

        return response()->json([
            'success' => 'Document updated successfully',
            'document' => $document
        ]);
    }

    /**
     * Delete a document by ID.
     *
     * @param $documentId
     * @return \Illuminate\Http\JsonResponse
     */
    public function deleteDocument($documentId)
    {
        // Find the document by its ID
        $document = DocumentManagement::find($documentId);

        // If the document is not found, return an error response
        if (!$document) {
            return response()->json(['error' => 'Document not found'], 404);
        }

        // Delete the document file from storage
        try {
            $filePath = str_replace('/storage/', '', $document->file_url);  // Remove '/storage/' from the file path
            \Storage::delete($filePath);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to delete file from storage: ' . $e->getMessage()], 500);
        }

        // Delete the document record from the database
        $document->delete();

        return response()->json(['success' => 'Document deleted successfully']);
    }
}
