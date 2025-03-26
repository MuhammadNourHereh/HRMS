<?php

namespace App\Http\Controllers;

use App\Models\Document;
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
        'issued_date' => 'nullable|date',
        'expiry_date' => 'nullable|date|after:issued_date',
        'file_base64' => 'required|string', // Base64 encoded file
        'file_description' => 'required|string',   // Original file name
        'file_type' => 'required|string|in:pdf,jpg,jpeg,png',
    ]);

    if ($certification->status != 'pending') {
        return response()->json(['error' => 'Certification must be pending'], 400);
    }

    try {
        // Extract the base64 data (remove data URI prefix if present)
        $base64 = preg_replace('#^data:\w+/\w+;base64,#i', '', $validated['file_base64']);
        $fileData = base64_decode($base64);
        
        if (!$fileData) {
            throw new \Exception('Invalid base64 file data');
        }

        // Store the file
        $path = 'certifications/'.$certification->id.'/'.Str::uuid().'.'.$validated['file_type'];
        Storage::put($path, $fileData);

        // Create document record
        $document = DocumentManager::create([
            'employee_id' => $certification->employee_id,
            'file_path' => $path,
            'file_description' => $validated['file_description'],
            'file_type' => $validated['file_type'],
            'file_size' => strlen($fileData),
        ]);

        $certification->update([
            'document_id' => $document->id,
            'issued_date' => $validated['issued_date'],
            'expiry_date' => $validated['expiry_date'],
            'status' => 'approved',
        ]);

        return response()->json([
            'success' => true,
            'document_url' => Storage::url($path),
        ]);

    } catch (\Exception $e) {
        return response()->json([
            'error' => 'File processing failed',
            'message' => $e->getMessage()
        ], 500);
    }
}
}
