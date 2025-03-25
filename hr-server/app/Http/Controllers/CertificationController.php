<?php

namespace App\Http\Controllers;

use App\Models\Document;
use App\Models\Certification;

use Illuminate\Http\Request;

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
            'expiry_date' => 'nullable|date|after:issued_date',
            'file' => 'required|file|mimes:pdf,jpg,jpeg,png',
        ]);

        if ($certification->status != 'pending') {
            return response()->json(['error' => 'Certification cannot be issued as it is not in pending status.'], 400);
        }

        $documentId = null;
        if ($request->hasFile('file')) {
           $document = Document::uploadDocument($request->file('file'));
           $documentId = $document->id;
        }

        $certification = Certification::create([
            'employee_id' => $enrollment->employee_id,
            'program_id' => $enrollment->program_id,
            'document_id' => $documentId, 
            'certificate_name' => $request->certificate_name,
            'issued_date' => $request->issued_date,
            'expiry_date' => $request->expiry_date,
        ]);

        return response()->json([
            'success' => 'Certification issued successfully',
            'certification' => $certification,
        ]);
    }
}
