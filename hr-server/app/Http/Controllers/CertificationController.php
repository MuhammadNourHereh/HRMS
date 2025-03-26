<?php

namespace App\Http\Controllers;

use App\Models\DocumentManagement;
use App\Models\Certification;

use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Storage;

class CertificationController extends Controller
{
    public function pending()
    {
        return Certification::with(['employee', 'program'])
            ->where('status', 'Pending')
            ->paginate(10);
    }

    public function approve(Request $request, Certification $certification)
    {
        $validated = $request->validate([
            'issued_date' => 'required|date',
            'expiry_date' => 'required|date|after:issued_date',
            'file_base64' => 'required|string', // Base64 encoded file
            'file_description' => 'required|string',   // Original file name
            'file_type' => 'required|string|in:pdf,jpg,jpeg,png',
        ]);

        if ($certification->status != 'pending') {
            return response()->json(['error' => 'Certification must be pending'], 400);
        }

        try {
            $uploadRequest = new Request([
                'employee_id' => $certification->employee_id,
                'file_type' => $validated['file_type'],
                'file' => $validated['file_base64'], // Base64 encoded file
                'file_description' => $validated['file_description'],
            ]);
    
            // Call the existing uploadDocument method from DocumentController
            $documentController = new DocumentController();
            $uploadResponse = $documentController->uploadDocument($uploadRequest);
    
            // Extract response data (assuming it's JSON)
            $uploadData = json_decode($uploadResponse->getContent(), true);
            if (!isset($uploadData['file_url']) || $uploadData['file_url']===null) {
                throw new \Exception('File upload failed');
            }
            echo $uploadData['file_url'];
            $certification->update([
                'document_url' => $uploadData['file_url'],
                'issued_date' => $validated['issued_date'],
                'expiry_date' => $validated['expiry_date'],
                'status' => 'approved',
            ]);

            return response()->json([
                'success' => true,
                'document_url' => $uploadData['file_url'],
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'error' => 'File processing failed',
                'message' => $e->getMessage()
            ], 500);
        }
    }
}
