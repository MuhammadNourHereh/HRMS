<?php

namespace App\Http\Controllers;

use App\Models\DocumentManagement;
use Illuminate\Http\Request;

class deleteUpdateDisplayDocumentController extends Controller
{
    /**
     * Display, update, or delete a document based on the request type.
     *
     * @param Request $request
     * @param $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function deleteUpdateDisplayDocument(Request $request, $id)
    {
        $document = DocumentManagement::find($id);

        // Check if the document exists
        if (!$document) {
            return response()->json(['message' => 'Document not found'], 404);
        }

        // If it's a GET request, display the document
        if ($request->isMethod('get')) {
            return response()->json($document);
        }

        // If it's a DELETE request, delete the document
        if ($request->isMethod('delete')) {
            $document->delete();
            return response()->json(['message' => 'Document deleted successfully']);
        }

        // If it's a PUT request, update the document
        if ($request->isMethod('put')) {
            // Validate the input data
            $request->validate([
                'file_type' => 'sometimes|string|max:255',
                'file_url' => 'sometimes|string',
                'file_description' => 'sometimes|string',
            ]);

            // Update the document fields
            $document->update([
                'file_type' => $request->file_type ?? $document->file_type,
                'file_url' => $request->file_url ?? $document->file_url,
                'file_description' => $request->file_description ?? $document->file_description,
            ]);


            return response()->json($document);
        }

        // If none of the above, return an error
        return response()->json(['message' => 'Invalid request'], 400);
    }
}
