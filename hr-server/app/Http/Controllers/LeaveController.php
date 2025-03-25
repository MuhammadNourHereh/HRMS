<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class LeaveController extends Controller
{
    public function store(Request $request)
{
    $validated = $request->validate([
        'leave_type' => ['required', new Enum(LeaveType::class)],
        'start_date' => 'required|date|after_or_equal:today',
        'end_date' => 'required|date|after_or_equal:start_date',
        'reason' => 'required|string|max:500',
        'is_paid' => 'boolean'
    ]);

    $policy = LeavePolicy::where('employee_id', auth()->id())
              ->where('leave_type', $validated['leave_type'])
              ->firstOrFail();

    $leaveDays = $this->calculateLeaveDays(
        $validated['start_date'],
        $validated['end_date']
    );

    if ($policy->balance < $leaveDays && $validated['is_paid']) {
        return back()->withErrors([
            'balance' => 'Insufficient paid leave balance'
        ]);
    }

    Leave::create([
        'employee_id' => auth()->id(),
        'leave_policy_id' => $policy->id,
        'is_paid' => $validated['is_paid'],
        'start_date' => $validated['start_date'],
        'end_date' => $validated['end_date'],
        'reason' => $validated['reason']
    ]);

    return redirect()->route('leaves.index')
           ->with('success', 'Leave request submitted');
}

private function calculateLeaveDays($start, $end)
{
    return now()->parse($end)
        ->diffInDays(now()->parse($start)) + 1;
}
}
